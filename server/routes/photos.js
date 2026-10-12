import express from 'express'
import multer from 'multer'
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const photosPath = join(__dirname, '../data/photos.json')
const uploadsPath = join(__dirname, '../uploads')

// Ensure uploads directory exists
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true })
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

// Get all photos (public or admin with query filters)
router.get('/', (req, res) => {
  try {
    const data = readPhotos()
    let photos = [...data.photos]

    const { category, search, published, sort, page, limit } = req.query

    // Filter by category
    if (category && category !== 'all') {
      photos = photos.filter(
        (p) => p.category === category || p.categorySlug === category
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

    const filtered =
      category === 'all'
        ? data.photos.filter((p) => p.published !== false)
        : data.photos.filter(
            (p) =>
              (p.category === category || p.categorySlug === category) &&
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
  (req, res) => {
    try {
      const data = readPhotos()
      const { title, desc, alt, category, order, published, src } = req.body

      const uploadedFiles = []
      if (req.files && req.files.photo) uploadedFiles.push(...req.files.photo)
      if (req.files && req.files.photos) uploadedFiles.push(...req.files.photos)

      // Get max order
      let maxOrder = data.photos.reduce((max, p) => Math.max(max, p.order || 0), 0)

      const targetCategory = category || 'weddings'
      const categoryPhotos = data.photos.filter((p) => p.category === targetCategory)
      let nextNum = categoryPhotos.length + 1

      const createdPhotos = []

      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file, index) => {
          const fileUrl = `/uploads/${file.filename}`
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
        })
      } else if (src) {
        const photoTitle = title || 'New Photograph'
        const newPhoto = {
          id: uuidv4(),
          title: photoTitle,
          desc: desc || '',
          alt: alt || photoTitle,
          category: targetCategory,
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

// Update photo metadata or replace image (protected)
router.put('/:id', authenticateToken, upload.single('photo'), (req, res) => {
  try {
    const data = readPhotos()
    const { id } = req.params
    const index = data.photos.findIndex((p) => p.id === id)

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
    const photo = data.photos.find((p) => p.id === id)

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
    const index = data.photos.findIndex((p) => p.id === id)

    if (index === -1) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    const photo = data.photos[index]

    // Delete local file if in /uploads/
    if (photo.src && photo.src.startsWith('/uploads/')) {
      const filePath = join(__dirname, '..', photo.src)
      if (existsSync(filePath)) {
        try {
          unlinkSync(filePath)
        } catch (e) {}
      }
    }

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
