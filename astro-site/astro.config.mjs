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
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,
      allowedHosts: 'all',
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    define: {
      global: 'globalThis'
    }
  },
  output: 'static'
});