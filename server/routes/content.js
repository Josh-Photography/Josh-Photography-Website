import express from 'express'
import multer from 'multer'
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'
import { processImageUpload, deleteMediaAsset } from '../utils/storage.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const contentPath = join(__dirname, '../data/content.json')
const uploadsPath = join(__dirname, '../uploads')
const publicUploadsPath = join(__dirname, '../../public/uploads')

if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true })
}
if (!existsSync(publicUploadsPath)) {
  mkdirSync(publicUploadsPath, { recursive: true })
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
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' })
    }
    const cat = req.body.category || req.headers['x-category']
    let folder = req.body.folder
    if (!folder) {
      folder = cat ? `josh_portfolio/${cat}` : 'josh_content'
    }
    const result = await processImageUpload(req.file, { folder, category: cat })
    logActivity(`Uploaded asset: ${req.file.originalname} into ${folder}`)
    res.json({ url: result.url, filename: result.filename, provider: result.provider, folder })
  } catch (error) {
    console.error('Content upload error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

// Delete media asset from Cloudinary CDN and local storage (protected)
router.post('/delete-media', authenticateToken, async (req, res) => {
  try {
    const { url, publicId } = req.body
    if (!url && !publicId) {
      return res.status(400).json({ error: 'url or publicId required' })
    }
    const result = await deleteMediaAsset(url, publicId)
    logActivity(`Deleted media asset from Cloudinary/storage: ${publicId || url}`)
    res.json({ success: true, result })
  } catch (error) {
    console.error('Delete media error:', error)
    res.status(500).json({ error: 'Failed to delete media asset' })
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
    if (req.body.name && content.settings) {
      content.settings.studioName = req.body.name
      content.settings.siteName = req.body.name
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
    if (req.body.bookingButtonText) {
      content.settings.ctaButtonText = req.body.bookingButtonText
    }
    if (req.body.bookingButtonLink) {
      content.settings.ctaButtonLink = req.body.bookingButtonLink
    }
    if (req.body.seoTitle) {
      content.settings.seoDefaultTitle = req.body.seoTitle
    }
    if (req.body.siteName) {
      content.settings.studioName = req.body.siteName
      if (content.studio) content.studio.name = req.body.siteName
    }
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

// Get/Update another studio (De Fab Studio)
router.get('/another-studio', (req, res) => {
  try {
    const content = readContent()
    res.json(content.anotherStudio || {})
  } catch (error) {
    res.status(500).json({ error: 'Failed to load another studio info' })
  }
})

router.put('/another-studio', authenticateToken, (req, res) => {
  try {
    const content = readContent()
    content.anotherStudio = {
      ...content.anotherStudio,
      ...req.body,
    }
    writeContent(content)
    logActivity('Updated De Fab Studio Section & Content')
    res.json(content.anotherStudio)
  } catch (error) {
    console.error('Error updating another studio:', error)
    res.status(500).json({ error: 'Failed to update another studio info' })
  }
})

export default router
