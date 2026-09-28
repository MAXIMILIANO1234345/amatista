# Changelog

Todas las versiones de Amatista. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

### Cambiado
- Los documentos de `docs/` se nombran con su fecha de creación (`AAAA-MM-DD_tema.txt`).
- La bitácora del 27/09 se fechó en hora local (UTC-6).

### Agregado
- `CHANGELOG.md` y política de tags de versión.
- Investigación sobre cómo avanza el desarrollo (`docs/bitacora/2026-09-27_investigacion_desarrollo.txt`).

## [0.1.0] - 2026-09-27

Primera versión con integración completa **React → FastAPI → Oracle**.

### Agregado
- App Shell PWA con React 19, Vite y Tailwind v4 con la paleta Amatista.
- Visor 3D con A-Frame integrado.
- Conexión con el backend FastAPI y Oracle Autonomous DB (CORS resuelto).
- Flujo de sesiones: el usuario recibe un ID autoincremental y la sesión un UUID.
- Documentación de arquitectura, backend y base de datos, convención de commits e incidencias.
- Propuestas de producto: Amatista 3D Lab y motor generativo 3D.

### Corregido
- `Errno 98` (puerto 8000 ocupado) y bloqueo de CORS en el servidor.
- `ORA-01400` al insertar usuarios (llaves primarias con `Identity`).
- El indicador de estado mostraba "Conectado" aunque el backend fallara.

### Pendiente conocido
- El código del backend todavía no está en el repositorio.
- `manifest.json` y `sw.js` vacíos: la PWA aún no funciona sin conexión.
- No hay autenticación real (las sesiones se crean solo con un email).

[Sin publicar]: https://github.com/MAXIMILIANO1234345/amatista/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MAXIMILIANO1234345/amatista/releases/tag/v0.1.0
