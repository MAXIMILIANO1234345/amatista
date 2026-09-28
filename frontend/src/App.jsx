import './index.css';
import { useEffect, useState } from 'react';
import { checkBackendStatus, iniciarSesionBD } from './services/api';

function App() {
  const [status, setStatus] = useState("Conectando...");
  const [sesionActiva, setSesionActiva] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await checkBackendStatus();
      if (data && data.estado) {
        setStatus("Oracle: Conectado");
      } else {
        setStatus("Oracle: Desconectado");
      }
    };
    fetchStatus();
  }, []);

  // Función que se ejecuta al darle click al botón
  const handleCrearSesion = async () => {
    // Simulamos un correo de un alumno
    const datosDB = await iniciarSesionBD("alumno_prueba@amatista.local");
    if (datosDB) {
      setSesionActiva(datosDB);
    }
  };

  return (
    <div className="min-h-screen bg-base text-white flex flex-col font-sans">
      {/* Barra de Navegación */}
      <header className="bg-superficie p-4 border-b border-amatista/30 flex justify-between items-center z-10 relative shadow-md">
        <h1 className="text-2xl font-bold tracking-widest text-amatista">
          AMATISTA<span className="text-neon">.PWA</span>
        </h1>
        <span className={`px-3 py-1 rounded-full text-sm border font-medium ${
          status.includes("Conectado") 
            ? "bg-amatista/20 text-amatista border-amatista/50" 
            : "bg-red-500/20 text-red-400 border-red-500/50"
        }`}>
          Estado: {status}
        </span>
      </header>

      <main className="flex-1 flex p-4 gap-4 z-0">
        {/* Panel Lateral: Tutor IA y Base de Datos */}
        <aside className="w-1/4 bg-superficie rounded-xl p-4 shadow-lg border border-white/5 flex flex-col gap-4">
          
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-amatista font-semibold mb-2">Gestor de Base de Datos</h2>
            {!sesionActiva ? (
              <button 
                onClick={handleCrearSesion}
                className="w-full bg-amatista hover:bg-amatista/80 text-white py-2 rounded transition-colors text-sm font-bold"
              >
                Crear Nueva Sesión (Prueba)
              </button>
            ) : (
              <div className="bg-black/50 p-3 rounded border border-amatista/30 text-xs">
                <p className="text-emerald-400 mb-1">✔ {sesionActiva.mensaje}</p>
                <p className="text-gray-400">Usuario ID: <span className="text-white">{sesionActiva.usuario_id}</span></p>
                <p className="text-gray-400 truncate">Sesión UUID: <br/><span className="text-neon">{sesionActiva.sesion_id}</span></p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-neon font-semibold mb-2">Tutor IA</h2>
            <div className="text-sm text-gray-500 text-center px-4 py-8 bg-black/30 rounded border border-white/5">
              Esperando conexión con el túnel de Ollama...
            </div>
          </div>
        </aside>

        {/* Panel Central: Visor 3D A-Frame */}
        <section className="flex-1 bg-black rounded-xl overflow-hidden relative border border-white/5 shadow-lg">
          <div className="absolute top-4 left-4 z-10 bg-base/80 border border-white/10 px-3 py-1 rounded text-sm text-neon font-mono">
            Visor WebXR (A-Frame)
          </div>
          <a-scene embedded style={{ height: "100%", width: "100%" }}>
            <a-box position="-1 0.5 -3" rotation="0 45 0" color="#9B59B6"></a-box>
            <a-sphere position="0 1.25 -5" radius="1.25" color="#00E5FF"></a-sphere>
            <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFFFFF"></a-cylinder>
            <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#1E1E1E"></a-plane>
            <a-sky color="#121212"></a-sky>
          </a-scene>
        </section>
      </main>
    </div>
  );
}

export default App;