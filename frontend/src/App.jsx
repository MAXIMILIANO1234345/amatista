import { lazy, Suspense, useEffect, useState } from 'react';
import BarraSuperior from './components/BarraSuperior';
import FondoLowPoly from './components/FondoLowPoly';
import { CristalLogo } from './components/Iconos';
import Inicio from './pages/Inicio';
import ProgresoProvider from './progreso/ProgresoProvider';
import { analizarRuta } from './rutas';

// Páginas bajo demanda: la pantalla de inicio carga rápido.
// El laboratorio incluye A-Frame (~1.3 MB): solo se descarga si se visita.
const Curso = lazy(() => import('./pages/Curso'));
const Leccion = lazy(() => import('./pages/Leccion'));
const Laboratorio = lazy(() => import('./pages/Laboratorio'));

function useRuta() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const cambiar = () => {
      setHash(window.location.hash);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', cambiar);
    return () => window.removeEventListener('hashchange', cambiar);
  }, []);
  return analizarRuta(hash);
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

function Pagina({ ruta }) {
  switch (ruta.pagina) {
    case 'curso':
      return <Curso cursoId={ruta.cursoId} />;
    case 'leccion':
      return <Leccion cursoId={ruta.cursoId} leccionId={ruta.leccionId} />;
    case 'laboratorio':
      return <Laboratorio />;
    default:
      return <Inicio />;
  }
}

function App() {
  const ruta = useRuta();

  return (
    <div className="min-h-screen">
      <FondoLowPoly />
      <ProgresoProvider>
        <BarraSuperior />
        <Suspense fallback={<Cargando />}>
          <Pagina ruta={ruta} />
        </Suspense>
      </ProgresoProvider>
    </div>
  );
}

export default App;
