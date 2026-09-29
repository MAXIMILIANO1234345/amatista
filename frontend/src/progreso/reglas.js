// Reglas del progreso: funciones puras, sin estado ni efectos.
import { leccionesDelCurso } from '../data/cursos';

export const XP_POR_LECCION = 100;

export const claveLeccion = (cursoId, leccionId) => `${cursoId}:${leccionId}`;

export function registroLeccion(progreso, cursoId, leccionId) {
  return progreso.lecciones[claveLeccion(cursoId, leccionId)];
}

export function estaCompletada(progreso, cursoId, leccionId) {
  return Boolean(registroLeccion(progreso, cursoId, leccionId)?.completada);
}

// Una lección bloqueada se abre al completar la anterior.
export function estaDesbloqueada(progreso, cursoId, modulo, indice) {
  const lecciones = modulo.contenido.lessons;
  if (indice === 0 || !lecciones[indice].isLocked) return true;
  return estaCompletada(progreso, cursoId, lecciones[indice - 1].id);
}

export function moduloCompletado(progreso, cursoId, modulo) {
  return modulo.contenido.lessons.every((leccion) => estaCompletada(progreso, cursoId, leccion.id));
}

export function resumenCurso(progreso, curso) {
  const lecciones = leccionesDelCurso(curso);
  const pendientes = lecciones.filter(({ leccion }) => !estaCompletada(progreso, curso.id, leccion.id));
  return {
    total: lecciones.length,
    completadas: lecciones.length - pendientes.length,
    siguiente: pendientes[0] ?? null,
  };
}

// Cada lección da 100 XP; un examen aprobado suma además su puntaje.
export function calcularXP(progreso) {
  return Object.values(progreso.lecciones).reduce(
    (total, registro) =>
      registro.completada ? total + XP_POR_LECCION + (registro.puntaje ?? 0) : total,
    0,
  );
}
