import { useState } from 'react';
import { IconoAFrame, IconoBlender, IconoCandado } from './Iconos';

const ICONOS = {
  blender: IconoBlender,
  aframe: IconoAFrame,
};

// Tailwind necesita las clases completas escritas en el código.
const ACENTOS = {
  blender: {
    borde: 'from-blender via-amatista to-amatista-oscuro',
    texto: 'text-blender',
    fondo: 'bg-blender',
    brillo: 'shadow-[0_0_40px_-8px_rgba(245,121,42,0.55)]',
  },
  neon: {
    borde: 'from-neon/60 via-amatista/60 to-amatista-oscuro',
    texto: 'text-neon',
    fondo: 'bg-neon',
    brillo: '',
  },
};

function TarjetaCurso({ curso, indice }) {
  const [aviso, setAviso] = useState(false);
  const Icono = ICONOS[curso.id];
  const acento = ACENTOS[curso.acento];
  const bloqueado = curso.estado === 'bloqueado';

  return (
    <article
      className={`corte-poly animar-entrar bg-gradient-to-br p-[2px] transition-transform duration-300 ${acento.borde} ${
        bloqueado ? 'opacity-80' : `hover:-translate-y-1 ${acento.brillo}`
      }`}
      style={{ animationDelay: `${indice * 120}ms` }}
      aria-labelledby={`curso-${curso.id}`}
    >
      <div className="corte-poly flex h-full flex-col gap-5 bg-superficie/95 p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          <span className="text-white/50">Curso {curso.numero}</span>
          {bloqueado ? (
            <span className="corte-poly-sm flex items-center gap-1.5 bg-white/5 px-2.5 py-1 text-white/60">
              <IconoCandado className="h-3 w-3" /> Próximamente
            </span>
          ) : (
            <span className={`corte-poly-sm px-2.5 py-1 font-bold text-base ${acento.fondo}`}>
              Disponible
            </span>
          )}
        </div>

        <div className="flex items-center gap-5">
          <div className="hexagono relative grid h-24 w-24 shrink-0 place-items-center bg-base">
            <Icono
              className={`h-16 w-16 ${bloqueado ? 'opacity-40 grayscale' : 'animar-flotar'}`}
            />
            {bloqueado && (
              <IconoCandado className="absolute h-7 w-7 text-white/80" />
            )}
          </div>
          <div>
            <h2 id={`curso-${curso.id}`} className="text-3xl font-extrabold text-white">
              {curso.titulo}
            </h2>
            <p className={`font-medium ${acento.texto}`}>{curso.subtitulo}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/50">
              {curso.nivel} · {curso.modulos.length} módulos
            </p>
          </div>
        </div>

        <p className="leading-relaxed text-texto/80">{curso.descripcion}</p>

        {/* Ruta de niveles del curso */}
        <ol className="grid gap-2" aria-label={`Módulos de ${curso.titulo}`}>
          {curso.modulos.map((modulo, i) => {
            const inicio = !bloqueado && i === 0;
            return (
              <li key={modulo} className="flex items-center gap-3">
                <span
                  className={`hexagono grid h-7 w-8 shrink-0 place-items-center font-mono text-[11px] font-bold ${
                    inicio ? `${acento.fondo} text-base` : 'bg-white/10 text-white/50'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={inicio ? 'text-white' : 'text-white/55'}>{modulo}</span>
                {inicio && (
                  <span className={`ml-auto font-mono text-[10px] uppercase tracking-widest ${acento.texto} animar-pulso`}>
                    Inicio
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div>
          <div className="mb-1.5 flex justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
            <span>Progreso</span>
            <span>0 / {curso.modulos.length}</span>
          </div>
          <div
            className="h-2 bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={curso.modulos.length}
            aria-valuenow={0}
            aria-label={`Progreso en ${curso.titulo}`}
          >
            <div className={`h-full w-0 ${acento.fondo}`} />
          </div>
        </div>

        <div className="mt-auto">
          {bloqueado ? (
            <>
              <button
                type="button"
                disabled
                className="corte-poly-sm flex w-full cursor-not-allowed items-center justify-center gap-2 bg-white/5 py-3 font-bold uppercase tracking-widest text-white/40"
              >
                <IconoCandado className="h-4 w-4" /> Bloqueado
              </button>
              <p className="mt-2 text-center font-mono text-xs text-white/45">{curso.requisito}</p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setAviso(true)}
                className={`corte-poly-sm w-full py-3 font-extrabold uppercase tracking-widest text-base transition-[filter] hover:brightness-110 ${acento.fondo}`}
              >
                ▶ Comenzar
              </button>
              {aviso && (
                <p role="status" className="mt-3 text-center text-sm text-texto/80">
                  Las primeras lecciones están en construcción. Mientras tanto,{' '}
                  <a
                    href={curso.recurso.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-semibold underline underline-offset-4 ${acento.texto}`}
                  >
                    {curso.recurso.texto.toLowerCase()}
                  </a>
                  .
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default TarjetaCurso;
