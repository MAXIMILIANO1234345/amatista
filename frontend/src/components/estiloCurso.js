import { IconoAFrame, IconoBlender } from './Iconos';

export const ICONOS_CURSO = {
  blender: IconoBlender,
  aframe: IconoAFrame,
};

// Tailwind necesita las clases completas escritas en el código.
export const ACENTOS = {
  blender: {
    borde: 'from-blender via-amatista to-amatista-oscuro',
    texto: 'text-blender',
    fondo: 'bg-blender',
    brillo: 'shadow-[0_0_40px_-8px_rgba(245,121,42,0.55)]',
  },
  neon: {
    borde: 'from-neon via-amatista to-amatista-oscuro',
    texto: 'text-neon',
    fondo: 'bg-neon',
    brillo: 'shadow-[0_0_40px_-8px_rgba(0,229,255,0.45)]',
  },
};
