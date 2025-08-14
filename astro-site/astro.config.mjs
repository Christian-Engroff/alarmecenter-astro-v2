import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,
      open: false,
      cors: true,
      allowedHosts: [
        'all',
        'alarm-shop-astro.preview.emergentagent.com',
        '*.preview.emergentagent.com',
        '*.emergentagent.com',
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
      ]
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,
      open: false,
      cors: true,
      allowedHosts: [
        'all',
        'alarm-shop-astro.preview.emergentagent.com',
        '*.preview.emergentagent.com',
        '*.emergentagent.com',
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
      ]
    }
  },
  output: 'static'
});