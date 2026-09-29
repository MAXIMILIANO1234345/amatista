// Rutas por hash: funcionan en cualquier hosting estático y sin conexión.
export const rutas = {
  inicio: '#/',
  laboratorio: '#/laboratorio',
  curso: (cursoId) => `#/curso/${cursoId}`,
  leccion: (cursoId, leccionId) => `#/curso/${cursoId}/leccion/${leccionId}`,
};

export function analizarRuta(hash) {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (partes[0] === 'laboratorio') return { pagina: 'laboratorio' };
  if (partes[0] === 'curso' && partes[1] && partes[2] === 'leccion' && partes[3]) {
    return { pagina: 'leccion', cursoId: partes[1], leccionId: partes[3] };
  }
  if (partes[0] === 'curso' && partes[1]) return { pagina: 'curso', cursoId: partes[1] };
  return { pagina: 'inicio' };
}
