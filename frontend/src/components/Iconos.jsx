// Íconos low poly: solo polígonos de caras planas, sin degradados.

export function CristalLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points="32,2 10,22 32,26" fill="#D2A8F0" />
      <polygon points="32,2 54,22 32,26" fill="#B57EDC" />
      <polygon points="10,22 32,26 20,46" fill="#9B59B6" />
      <polygon points="54,22 32,26 44,46" fill="#7D3C98" />
      <polygon points="20,46 32,26 32,62" fill="#8E44AD" />
      <polygon points="44,46 32,26 32,62" fill="#5B2C7A" />
      <polyline points="10,22 32,26 54,22" fill="none" stroke="#00E5FF" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

// Cubo facetado: el primer objeto que todos modelan en Blender.
export function IconoBlender({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points="32,4 58,18 32,18" fill="#FFB27A" />
      <polygon points="32,4 6,18 32,18" fill="#FBA062" />
      <polygon points="6,18 32,18 32,32" fill="#F58D48" />
      <polygon points="58,18 32,18 32,32" fill="#F8964F" />
      <polygon points="6,18 32,32 6,46" fill="#E06A1F" />
      <polygon points="6,46 32,32 32,60" fill="#C9591A" />
      <polygon points="58,18 32,32 58,46" fill="#A84A14" />
      <polygon points="58,46 32,32 32,60" fill="#8C3D10" />
    </svg>
  );
}

// Visor de realidad virtual: el destino de las escenas A-Frame.
export function IconoAFrame({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points="6,22 14,14 32,14 32,42 26,50 14,50 6,44" fill="#00B8CC" />
      <polygon points="58,22 50,14 32,14 32,42 38,50 50,50 58,44" fill="#008A99" />
      <polygon points="6,22 14,14 50,14 58,22" fill="#5CF0FF" />
      <polygon points="13,32 16.5,26 23.5,26 27,32 23.5,38 16.5,38" fill="#121212" />
      <polygon points="37,32 40.5,26 47.5,26 51,32 47.5,38 40.5,38" fill="#121212" />
      <polygon points="16.5,26 23.5,26 20,31" fill="#1E3A40" />
      <polygon points="40.5,26 47.5,26 44,31" fill="#1E3A40" />
    </svg>
  );
}

export function IconoCandado({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <polygon points="4,10 20,10 20,21 4,21" fill="currentColor" />
    </svg>
  );
}
