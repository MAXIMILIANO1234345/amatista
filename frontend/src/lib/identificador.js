// crypto.randomUUID solo existe en contextos seguros (https o localhost).
export function nuevoId(prefijo) {
  const aleatorio =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  return `${prefijo}-${aleatorio}`;
}
