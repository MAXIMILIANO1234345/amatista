import { useEffect, useState } from 'react';

// Guarda el aviso de instalación del navegador para mostrar
// nuestro propio botón "Instalar". Devuelve null si no se puede instalar.
export function useInstalarPWA() {
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    const guardar = (evento) => {
      evento.preventDefault();
      setAviso(evento);
    };
    const instalada = () => setAviso(null);
    window.addEventListener('beforeinstallprompt', guardar);
    window.addEventListener('appinstalled', instalada);
    return () => {
      window.removeEventListener('beforeinstallprompt', guardar);
      window.removeEventListener('appinstalled', instalada);
    };
  }, []);

  if (!aviso) return null;

  return async () => {
    aviso.prompt();
    await aviso.userChoice;
    setAviso(null);
  };
}
