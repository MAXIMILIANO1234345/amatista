import { createContext, useContext } from 'react';

export const ContextoProgreso = createContext(null);

export function useProgreso() {
  const valor = useContext(ContextoProgreso);
  if (!valor) throw new Error('useProgreso debe usarse dentro de <ProgresoProvider>');
  return valor;
}
