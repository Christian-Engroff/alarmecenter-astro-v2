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
    host: true,
    port: 3000
  },
  vite: {
    server: {
      host: true,
      allowedHosts: [
        'alarm-shop-astro.preview.emergentagent.com',
        '.preview.emergentagent.com',
        'localhost',
        '127.0.0.1'
      ]
    }
  },
  output: 'static'
});