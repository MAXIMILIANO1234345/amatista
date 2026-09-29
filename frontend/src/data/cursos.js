// Catálogo de cursos. Por ahora es estático y viaja dentro de la app
// (disponible sin conexión). Más adelante vendrá del backend y se
// guardará en IndexedDB.

export const cursos = [
  {
    id: 'blender',
    numero: '01',
    titulo: 'Blender',
    subtitulo: 'Modelado 3D low poly',
    descripcion:
      'Aprende a moverte en Blender, modela objetos low poly, dales color y expórtalos en formato GLB listos para la web.',
    estado: 'disponible',
    nivel: 'Principiante',
    acento: 'blender',
    modulos: [
      'Interfaz y navegación',
      'Modelado low poly',
      'Materiales y texturas',
      'Exportación GLB',
    ],
    recurso: {
      texto: 'Descarga Blender gratis',
      url: 'https://www.blender.org/download/',
    },
  },
  {
    id: 'aframe',
    numero: '02',
    titulo: 'A-Frame',
    subtitulo: 'Mundos WebXR en el navegador',
    descripcion:
      'Lleva tus modelos a la web: crea escenas 3D con HTML, agrega interacción y visítalas en realidad virtual o aumentada.',
    estado: 'bloqueado',
    nivel: 'Intermedio',
    acento: 'neon',
    requisito: 'Se desbloquea al terminar Blender',
    modulos: [
      'Escenas y entidades',
      'Cargar modelos GLB',
      'Interactividad',
      'Experiencias WebXR',
    ],
  },
];
