import { CristalLogo } from './Iconos';
import { useConexion } from '../hooks/useConexion';
import { useInstalarPWA } from '../hooks/useInstalarPWA';
import { useProgreso } from '../progreso/contexto';

function BarraSuperior() {
  const enLinea = useConexion();
  const instalar = useInstalarPWA();
  const { xp } = useProgreso();

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#/" className="flex items-center gap-3" aria-label="Amatista, inicio">
          <CristalLogo className="h-9 w-9 drop-shadow-[0_0_10px_rgba(155,89,182,0.6)]" />
          <span className="text-xl font-extrabold tracking-[0.25em] text-white">
            AMATISTA
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {instalar && (
            <button
              type="button"
              onClick={instalar}
              className="corte-poly-sm bg-amatista px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-amatista-claro hover:text-base"
            >
              Instalar app
            </button>
          )}
          <span
            className="corte-poly-sm flex items-center gap-1.5 border border-amatista/40 bg-amatista/15 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-amatista-claro"
            title="Experiencia ganada al completar lecciones"
          >
            <span aria-hidden="true">◆</span> {xp} XP
          </span>
          <span
            role="status"
            className={`corte-poly-sm flex items-center gap-2 border px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${
              enLinea
                ? 'border-neon/40 bg-neon/10 text-neon'
                : 'border-amatista-claro/40 bg-amatista/10 text-amatista-claro'
            }`}
          >
            <span className={`h-2 w-2 rotate-45 ${enLinea ? 'bg-neon animar-pulso' : 'bg-amatista-claro'}`} />
            <span className="hidden sm:inline">{enLinea ? 'En línea' : 'Sin conexión'}</span>
            <span className="sr-only sm:hidden">{enLinea ? 'En línea' : 'Sin conexión'}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

export default BarraSuperior;
