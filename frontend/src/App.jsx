import { lazy, Suspense, useEffect, useState } from 'react';
import BarraSuperior from './components/BarraSuperior';
import FondoLowPoly from './components/FondoLowPoly';
import { CristalLogo } from './components/Iconos';
import Inicio from './pages/Inicio';

// El laboratorio incluye A-Frame (~1.5 MB): solo se descarga si se visita.
const Laboratorio = lazy(() => import('./pages/Laboratorio'));

function useRuta() {
  const [ruta, setRuta] = useState(() => window.location.hash);
  useEffect(() => {
    const cambiar = () => setRuta(window.location.hash);
    window.addEventListener('hashchange', cambiar);
    return () => window.removeEventListener('hashchange', cambiar);
  }, []);
  return ruta;
}

function Cargando() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <div className="flex flex-col items-center gap-3">
        <CristalLogo className="animar-flotar h-14 w-14" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">Cargando…</span>
      </div>
    </div>
  );
}

function App() {
  const ruta = useRuta();

  return (
    <div className="min-h-screen">
      <FondoLowPoly />
      <BarraSuperior />
      {ruta === '#/laboratorio' ? (
        <Suspense fallback={<Cargando />}>
          <Laboratorio />
        </Suspense>
      ) : (
        <Inicio />
      )}
    </div>
  );
}

export default App;
