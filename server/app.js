import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'
import { connectDB } from './utils/db.js'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'
import photoRoutes from './routes/photos.js'
import contactRoutes from './routes/contact.js'
import commentRoutes from './routes/comments.js'
import overviewRoutes from './routes/overview.js'
import chatRoutes from './routes/chat.js'
import offerRoutes from './routes/offers.js'

const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())

// Automatically load .env file into process.env if present
try {
  const rootEnvPath = join(appDirPath, '../.env')
  if (existsSync(rootEnvPath)) {
    const lines = readFileSync(rootEnvPath, 'utf8').split(/\r?\n/)
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim()
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"](.*)['"]$/, '$1')
        if (key && !process.env[key]) {
          process.env[key] = val
        }
      }
    }
  }
} catch (_) {}

// Connect to MongoDB Atlas (non-blocking)
connectDB().catch((err) => {
  console.warn('[Database] Initial connection:', err.message)
})

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Re-ensure MongoDB on every request to handle Netlify cold-starts
app.use(async (req, res, next) => {
  try { await connectDB() } catch (_) {}
  next()
})
app.use('/uploads', express.static(join(appDirPath, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/overview', overviewRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/offers', offerRoutes)

// Also mount direct routes without /api prefix for Netlify serverless function compatibility
app.use('/auth', authRoutes)
app.use('/content', contentRoutes)
app.use('/photos', photoRoutes)
app.use('/contact', contactRoutes)
app.use('/comments', commentRoutes)
app.use('/overview', overviewRoutes)
app.use('/chat', chatRoutes)
app.use('/offers', offerRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Josh Photography Unified CMS API is running on port 3000',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  })
})

// 404 handler for API routes ONLY
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` })
})

// Global error-handling middleware (guarantees JSON error response)
app.use((err, req, res, next) => {
  console.error('API Error:', err.message || err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    path: req.originalUrl,
  })
})

export { app }
export default app
