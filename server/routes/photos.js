import express from 'express'
import multer from 'multer'
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync, copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'
import { processImageUpload, removeLocalUpload } from '../utils/storage.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const photosPath = join(__dirname, '../data/photos.json')
const uploadsPath = join(__dirname, '../uploads')
const publicUploadsPath = join(__dirname, '../../public/uploads')

// Ensure uploads directory exists
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true })
}
if (!existsSync(publicUploadsPath)) {
  mkdirSync(publicUploadsPath, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath)
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')
    const uniqueName = `${Date.now()}-${uuidv4().slice(0, 8)}${extname(cleanName)}`
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF allowed.'))
    }
  },
})

function readPhotos() {
  if (!existsSync(photosPath)) {
    return { categories: [], photos: [] }
  }
  return JSON.parse(readFileSync(photosPath, 'utf8'))
}

function writePhotos(data) {
  writeFileSync(photosPath, JSON.stringify(data, null, 2))
}

function normalizeCategory(cat) {
  const s = String(cat || '').toLowerCase().trim()
  if (s === 'car-shoot' || s === 'car-photography' || s === 'cars' || s === 'cars-shoot' || s === 'car') return 'car-photography'
  if (s === 'model-shoot' || s === 'model-photography' || s === 'models' || s === 'fashion' || s === 'model') return 'model-photography'
  if (s === 'product-shoot' || s === 'product-photography' || s === 'products' || s === 'product') return 'product-photography'
  if (s === 'reels-shoot' || s === 'reels-shoots' || s === 'reels' || s === 'creative-video' || s === 'reel') return 'reels-shoots'
  if (s === 'sports-shoot' || s === 'sports-photography' || s === 'sports' || s === 'sport') return 'sports-photography'
  if (s === 'birthdays' || s === 'birthday-photography' || s === 'birthday' || s === 'birthdays-shoot') return 'birthdays'
  if (s === 'engagement' || s === 'pre-wedding' || s === 'engagement-shoot') return 'engagement'
  if (s === 'anniversary' || s === 'anniversary-shoot') return 'anniversary'
  if (s === 'baby-family' || s === 'baby-and-family' || s === 'baby-newborn-maternity') return 'baby-family'
  if (s === 'festivals' || s === 'cultural-celebrations' || s === 'christmas') return 'festivals'
  if (s === 'mothers-day' || s === "mother's-day" || s === 'mothersday') return 'mothers-day'
  if (s === 'fathers-day' || s === "father's-day" || s === 'fathersday') return 'fathers-day'
  if (s === 'corporate-events' || s === 'portraits' || s === 'portrait' || s === 'corporate') return 'corporate-events'
  if (s === 'family' || s === 'family-shoot') return 'family'
  if (s === 'maternity' || s === 'maternity-shoot') return 'maternity'
  if (s === 'graduations' || s === 'graduation' || s === 'graduation-photography') return 'graduations'
  if (s === 'weddings' || s === 'wedding' || s === 'wedding-photography') return 'weddings'
  return s
}

// Get all photos (public or admin with query filters)
router.get('/', (req, res) => {
  try {
    const data = readPhotos()
    let photos = [...data.photos]

    const { category, search, published, sort, page, limit } = req.query

    // Filter by category
    if (category && category !== 'all') {
      const targetCat = normalizeCategory(category)
      photos = photos.filter(
        (p) =>
          normalizeCategory(p.category) === targetCat ||
          normalizeCategory(p.categorySlug) === targetCat
      )
    }

    // Filter by published status
    if (published === 'true') {
      photos = photos.filter((p) => p.published !== false)
    } else if (published === 'false') {
      photos = photos.filter((p) => p.published === false)
    }

    // Search by title, description, or alt
    if (search) {
      const q = search.toLowerCase()
      photos = photos.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.desc && p.desc.toLowerCase().includes(q)) ||
          (p.alt && p.alt.toLowerCase().includes(q))
      )
    }

    // Sort
    if (sort === 'newest') {
      photos.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    } else if (sort === 'title') {
      photos.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    } else {
      // Default: sort by order ascending
      photos.sort((a, b) => (a.order || 0) - (b.order || 0))
    }

    // Pagination if requested
    const total = photos.length
    if (page && limit) {
      const pageNum = parseInt(page, 10) || 1
      const limitNum = parseInt(limit, 10) || 12
      const startIndex = (pageNum - 1) * limitNum
      photos = photos.slice(startIndex, startIndex + limitNum)
      return res.json({
        categories: data.categories,
        photos,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
      })
    }

    res.json({
      categories: data.categories,
      photos,
      total,
    })
  } catch (error) {
    console.error('Error loading photos:', error)
    res.status(500).json({ error: 'Failed to load photos' })
  }
})

// Get photos by category (public)
router.get('/category/:category', (req, res) => {
  try {
    const data = readPhotos()
    const { category } = req.params

    const targetCat = normalizeCategory(category)
    const filtered =
      category === 'all'
        ? data.photos.filter((p) => p.published !== false)
        : data.photos.filter(
            (p) =>
              (normalizeCategory(p.category) === targetCat ||
                normalizeCategory(p.categorySlug) === targetCat) &&
              p.published !== false
          )

    res.json(filtered.sort((a, b) => (a.order || 0) - (b.order || 0)))
  } catch (error) {
    res.status(500).json({ error: 'Failed to load photos' })
  }
})

// Get categories (public)
router.get('/categories', (req, res) => {
  try {
    const data = readPhotos()
    res.json(data.categories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load categories' })
  }
})

// Add photo (single or multiple) (protected)
router.post(
  '/',
  authenticateToken,
  upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photos', maxCount: 20 }]),
  async (req, res) => {
    try {
      const data = readPhotos()
      const { title, desc, alt, category, order, published, src } = req.body

      const uploadedFiles = []
      if (req.files && req.files.photo) uploadedFiles.push(...req.files.photo)
      if (req.files && req.files.photos) uploadedFiles.push(...req.files.photos)

      // Get max order
      let maxOrder = data.photos.reduce((max, p) => Math.max(max, p.order || 0), 0)

      const targetCategory = normalizeCategory(category || 'weddings')
      const categoryPhotos = data.photos.filter((p) => normalizeCategory(p.category) === targetCategory)
      let nextNum = categoryPhotos.length + 1

      const createdPhotos = []

      if (uploadedFiles.length > 0) {
        for (let index = 0; index < uploadedFiles.length; index++) {
          const file = uploadedFiles[index]
          const uploadResult = await processImageUpload(file, { folder: `josh_portfolio/${targetCategory}` })
          const fileUrl = uploadResult.url
          const photoTitle =
            uploadedFiles.length === 1 && title
              ? title
              : `${file.originalname.replace(/\.[^/.]+$/, '')} ${index + 1}`

          const newPhoto = {
            id: uuidv4(),
            title: photoTitle,
            desc: desc || '',
            alt: alt || photoTitle,
            category: targetCategory,
            categorySlug: targetCategory,
            image: fileUrl,
            src: fileUrl,
            srcLarge: fileUrl,
            num: String(nextNum++).padStart(2, '0'),
            order: order ? parseInt(order, 10) + index : ++maxOrder,
            published: published !== 'false' && published !== false,
            createdAt: new Date().toISOString(),
          }
          data.photos.push(newPhoto)
          createdPhotos.push(newPhoto)
        }
      } else if (src) {
        const photoTitle = title || 'New Photograph'
        const newPhoto = {
          id: uuidv4(),
          title: photoTitle,
          desc: desc || '',
          alt: alt || photoTitle,
          category: targetCategory,
          categorySlug: targetCategory,
          image: src,
          src: src,
          srcLarge: src,
          num: String(nextNum).padStart(2, '0'),
          order: order ? parseInt(order, 10) : ++maxOrder,
          published: published !== 'false' && published !== false,
          createdAt: new Date().toISOString(),
        }
        data.photos.push(newPhoto)
        createdPhotos.push(newPhoto)
      } else {
        return res.status(400).json({ error: 'Please provide an image file or URL' })
      }

      writePhotos(data)
      logActivity(
        `Uploaded ${createdPhotos.length} photograph(s) to ${targetCategory}`
      )

      res.status(201).json(
        createdPhotos.length === 1 ? createdPhotos[0] : createdPhotos
      )
    } catch (error) {
      console.error('Error adding photo:', error)
      res.status(500).json({ error: 'Failed to add photo' })
    }
  }
)

// Synchronize all portfolio photos in batch (protected)
router.put('/', authenticateToken, (req, res) => {
  try {
    const data = readPhotos()
    const incomingPhotos = Array.isArray(req.body)
      ? req.body
      : (Array.isArray(req.body?.photos) ? req.body.photos : null)

    if (!incomingPhotos) {
      return res.status(400).json({ error: 'Please provide an array of photos' })
    }

    // Normalize and sanitize incoming photos
    const normalizedPhotos = incomingPhotos.map((p, idx) => {
      const cat = p.category || 'weddings'
      const normCat = normalizeCategory(cat)
      const imgSrc = p.image || p.src || p.srcLarge || ''
      return {
        id: p.id || `photo-${Date.now()}-${idx}`,
        title: p.title || `Photograph ${idx + 1}`,
        desc: p.desc || '',
        alt: p.alt || p.title || 'Josh Photography showcase',
        category: normCat,
        categorySlug: p.categorySlug ? normalizeCategory(p.categorySlug) : normCat,
        image: imgSrc,
        src: imgSrc,
        srcLarge: p.srcLarge || imgSrc,
        num: p.num || String(idx + 1).padStart(2, '0'),
        order: p.order !== undefined ? parseInt(p.order, 10) : idx + 1,
        published: p.published !== false,
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    })

    data.photos = normalizedPhotos
    writePhotos(data)
    logActivity(`Synchronized ${normalizedPhotos.length} portfolio photograph(s) across categories`)

    res.json({
      success: true,
      message: 'Portfolio photos synchronized successfully',
      categories: data.categories,
      photos: data.photos,
      total: data.photos.length,
    })
  } catch (error) {
    console.error('Error synchronizing photos batch:', error)
    res.status(500).json({ error: 'Failed to synchronize photos' })
  }
})

// Update photo metadata or replace image (protected)
router.put('/:id', authenticateToken, upload.single('photo'), (req, res) => {
  try {
    const data = readPhotos()
    const { id } = req.params
    const index = data.photos.findIndex((p) => String(p.id) === String(id))

    if (index === -1) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    const existing = data.photos[index]
    const updates = { ...req.body }

    // If new image was uploaded to replace the existing one
    if (req.file) {
      // Remove old file if stored locally in uploads
      if (existing.src && existing.src.startsWith('/uploads/')) {
        const oldPath = join(__dirname, '..', existing.src)
        if (existsSync(oldPath)) {
          try {
            unlinkSync(oldPath)
          } catch (e) {}
        }
      }
      try {
        copyFileSync(req.file.path, join(publicUploadsPath, req.file.filename))
      } catch (e) {}
      const newUrl = `/uploads/${req.file.filename}`
      updates.src = newUrl
      updates.srcLarge = newUrl
      updates.image = newUrl
    }

    if (updates.order !== undefined) {
      updates.order = parseInt(updates.order, 10) || existing.order
    }
    if (updates.published !== undefined) {
      updates.published = updates.published === 'true' || updates.published === true
    }
    if (updates.category) {
      updates.category = normalizeCategory(updates.category)
      updates.categorySlug = normalizeCategory(updates.category)
    }

    data.photos[index] = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    writePhotos(data)
    logActivity(`Updated photo "${data.photos[index].title}" in ${data.photos[index].category}`)

    res.json(data.photos[index])
  } catch (error) {
    console.error('Error updating photo:', error)
    res.status(500).json({ error: 'Failed to update photo' })
  }
})

// Toggle publish status (protected)
router.patch('/:id/toggle-publish', authenticateToken, (req, res) => {
  try {
    const data = readPhotos()
    const { id } = req.params
    const photo = data.photos.find((p) => String(p.id) === String(id))

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    photo.published = !photo.published
    writePhotos(data)
    logActivity(
      `${photo.published ? 'Published' : 'Unpublished'} photo "${photo.title}"`
    )

    res.json(photo)
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle photo publish status' })
  }
})

// Delete photo (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const data = readPhotos()
    const { id } = req.params
    const index = data.photos.findIndex((p) => String(p.id) === String(id))

    if (index === -1) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    const photo = data.photos[index]

    // Delete local file if in /uploads/
    removeLocalUpload(photo.src || photo.image)

    data.photos.splice(index, 1)
    writePhotos(data)
    logActivity(`Deleted photo "${photo.title}" from ${photo.category}`)

    res.json({ message: 'Photo deleted successfully', id })
  } catch (error) {
    console.error('Error deleting photo:', error)
    res.status(500).json({ error: 'Failed to delete photo' })
  }
})

// Reorder photos batch (protected)
router.put('/reorder/batch', authenticateToken, (req, res) => {
  try {
    const data = readPhotos()
    const { order } = req.body // Array of { id, order }

    if (Array.isArray(order)) {
      order.forEach((item) => {
        const photo = data.photos.find((p) => p.id === item.id)
        if (photo) {
          photo.order = item.order
        }
      })
      writePhotos(data)
      logActivity('Reordered portfolio photographs')
    }

    res.json({ message: 'Photos reordered successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder photos' })
  }
})

export default router
