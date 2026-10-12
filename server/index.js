import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'
import photoRoutes from './routes/photos.js'
import contactRoutes from './routes/contact.js'
import commentRoutes from './routes/comments.js'
import overviewRoutes from './routes/overview.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/uploads', express.static(join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/overview', overviewRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Josh Photography CMS API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Josh Photography Server running on http://localhost:${PORT}`)
})
