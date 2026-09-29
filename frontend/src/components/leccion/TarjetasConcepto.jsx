import { useState } from 'react';

// Tarjetas que se voltean para descubrir cada concepto.
function TarjetasConcepto({ items, alDescubrirTodas }) {
  const [volteadas, setVolteadas] = useState(() => new Set());
  const [vistas, setVistas] = useState(() => new Set());

  const voltear = (termino) => {
    const siguientes = new Set(volteadas);
    if (siguientes.has(termino)) siguientes.delete(termino);
    else siguientes.add(termino);
    setVolteadas(siguientes);

    if (!vistas.has(termino)) {
      const nuevasVistas = new Set(vistas).add(termino);
      setVistas(nuevasVistas);
      if (nuevasVistas.size === items.length) alDescubrirTodas?.();
    }
  };

  return (
    <section>
      <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span className="text-neon">Toca cada tarjeta</span>
        <span className={vistas.size === items.length ? 'text-emerald-400' : 'text-white/50'}>
          {vistas.size === items.length ? '✓ Todas descubiertas' : `Descubiertas ${vistas.size} / ${items.length}`}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const volteada = volteadas.has(item.term);
          return (
            <button
              key={item.term}
              type="button"
              onClick={() => voltear(item.term)}
              aria-pressed={volteada}
              className="text-left [perspective:1200px]"
            >
              <div
                className={`grid h-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none ${
                  volteada ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                <div
                  className="corte-poly flex flex-col border border-white/10 bg-superficie [backface-visibility:hidden] [grid-area:1/1]"
                  aria-hidden={volteada}
                >
                  {item.image && (
                    <img
                      src={import.meta.env.BASE_URL + item.image}
                      alt={item.alt ?? ''}
                      width="320"
                      height="240"
                      loading="lazy"
                      className="block aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col justify-between gap-2 p-4">
                    <p className="text-lg font-bold text-white">{item.term}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-amatista-claro">
                      Toca para descubrir ▸
                    </p>
                  </div>
                </div>
                <div
                  className="corte-poly flex flex-col gap-3 border border-neon/40 bg-gradient-to-br from-amatista-oscuro to-superficie p-5 [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]"
                  aria-hidden={!volteada}
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-neon">{item.term}</p>
                  <p className="leading-relaxed text-texto/90">{item.definition}</p>
                  <p className="mt-auto font-mono text-[11px] uppercase tracking-widest text-white/40">◂ Toca para volver</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default TarjetasConcepto;
