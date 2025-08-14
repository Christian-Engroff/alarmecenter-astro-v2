import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    allowedHosts: [
      'alarm-shop-astro.preview.emergentagent.com',
      '.preview.emergentagent.com',
      '.emergentagent.com',
      'localhost',
      '127.0.0.1',
      'all'
    ]
  }
})