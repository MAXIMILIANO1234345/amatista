// Pila de capas: de lo que escribe el alumno hasta la tarjeta gráfica.
const TONOS = ['bg-amatista-claro/25', 'bg-amatista/25', 'bg-amatista/15', 'bg-neon/10', 'bg-neon/20'];

function Capas({ title, items, footer }) {
  return (
    <section className="corte-poly border border-white/10 bg-superficie/90 p-5 sm:p-7">
      <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-neon">{title}</h3>
      <ol className="space-y-2">
        {items.map((capa, i) => (
          <li
            key={capa.title}
            className={`corte-poly-sm flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${TONOS[i % TONOS.length]}`}
            style={{ marginInline: `${i * 2}%` }}
          >
            <span className="font-mono text-sm font-bold text-white sm:w-28">{capa.title}</span>
            <span className="text-sm text-texto/80">{capa.text}</span>
          </li>
        ))}
      </ol>
      {footer && <p className="mt-5 text-sm leading-relaxed text-texto/70">{footer}</p>}
    </section>
  );
}

export default Capas;
