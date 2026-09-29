function Figura({ src, alt, caption, prioridad = false }) {
  return (
    <figure className="corte-poly overflow-hidden border border-white/10 bg-superficie">
      <img
        src={import.meta.env.BASE_URL + src}
        alt={alt}
        width="640"
        height="360"
        loading={prioridad ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-video w-full object-cover"
      />
      {caption && (
        <figcaption className="border-t border-white/5 px-4 py-2 font-mono text-xs text-white/50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Figura;
