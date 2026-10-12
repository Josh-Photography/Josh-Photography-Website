import express from 'express'
import multer from 'multer'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const contentPath = join(__dirname, '../data/content.json')
const uploadsPath = join(__dirname, '../uploads')

if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath)
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')
    const uniqueName = `content-${Date.now()}-${uuidv4().slice(0, 8)}${extname(cleanName)}`
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'))
    }
  },
})

function readContent() {
  if (!existsSync(contentPath)) {
    return {}
  }
  return JSON.parse(readFileSync(contentPath, 'utf8'))
}

function writeContent(data) {
  writeFileSync(contentPath, JSON.stringify(data, null, 2))
}

// Upload endpoint for any content image (protected)
router.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' })
    }
    const url = `/uploads/${req.file.filename}`
    logActivity(`Uploaded content asset: ${req.file.originalname}`)
    res.json({ url, filename: req.file.filename })
  } catch (error) {
    console.error('Content upload error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

// Get all content (public)
router.get('/', (req, res) => {
  try {
    const content = readContent()
    res.json(content)
  } catch (error) {
    console.error('Error reading content:', error)
    res.status(500).json({ error: 'Failed to load content' })
  }
})

// Get studio info (public)
router.get('/studio', (req, res) => {
  try {
    const content = readContent()
    res.json({
      ...content.studio,
      social: content.social,
      settings: content.settings,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to load studio info' })
  }
})

// Update studio info (protected)
router.put('/studio', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.studio = {
      ...content.studio,
      ...req.body,
    }
    writeContent(content)
    logActivity('Updated Studio Information & Facilities')
    res.json(content.studio)
  } catch (error) {
    console.error('Error updating studio:', error)
    res.status(500).json({ error: 'Failed to update studio info' })
  }
})

// Get/Update about (public / protected)
router.get('/about', (req, res) => {
  try {
    const content = readContent()
    res.json(content.about)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load about' })
  }
})

router.put('/about', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.about = {
      ...content.about,
      ...req.body,
    }
    writeContent(content)
    logActivity('Updated About Page Story, Photographer Profile & Stats')
    res.json(content.about)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update about' })
  }
})

// Get/Update hero slides
router.get('/hero', (req, res) => {
  try {
    const content = readContent()
    res.json(content.heroSlides || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to load hero slides' })
  }
})

router.put('/hero', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.heroSlides = req.body.slides || req.body.heroSlides || req.body
    writeContent(content)
    logActivity('Updated Hero Section Slideshow')
    res.json(content.heroSlides)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update hero slides' })
  }
})

// Get/Update services
router.get('/services', (req, res) => {
  try {
    const content = readContent()
    res.json(content.services || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to load services' })
  }
})

router.put('/services', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.services = req.body.services || req.body
    writeContent(content)
    logActivity('Updated Photography Services & Collections')
    res.json(content.services)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update services' })
  }
})

// Get/Update testimonials
router.get('/testimonials', (req, res) => {
  try {
    const content = readContent()
    res.json(content.testimonials || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to load testimonials' })
  }
})

router.put('/testimonials', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.testimonials = req.body.testimonials || req.body
    writeContent(content)
    logActivity('Updated Client Testimonials & Reviews')
    res.json(content.testimonials)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonials' })
  }
})

// Get/Update collaborators / team
router.get('/collaborators', (req, res) => {
  try {
    const content = readContent()
    res.json(content.collaborators || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to load collaborators' })
  }
})

router.put('/collaborators', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.collaborators = req.body.collaborators || req.body
    writeContent(content)
    logActivity('Updated Team Members & Biographies')
    res.json(content.collaborators)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update collaborators' })
  }
})

// Get/Update social links
router.get('/social', (req, res) => {
  try {
    const content = readContent()
    res.json(content.social || {})
  } catch (error) {
    res.status(500).json({ error: 'Failed to load social links' })
  }
})

router.put('/social', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.social = { ...content.social, ...req.body }
    writeContent(content)
    logActivity('Updated Social Media Platforms & Links')
    res.json(content.social)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update social links' })
  }
})

// Get/Update settings
router.get('/settings', (req, res) => {
  try {
    const content = readContent()
    res.json(content.settings || {})
  } catch (error) {
    res.status(500).json({ error: 'Failed to load settings' })
  }
})

router.put('/settings', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.settings = { ...content.settings, ...req.body }
    writeContent(content)
    logActivity('Updated General Website Settings & SEO')
    res.json(content.settings)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// Get/Update stats
router.get('/stats', (req, res) => {
  try {
    const content = readContent()
    res.json(content.about?.stats || content.stats || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to load stats' })
  }
})

router.put('/stats', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    if (!content.about) content.about = {}
    content.about.stats = req.body.stats || req.body
    writeContent(content)
    logActivity('Updated Experience Statistics')
    res.json(content.about.stats)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stats' })
  }
})

export default router
