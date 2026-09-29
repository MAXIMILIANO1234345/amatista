import IconoLeccion from './IconosLeccion';

function Pipeline({ title, steps }) {
  return (
    <section className="corte-poly border border-white/10 bg-superficie/90 p-5 sm:p-7">
      <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-neon">{title}</h3>
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map((paso, i) => (
          <li key={paso.title} className="corte-poly-sm relative flex gap-3 bg-base/80 p-4 sm:flex-col sm:gap-2">
            <span className="absolute right-3 top-2 font-mono text-xs text-white/30">
              {String(i + 1).padStart(2, '0')}
            </span>
            <IconoLeccion nombre={paso.icon} className="h-12 w-12 shrink-0" />
            <div>
              <p className="font-bold text-white">{paso.title}</p>
              <p className="text-sm leading-snug text-texto/70">{paso.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Pipeline;
