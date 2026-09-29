// Almacenamiento del dispositivo. Usa IndexedDB (lo indicado para una PWA
// offline) y, si el navegador no lo permite, recurre a localStorage.
const BASE = 'amatista';
const TIENDA = 'estado';
const ESPERA_MAXIMA = 4000;

let conexion;

function abrir() {
  conexion ??= new Promise((resolver, rechazar) => {
    const peticion = indexedDB.open(BASE, 1);
    peticion.onupgradeneeded = () => peticion.result.createObjectStore(TIENDA);
    peticion.onsuccess = () => resolver(peticion.result);
    peticion.onerror = () => rechazar(peticion.error);
    setTimeout(() => rechazar(new Error('IndexedDB no respondió')), ESPERA_MAXIMA);
  });
  return conexion;
}

async function operar(modo, accion) {
  const base = await abrir();
  return new Promise((resolver, rechazar) => {
    const transaccion = base.transaction(TIENDA, modo);
    const peticion = accion(transaccion.objectStore(TIENDA));
    transaccion.oncomplete = () => resolver(peticion.result);
    transaccion.onerror = () => rechazar(transaccion.error);
  });
}

export async function leer(clave) {
  try {
    return await operar('readonly', (tienda) => tienda.get(clave));
  } catch {
    try {
      return JSON.parse(localStorage.getItem(`${BASE}:${clave}`)) ?? undefined;
    } catch {
      return undefined;
    }
  }
}

export async function guardar(clave, valor) {
  try {
    await operar('readwrite', (tienda) => tienda.put(valor, clave));
  } catch {
    try {
      localStorage.setItem(`${BASE}:${clave}`, JSON.stringify(valor));
    } catch {
      // Sin almacenamiento disponible: el progreso vive solo en memoria.
    }
  }
}

// Pide al navegador que no borre estos datos cuando le falte espacio.
export function pedirAlmacenamientoPersistente() {
  navigator.storage?.persist?.().catch(() => {});
}
