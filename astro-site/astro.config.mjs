import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
// import node from '@astrojs/node'; // Remova ou mantenha comentado

export default defineConfig({
  site: 'https://alarmecenter.com.br',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  output: 'static', // Para deploy estático
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,
      allowedHosts: 'all'
    }
  },
  build: {
    assets: 'assets'
  }
});