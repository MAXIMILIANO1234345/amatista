import { useProgreso } from '../progreso/contexto';

// Le dice al alumno dónde está su progreso: siempre en el dispositivo y,
// cuando se pueda, también en el servidor.
function EstadoGuardado() {
  const { sincronizacion } = useProgreso();

  let detalle = '';
  if (sincronizacion.enviando) detalle = 'Sincronizando con el servidor…';
  else if (sincronizacion.pendientes === 0 && sincronizacion.ultima) detalle = 'Sincronizado con el servidor.';
  else if (sincronizacion.pendientes > 0) detalle = 'Se enviará al servidor cuando esté disponible.';

  return (
    <p className="font-mono text-xs text-white/45">
      <span className="mr-1.5 inline-block h-2 w-2 rotate-45 bg-amatista" aria-hidden="true" />
      Tu progreso se guarda en este dispositivo. {detalle}
    </p>
  );
}

export default EstadoGuardado;
