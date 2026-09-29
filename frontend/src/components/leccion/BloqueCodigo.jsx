import { lazy, Suspense, useState } from 'react';

// A-Frame (~1.3 MB) solo se descarga cuando el alumno pide ver la escena.
const VistaAFrame = lazy(() => import('./VistaAFrame'));

// Resaltado simple de HTML: etiquetas, atributos y textos entre comillas.
const PATRON_HTML = /(<!--[\s\S]*?-->)|(<\/?[\w-]+)|([\w:-]+)(?==)|("[^"]*")|(\/?>)/g;

function resaltarHTML(codigo) {
  const partes = [];
  let ultimo = 0;
  for (const coincidencia of codigo.matchAll(PATRON_HTML)) {
    const [texto, comentario, etiqueta, atributo, cadena] = coincidencia;
    if (coincidencia.index > ultimo) partes.push(codigo.slice(ultimo, coincidencia.index));
    const color = comentario
      ? 'text-white/40'
      : atributo
        ? 'text-amatista-claro'
        : cadena
          ? 'text-blender'
          : etiqueta
            ? 'text-neon'
            : 'text-neon/70';
    partes.push(
      <span key={coincidencia.index} className={color}>
        {texto}
      </span>,
    );
    ultimo = coincidencia.index + texto.length;
  }
  partes.push(codigo.slice(ultimo));
  return partes;
}

const BOTON = 'corte-poly-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors';

function BloqueCodigo({ code, language = 'html', preview = false }) {
  const [codigo, setCodigo] = useState(code);
  const [editando, setEditando] = useState(false);
  const [ejecucion, setEjecucion] = useState(null);
  const [copiado, setCopiado] = useState(null);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado('Copiado ✓');
    } catch {
      setCopiado('No se pudo copiar');
    }
    setTimeout(() => setCopiado(null), 2000);
  };

  const ejecutar = () => setEjecucion((previa) => ({ codigo, numero: (previa?.numero ?? 0) + 1 }));

  return (
    <section className="corte-poly overflow-hidden border border-white/10 bg-[#0d0b12]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-black/40 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">{language}</span>
        <div className="flex gap-2">
          <button type="button" onClick={copiar} className={`${BOTON} bg-white/5 text-white/70 hover:bg-white/10`}>
            {copiado ?? 'Copiar'}
          </button>
          {preview && (
            <button
              type="button"
              onClick={() => setEditando(!editando)}
              className={`${BOTON} bg-white/5 text-white/70 hover:bg-white/10`}
            >
              {editando ? 'Ver resaltado' : 'Editar'}
            </button>
          )}
        </div>
      </div>

      {editando ? (
        <textarea
          value={codigo}
          onChange={(evento) => setCodigo(evento.target.value)}
          spellCheck={false}
          wrap="off"
          aria-label="Editor de código"
          className="block h-80 w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-texto outline-none"
        />
      ) : (
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-texto/80">
          <code>{resaltarHTML(codigo)}</code>
        </pre>
      )}

      {preview && (
        <div className="border-t border-white/10 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={ejecutar}
              className={`${BOTON} bg-neon font-bold text-base hover:brightness-110`}
            >
              ▶ {ejecucion ? 'Ejecutar de nuevo' : 'Ver en 3D'}
            </button>
            {codigo !== code && (
              <button
                type="button"
                onClick={() => setCodigo(code)}
                className={`${BOTON} bg-white/5 text-white/70 hover:bg-white/10`}
              >
                Restablecer
              </button>
            )}
            <span className="font-mono text-xs text-white/40">
              Arrastra para mirar alrededor · usa las teclas W A S D para moverte
            </span>
          </div>
          {ejecucion && (
            <Suspense
              fallback={
                <div className="mt-4 grid aspect-video place-items-center bg-black font-mono text-xs uppercase tracking-widest text-white/50">
                  Cargando motor 3D…
                </div>
              }
            >
              <VistaAFrame ejecucion={ejecucion} />
            </Suspense>
          )}
        </div>
      )}
    </section>
  );
}

export default BloqueCodigo;
