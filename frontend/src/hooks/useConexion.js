import { useEffect, useState } from 'react';

// Indica si el navegador tiene conexión a Internet.
export function useConexion() {
  const [enLinea, setEnLinea] = useState(() => navigator.onLine);

  useEffect(() => {
    const conectar = () => setEnLinea(true);
    const desconectar = () => setEnLinea(false);
    window.addEventListener('online', conectar);
    window.addEventListener('offline', desconectar);
    return () => {
      window.removeEventListener('online', conectar);
      window.removeEventListener('offline', desconectar);
    };
  }, []);

  return enLinea;
}
