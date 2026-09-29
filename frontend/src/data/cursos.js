// Catálogo de cursos. Viaja dentro de la app, así que está disponible sin
// conexión. El contenido de cada módulo vive en data/modulos/*.json.
import aframeModulo1 from './modulos/aframe-modulo-1.json';
import blenderModulo1 from './modulos/blender-modulo-1.json';

export const cursos = [
  {
    id: 'blender',
    numero: '01',
    titulo: 'Blender',
    subtitulo: 'Modelado 3D low poly',
    descripcion:
      'Descubre el mundo 3D, modela objetos low poly, dales color y expórtalos en formato GLB listos para la web.',
    estado: 'disponible',
    nivel: 'Principiante',
    acento: 'blender',
    recurso: {
      texto: 'Descarga Blender gratis',
      url: 'https://www.blender.org/download/',
    },
    modulos: [
      { titulo: 'El mundo 3D y Blender', insignia: 'Explorador 3D', contenido: blenderModulo1.module },
      { titulo: 'Interfaz y navegación' },
      { titulo: 'Modelado low poly' },
      { titulo: 'Materiales y exportación GLB' },
    ],
  },
  {
    id: 'aframe',
    numero: '02',
    titulo: 'A-Frame',
    subtitulo: 'Mundos WebXR en el navegador',
    descripcion:
      'Lleva tus modelos a la web: crea escenas 3D con HTML, agrega interacción y visítalas en realidad virtual o aumentada.',
    estado: 'disponible',
    nivel: 'Intermedio',
    acento: 'neon',
    recurso: {
      texto: 'Documentación de A-Frame',
      url: 'https://aframe.io/docs/',
    },
    modulos: [
      { titulo: 'La web en 3D', insignia: 'Arquitecto WebXR', contenido: aframeModulo1.module },
      { titulo: 'Cargar modelos GLB' },
      { titulo: 'Interactividad' },
      { titulo: 'Experiencias WebXR' },
    ],
  },
];

export function buscarCurso(id) {
  return cursos.find((curso) => curso.id === id);
}

// Todas las lecciones publicadas del curso, en orden, con su módulo.
export function leccionesDelCurso(curso) {
  return curso.modulos
    .filter((modulo) => modulo.contenido)
    .flatMap((modulo) =>
      modulo.contenido.lessons.map((leccion, indice) => ({ modulo, leccion, indice })),
    );
}

export function buscarLeccion(curso, leccionId) {
  return leccionesDelCurso(curso).find(({ leccion }) => leccion.id === leccionId);
}

export const TIPOS_LECCION = {
  theory_reading: 'Lectura',
  theory_interactive: 'Interactiva',
  video_lesson: 'Video',
  code_interactive: 'Código',
  exam: 'Examen',
};

export function duracionTexto(segundos) {
  if (!segundos) return null;
  return `${Math.max(1, Math.round(segundos / 60))} min`;
}
