// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://158.101.118.222:8000";

export const checkBackendStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) throw new Error("Error en la red");
    return await response.json();
  } catch (error) {
    console.error("Error conectando al backend:", error);
    return { estado: "Desconectado" };
  }
};

// NUEVA FUNCIÓN: Iniciar sesión en Oracle
export const iniciarSesionBD = async (email) => {
  try {
    const response = await fetch(`${API_URL}/api/iniciar-sesion`, {
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
