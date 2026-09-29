# Amatista · Frontend

PWA de Amatista hecha con React 19, Vite 8, Tailwind v4 y A-Frame.

```bash
npm install
npm run dev      # desarrollo (sin service worker)
npm run build    # producción: genera dist/ con manifest y service worker
npm run preview  # sirve dist/ para probar la PWA y el modo sin conexión
```

## Estructura

```text
src/
├── App.jsx              # rutas por hash: #/ (cursos) y #/laboratorio
├── data/cursos.js       # catálogo de cursos (luego vendrá del backend)
├── components/          # FondoLowPoly, BarraSuperior, TarjetaCurso, Iconos
├── hooks/               # useConexion, useInstalarPWA
├── pages/Inicio.jsx     # pantalla "Elige tu curso"
├── pages/Laboratorio.jsx# panel técnico + visor A-Frame (carga bajo demanda)
└── services/api.js      # llamadas al backend FastAPI
```

La identidad visual está documentada en
`docs/arquitectura/2026-09-28_identidad_visual_interfaz.txt`.
