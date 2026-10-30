import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.warn(`[Vite Proxy] Could not connect to backend server (http://localhost:3001): ${err.message}`)
            if (res && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                error: `Backend API server is currently unavailable (${err.code || err.message}). Please ensure 'npm run dev' or 'cd server && npm run dev' is running.`,
                code: err.code || 'PROXY_ERROR'
              }))
            }
          })
        }
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            if (res && !res.headersSent) {
              res.writeHead(404, { 'Content-Type': 'text/plain' })
              res.end('Upload asset unavailable while backend server is offline')
            }
          })
        }
      }
    }
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
