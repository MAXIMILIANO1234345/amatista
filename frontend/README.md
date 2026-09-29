# Amatista · Frontend

PWA de Amatista hecha con React 19, Vite 8, Tailwind v4 y A-Frame.

```bash
npm install
npm run dev            # desarrollo (sin service worker)
npm run build          # producción: genera dist/ con manifest y service worker
npm run preview        # sirve dist/ para probar la PWA y el modo sin conexión
npm run ilustraciones  # regenera los SVG de public/ilustraciones/
```

El backend se configura con `VITE_API_URL` (ver `.env.example`).

## Estructura

```text
src/
├── App.jsx                 # rutas por hash (ver rutas.js)
├── rutas.js                # #/  #/curso/:id  #/curso/:id/leccion/:id  #/laboratorio
├── data/
│   ├── cursos.js           # catálogo de cursos y módulos
│   └── modulos/*.json      # contenido de cada módulo (lecciones y examen)
├── progreso/               # progreso local: proveedor, reglas y XP
├── lib/                    # IndexedDB y generador de identificadores
├── services/api.js         # llamadas al backend (salud, sesiones, progreso)
├── components/
│   ├── leccion/            # bloques de contenido, examen y vista 3D (A-Frame)
│   └── ...                 # barra superior, fondo low poly, tarjetas, íconos
└── pages/                  # Inicio, Curso, Leccion, Laboratorio
```

## Contenido

Para agregar un módulo o una lección no hace falta tocar componentes: el
formato de los JSON y los bloques disponibles están en
`docs/arquitectura/2026-09-29_formato-lecciones.txt`.

## Progreso

Se guarda en el dispositivo (IndexedDB), así funciona sin conexión y aunque
el backend esté caído. Cuando el backend responde, los cambios pendientes se
envían a `POST /api/progreso`.

La identidad visual está documentada en
`docs/arquitectura/2026-09-28_identidad_visual_interfaz.txt`.
