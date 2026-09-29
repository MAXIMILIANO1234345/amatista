import { useCallback, useEffect, useMemo, useState } from 'react';
import { useConexion } from '../hooks/useConexion';
import { guardar, leer, pedirAlmacenamientoPersistente } from '../lib/almacen';
import { nuevoId } from '../lib/identificador';
import { enviarProgreso, sincronizacionDisponible } from '../services/api';
import { ContextoProgreso } from './contexto';
import { calcularXP, claveLeccion } from './reglas';

const CLAVE = 'progreso';
const ESPERA_SINCRONIZACION = 1500;

// Forma del progreso guardado en el dispositivo.
function normalizar(guardado) {
  const base = guardado?.version === 1 ? guardado : {};
  return {
    version: 1,
    alumnoId: base.alumnoId ?? nuevoId('alumno'),
    lecciones: base.lecciones ?? {},
    pendientes: base.pendientes ?? [], // lecciones que falta enviar al servidor
  };
}

function ProgresoProvider({ children }) {
  const [progreso, setProgreso] = useState(null);
  const [sincronizacion, setSincronizacion] = useState({ enviando: false, error: null, ultima: null });
  const enLinea = useConexion();

  // 1. Cargar lo guardado en el dispositivo.
  useEffect(() => {
    let activo = true;
    leer(CLAVE).then((guardado) => {
      if (activo) setProgreso(normalizar(guardado));
    });
    return () => {
      activo = false;
    };
  }, []);

  // 2. Guardar cada cambio.
  useEffect(() => {
    if (progreso) guardar(CLAVE, progreso);
  }, [progreso]);

  // 3. Enviar al servidor lo pendiente, si hay conexión. Si falla, se
  //    reintenta con el siguiente cambio, al recuperar la conexión o al recargar.
  useEffect(() => {
    if (!progreso?.pendientes.length || !enLinea || !sincronizacionDisponible()) return;

    const enviados = {};
    const eventos = progreso.pendientes.map((clave) => {
      const [cursoId, leccionId] = clave.split(':');
      const registro = progreso.lecciones[clave];
      enviados[clave] = registro.actualizadoEn;
      return {
        curso_id: cursoId,
        leccion_id: leccionId,
        completada: registro.completada,
        puntaje: registro.puntaje,
        intentos: registro.intentos,
        actualizado_en: registro.actualizadoEn,
      };
    });

    const temporizador = setTimeout(async () => {
      setSincronizacion((previa) => ({ ...previa, enviando: true }));
      const resultado = await enviarProgreso(progreso.alumnoId, eventos);
      setSincronizacion((previa) => ({
        enviando: false,
        error: resultado.ok ? null : resultado.error,
        ultima: resultado.ok ? new Date().toISOString() : previa.ultima,
      }));
      if (resultado.ok) {
        // Solo se limpia lo que no cambió mientras se enviaba.
        setProgreso((previo) => ({
          ...previo,
          pendientes: previo.pendientes.filter(
            (clave) => previo.lecciones[clave].actualizadoEn !== enviados[clave],
          ),
        }));
      }
    }, ESPERA_SINCRONIZACION);

    return () => clearTimeout(temporizador);
  }, [progreso, enLinea]);

  const actualizarLeccion = useCallback((cursoId, leccionId, cambios) => {
    pedirAlmacenamientoPersistente();
    setProgreso((previo) => {
      const clave = claveLeccion(cursoId, leccionId);
      const anterior = previo.lecciones[clave] ?? { completada: false, intentos: 0, puntaje: null };
      const actualizado = {
        // Lo completado nunca se pierde y se guarda el mejor puntaje.
        completada: anterior.completada || Boolean(cambios.completada),
        intentos: anterior.intentos + (cambios.intento ? 1 : 0),
        puntaje: cambios.puntaje == null ? anterior.puntaje : Math.max(anterior.puntaje ?? 0, cambios.puntaje),
        actualizadoEn: new Date().toISOString(),
      };
      return {
        ...previo,
        lecciones: { ...previo.lecciones, [clave]: actualizado },
        pendientes: previo.pendientes.includes(clave) ? previo.pendientes : [...previo.pendientes, clave],
      };
    });
  }, []);

  const completarLeccion = useCallback(
    (cursoId, leccionId) => actualizarLeccion(cursoId, leccionId, { completada: true }),
    [actualizarLeccion],
  );

  const registrarExamen = useCallback(
    (cursoId, leccionId, puntaje, aprobado) =>
      actualizarLeccion(cursoId, leccionId, { completada: aprobado, puntaje, intento: true }),
    [actualizarLeccion],
  );

  const valor = useMemo(
    () =>
      progreso && {
        progreso,
        xp: calcularXP(progreso),
        completarLeccion,
        registrarExamen,
        sincronizacion: {
          ...sincronizacion,
          pendientes: progreso.pendientes.length,
          disponible: sincronizacionDisponible(),
        },
      },
    [progreso, sincronizacion, completarLeccion, registrarExamen],
  );

  // Leer IndexedDB tarda milisegundos: se espera para no mostrar lecciones
  // bloqueadas que en realidad ya están completadas.
  if (!valor) return null;

  return <ContextoProgreso.Provider value={valor}>{children}</ContextoProgreso.Provider>;
}

export default ProgresoProvider;
