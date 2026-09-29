import IconoLeccion from './IconosLeccion';

function LineaTiempo({ title, items }) {
  return (
    <section className="corte-poly border border-white/10 bg-superficie/90 p-5 sm:p-7">
      <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-neon">{title}</h3>
      <ol className="relative space-y-6">
        <span className="absolute bottom-6 left-7 top-6 w-px bg-gradient-to-b from-amatista via-blender to-neon" aria-hidden="true" />
        {items.map((item) => (
          <li key={item.year} className="relative flex gap-5">
            <div className="hexagono relative grid h-14 w-14 shrink-0 place-items-center bg-base">
              <IconoLeccion nombre={item.icon} className="h-9 w-9" />
            </div>
            <div className="pt-1">
              <p className="font-mono text-sm font-bold text-blender">{item.year}</p>
              <p className="text-lg font-bold text-white">{item.title}</p>
              <p className="leading-relaxed text-texto/75">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default LineaTiempo;
