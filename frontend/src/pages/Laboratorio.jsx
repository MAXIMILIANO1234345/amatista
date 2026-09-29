// Laboratorio técnico: pruebas de integración con el backend y el visor 3D.
// Esta página se carga bajo demanda, así A-Frame no pesa en la pantalla de inicio.
import 'aframe';
import { useEffect, useState } from 'react';
import { checkBackendStatus, iniciarSesionBD } from '../services/api';

function Laboratorio() {
  const [status, setStatus] = useState("Conectando...");
  const [online, setOnline] = useState(false);
  const [sesionActiva, setSesionActiva] = useState(null);
  const [errorSesion, setErrorSesion] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await checkBackendStatus();
      if (data && data.estado && data.estado !== "Desconectado") {
        setOnline(true);
        setStatus("Oracle: Conectado");
      } else {
        setStatus("Oracle: Desconectado");
      }
    };
    fetchStatus();
  }, []);

  const handleCrearSesion = async () => {
    // Simulamos un correo de un alumno
    const datosDB = await iniciarSesionBD("alumno_prueba@amatista.local");
    if (datosDB) {
      setSesionActiva(datosDB);
      setErrorSesion(false);
    } else {
      setErrorSesion(true);
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <a href="#/" className="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-neon">
            ◂ Volver a cursos
          </a>
          <h1 className="mt-1 text-2xl font-extrabold text-white">Laboratorio técnico</h1>
        </div>
        <span
          role="status"
          className={`corte-poly-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${
            online
              ? "border-amatista/50 bg-amatista/20 text-amatista-claro"
              : "border-red-500/50 bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <aside className="corte-poly flex flex-col gap-4 bg-superficie p-4 lg:w-1/4">
          <div className="border-b border-white/10 pb-4">
            <h2 className="mb-2 font-semibold text-amatista-claro">Gestor de Base de Datos</h2>
            {!sesionActiva ? (
              <>
                <button
                  type="button"
                  onClick={handleCrearSesion}
                  className="corte-poly-sm w-full bg-amatista py-2 text-sm font-bold text-white transition-colors hover:bg-amatista/80"
                >
                  Crear Nueva Sesión (Prueba)
                </button>
                {errorSesion && (
                  <p className="mt-2 text-xs text-red-400">No se pudo crear la sesión. Revisa la conexión con el backend.</p>
                )}
              </>
            ) : (
              <div className="border border-amatista/30 bg-black/50 p-3 text-xs">
                <p className="mb-1 text-emerald-400">✔ {sesionActiva.mensaje}</p>
                <p className="text-gray-400">Usuario ID: <span className="text-white">{sesionActiva.usuario_id}</span></p>
                <p className="truncate text-gray-400">Sesión UUID: <br /><span className="text-neon">{sesionActiva.sesion_id}</span></p>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-2 font-semibold text-neon">Tutor IA</h2>
            <div className="border border-white/5 bg-black/30 px-4 py-8 text-center text-sm text-gray-500">
              Esperando conexión con el túnel de Ollama...
            </div>
          </div>
        </aside>

        <section className="corte-poly relative h-[60vh] flex-1 overflow-hidden bg-black">
          <div className="absolute left-4 top-4 z-10 border border-white/10 bg-base/80 px-3 py-1 font-mono text-sm text-neon">
            Visor WebXR (A-Frame)
          </div>
          <a-scene embedded style={{ height: "100%", width: "100%" }}>
            <a-box position="-1 0.5 -3" rotation="0 45 0" color="#9B59B6"></a-box>
            <a-sphere position="0 1.25 -5" radius="1.25" color="#00E5FF"></a-sphere>
            <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFFFFF"></a-cylinder>
            <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#1E1E1E"></a-plane>
            <a-sky color="#121212"></a-sky>
          </a-scene>
        </section>
      </div>
    </main>
  );
}

export default Laboratorio;
