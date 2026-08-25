import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/playplan-perth/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'og.png', 'pwa-192.png', 'pwa-512.png'],
      manifest: {
        name: 'PlayPlan Perth',
        short_name: 'PlayPlan',
        description: 'Pick a Perth playground everyone loves.',
        theme_color: '#215d50',
        background_color: '#f6f0e4',
        display: 'standalone',
        start_url: '/playplan-perth/',
        scope: '/playplan-perth/',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'playplan-weather',
              networkTimeoutSeconds: 2,
              expiration: { maxEntries: 4, maxAgeSeconds: 1800 },
            },
          },
        ],
      },
    }),
  ],
  server: { host: '127.0.0.1', port: 3000 },
});
