import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  build: {
    // El chunk del laboratorio incluye A-Frame (~1.3 MB) y se carga bajo demanda.
    chunkSizeWarningLimit: 1400,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      // Los íconos ya entran por globPatterns; evita duplicarlos en el precache.
      includeManifestIcons: false,
      manifest: {
        name: 'Amatista · Aprende 3D para la web',
        short_name: 'Amatista',
        description: 'Plataforma offline-first para aprender creación 3D: Blender, A-Frame y WebXR.',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'any',
        background_color: '#121212',
        theme_color: '#121212',
        categories: ['education'],
        icons: [
          { src: '/icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: '/icons/amatista.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        // Precache: la pantalla de cursos completa (HTML, JS, CSS, fuentes, íconos).
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // A-Frame vive en el chunk del laboratorio: se guarda al usarlo por primera vez.
        globIgnores: [
          '**/Laboratorio-*.js',
          // Alfabetos que no usamos: el navegador no los descarga y no deben precachearse.
          '**/*-{cyrillic,cyrillic-ext,greek,vietnamese}-*.woff2',
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/Laboratorio-'),
            handler: 'CacheFirst',
            options: { cacheName: 'amatista-laboratorio', expiration: { maxEntries: 4 } },
          },
        ],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
