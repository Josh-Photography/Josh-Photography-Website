import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { app as expressApp } from './server/app.js'

function joshUnifiedApiPlugin() {
  return {
    name: 'josh-unified-api',
    configureServer(server) {
      // Mount the Express backend API and file uploads directly onto port 3000
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        if (url.startsWith('/api') || url.startsWith('/uploads')) {
          expressApp(req, res, next)
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), joshUnifiedApiPlugin()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  }
})
