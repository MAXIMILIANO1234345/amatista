// src/services/api.js
export const API_URL = import.meta.env.VITE_API_URL || "http://158.101.118.222:8000";

// fetch con tiempo máximo: si el servidor no responde, no dejamos la app esperando.
async function pedir(ruta, opciones = {}, esperaMs = 8000) {
  const control = new AbortController();
  const temporizador = setTimeout(() => control.abort(), esperaMs);
  try {
    return await fetch(`${API_URL}${ruta}`, { ...opciones, signal: control.signal });
  } finally {
    clearTimeout(temporizador);
  }
}

// Un sitio servido por https no puede llamar a un backend http: el navegador
// lo bloquea ("mixed content"). En ese caso ni lo intentamos.
export function sincronizacionDisponible() {
  return Boolean(API_URL) && !(window.location.protocol === "https:" && API_URL.startsWith("http:"));
}

// Estado del backend y de la base de datos (endpoint /api/salud).
export const consultarSalud = async () => {
  try {
    const response = await pedir("/api/salud");
    const datos = await response.json().catch(() => ({}));
    if (response.status === 404) {
      return { backend: true, baseDatos: false, detalle: "Este backend no tiene /api/salud: sube la versión nueva de backend/." };
    }
    return { backend: true, baseDatos: response.ok, detalle: datos.detail ?? datos.motor ?? null };
  } catch (error) {
    console.error("Error conectando al backend:", error);
    return { backend: false, baseDatos: false, detalle: null };
  }
};

export const iniciarSesionBD = async (email) => {
  try {
    const response = await pedir("/api/iniciar-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        dispositivo: navigator.userAgent.substring(0, 45) // Detecta el navegador real
      })
    });
    if (!response.ok) throw new Error("Falló el registro en base de datos");
    return await response.json();
  } catch (error) {
    console.error("Error creando sesión:", error);
    return null;
  }
};

// Envía al servidor el progreso guardado en el dispositivo.
export const enviarProgreso = async (usuarioId, eventos) => {
  try {
    const response = await pedir("/api/progreso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: usuarioId, eventos }),
    });
    return response.ok ? { ok: true } : { ok: false, error: `El servidor respondió ${response.status}` };
  } catch {
    return { ok: false, error: "No se pudo contactar al servidor" };
  }
};
