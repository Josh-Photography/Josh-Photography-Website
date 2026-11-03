import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

function joshUnifiedApiPlugin() {
  return {
    name: 'josh-unified-api',
    async configureServer(server) {
      try {
        const { app: expressApp } = await import('./server/app.js')
        // Mount the Express backend API and file uploads directly onto port 3000
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          if (url.startsWith('/api') || url.startsWith('/uploads')) {
            expressApp(req, res, next)
          } else {
            next()
          }
        })
      } catch (err) {
        console.warn('[Vite Plugin] Dev API server middleware skipped:', err.message)
      }
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
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'vendor-ui'
            }
          }
        }
      }
    }
  }
})
