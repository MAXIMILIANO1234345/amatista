// src/services/api.js

// Vite carga la IP desde el archivo .env automáticamente
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