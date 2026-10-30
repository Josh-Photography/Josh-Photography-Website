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
const offersPath = join(__dirname, '../data/offers.json')
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
    const uniqueName = `offer-${Date.now()}-${uuidv4().slice(0, 8)}${extname(cleanName)}`
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
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed for promotional banners'))
    }
  },
})

function readOffersData() {
  if (!existsSync(offersPath)) {
    return {
      sectionSettings: {
        enabled: true,
        eyebrow: 'SPECIAL OFFERS & SEASONAL PROMOTIONS',
        title: 'Limited-Time Photography Promotions',
        subtitle: 'Discover our bespoke seasonal collections, featuring generous inclusions, complimentary keepsake upgrades, and preferential calendar priority.',
      },
      offers: [],
    }
  }
  try {
    const raw = readFileSync(offersPath, 'utf8')
    if (!raw.trim()) {
      return { sectionSettings: { enabled: true }, offers: [] }
    }
    const parsed = JSON.parse(raw)
    return {
      sectionSettings: parsed.sectionSettings || { enabled: true },
      offers: Array.isArray(parsed.offers) ? parsed.offers : [],
    }
  } catch (err) {
    console.error('Error parsing offers.json:', err)
    return { sectionSettings: { enabled: true }, offers: [] }
  }
}

function writeOffersData(data) {
  const serialized = JSON.stringify(data, null, 2)
  try {
    writeFileSync(offersPath, serialized, 'utf8')
  } catch (err) {
    if (err.code === 'EBUSY' || err.code === 'EPERM') {
      try {
        const tempPath = `${offersPath}.${Date.now()}.tmp`
        writeFileSync(tempPath, serialized, 'utf8')
        writeFileSync(offersPath, serialized, 'utf8')
      } catch (inner) {
        console.error('Fatal offers write error:', inner)
        throw inner
      }
    } else {
      throw err
    }
  }
}

function computeOfferStatus(offer) {
  if (offer.published === false) return 'hidden'
  if (!offer.bannerImage || !offer.bannerImage.trim()) return 'needs_image'
  const now = new Date()

  if (offer.startDate) {
    const start = new Date(offer.startDate)
    if (!isNaN(start) && now < start) return 'upcoming'
  }

  if (offer.endDate) {
    const end = new Date(offer.endDate.includes('T') ? offer.endDate : `${offer.endDate}T23:59:59`)
    if (!isNaN(end) && now > end) return 'expired'
  }

  return 'active'
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Public API: Get Active Published Offers for Special Offers Page
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    const data = readOffersData()
    const settings = data.sectionSettings || { enabled: true }

    // If whole section/page is disabled by admin, return empty list
    if (settings.enabled === false) {
      return res.json({
        enabled: false,
        eyebrow: settings.eyebrow || 'SPECIAL OFFERS & SEASONAL PROMOTIONS',
        title: settings.title || 'Limited-Time Photography Promotions',
        subtitle: settings.subtitle || '',
        offers: [],
      })
    }

    // Filter ONLY active, published (published !== false) offers within valid date range
    const allOffers = Array.isArray(data.offers) ? data.offers : []
    const validOffers = allOffers
      .filter((offer) => computeOfferStatus(offer) === 'active')
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))

    res.json({
      enabled: true,
      eyebrow: settings.eyebrow || 'SPECIAL OFFERS & SEASONAL PROMOTIONS',
      title: settings.title || 'Limited-Time Photography Promotions',
      subtitle: settings.subtitle || '',
      offers: validOffers,
    })
  } catch (error) {
    console.error('Error fetching public offers:', error)
    res.status(500).json({ error: 'Failed to load promotional offers' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. Admin API: Get All Offers (including drafts, expired, upcoming, hidden)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/admin', authenticateToken, (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    const data = readOffersData()
    const allOffers = Array.isArray(data.offers) ? data.offers : []

    const decoratedOffers = allOffers.map((offer) => ({
      ...offer,
      computedStatus: computeOfferStatus(offer),
    }))

    res.json({
      sectionSettings: data.sectionSettings || { enabled: true },
      offers: decoratedOffers,
    })
  } catch (error) {
    console.error('Error fetching admin offers:', error)
    res.status(500).json({ error: 'Failed to load admin offers' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. Admin API: Update Section Settings (Global Toggle & Header)
// ─────────────────────────────────────────────────────────────────────────────
router.put('/settings', authenticateToken, (req, res) => {
  try {
    const data = readOffersData()
    data.sectionSettings = {
      ...data.sectionSettings,
      ...req.body,
    }
    writeOffersData(data)
    logActivity(`Updated Special Offers settings (${data.sectionSettings.enabled ? 'Enabled' : 'Hidden'})`)
    res.json(data.sectionSettings)
  } catch (error) {
    console.error('Error updating offers settings:', error)
    res.status(500).json({ error: 'Failed to update offers settings' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. Admin API: Upload Promotional Banner
// ─────────────────────────────────────────────────────────────────────────────
router.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No promotional image file uploaded' })
    }
    const url = `/uploads/${req.file.filename}`
    logActivity(`Uploaded promotional banner: ${req.file.originalname}`)
    res.json({ url, filename: req.file.filename })
  } catch (error) {
    console.error('Banner upload error:', error)
    res.status(500).json({ error: 'Failed to upload promotional banner' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 5. Admin API: Create New Campaign
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', authenticateToken, (req, res) => {
  try {
    const data = readOffersData()
    const {
      title,
      tagline,
      festival,
      description,
      discountPercent,
      bannerImage,
      categories,
      categoryDiscounts,
      startDate,
      endDate,
      terms,
      order,
      published,
    } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Campaign title is required' })
    }

    const discountNum = Number(discountPercent)
    if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
      return res.status(400).json({ error: 'Discount percentage must be a number between 0% and 100%' })
    }

    const newOffer = {
      id: req.body.id || `offer-${Date.now()}-${uuidv4().slice(0, 6)}`,
      title: title.trim(),
      tagline: tagline ? tagline.trim() : '',
      festival: festival ? festival.trim() : '',
      description: description ? description.trim() : '',
      discountPercent: discountNum,
      bannerImage: bannerImage ? String(bannerImage).trim() : '',
      category: req.body.category || (Array.isArray(categories) && categories[0]) || '',
      categories: Array.isArray(categories) ? categories : (req.body.category ? [req.body.category] : []),
      categoryDiscounts: (categoryDiscounts && typeof categoryDiscounts === 'object') ? categoryDiscounts : {},
      startDate: startDate || '',
      endDate: endDate || '',
      terms: terms ? terms.trim() : '',
      order: Number(order) || (data.offers.length + 1),
      published: published !== false,
      badgeText: req.body.badgeText ? String(req.body.badgeText).trim() : 'OFF',
      badgeStyle: req.body.badgeStyle === 'ribbon' ? 'ribbon' : 'starburst',
      showBadge: req.body.showBadge !== false,
      promoLabel: req.body.promoLabel ? String(req.body.promoLabel).trim() : (festival ? festival.trim() : ''),
      showSpecialOfferSticker: Boolean(req.body.showSpecialOfferSticker),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    newOffer.computedStatus = computeOfferStatus(newOffer)

    data.offers = data.offers || []
    data.offers.push(newOffer)
    writeOffersData(data)

    logActivity(`Created seasonal offer: "${newOffer.title}" (${discountNum}% off)`)
    res.status(201).json(newOffer)
  } catch (error) {
    console.error('Error creating offer:', error)
    res.status(500).json({ error: 'Failed to create promotional offer' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 6. Admin API: Update Existing Campaign
// ─────────────────────────────────────────────────────────────────────────────
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const data = readOffersData()
    const { id } = req.params
    const index = (data.offers || []).findIndex((o) => String(o.id) === String(id))

    if (index === -1) {
      return res.status(404).json({ error: `Offer not found with ID: ${id}` })
    }

    const existing = data.offers[index]

    let discountNum = existing.discountPercent
    if (req.body.discountPercent !== undefined && req.body.discountPercent !== null && req.body.discountPercent !== '') {
      discountNum = Number(req.body.discountPercent)
      if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
        return res.status(400).json({ error: 'Discount percentage must be a number between 0% and 100%' })
      }
    }

    const updated = {
      ...existing,
      ...req.body,
      id: existing.id,
      title: req.body.title !== undefined ? String(req.body.title).trim() : existing.title,
      tagline: req.body.tagline !== undefined ? String(req.body.tagline).trim() : existing.tagline,
      festival: req.body.festival !== undefined ? String(req.body.festival).trim() : existing.festival,
      description: req.body.description !== undefined ? String(req.body.description).trim() : existing.description,
      discountPercent: discountNum,
      order: req.body.order !== undefined ? (Number(req.body.order) || existing.order) : existing.order,
      published: req.body.published !== undefined ? Boolean(req.body.published) : (existing.published !== false),
      bannerImage: req.body.bannerImage !== undefined ? String(req.body.bannerImage).trim() : (existing.bannerImage || ''),
      category: req.body.category !== undefined ? req.body.category : existing.category,
      categories: Array.isArray(req.body.categories) ? req.body.categories : (existing.categories || (existing.category ? [existing.category] : [])),
      categoryDiscounts: (req.body.categoryDiscounts && typeof req.body.categoryDiscounts === 'object') ? req.body.categoryDiscounts : (existing.categoryDiscounts || {}),
      startDate: req.body.startDate !== undefined ? req.body.startDate : existing.startDate,
      endDate: req.body.endDate !== undefined ? req.body.endDate : existing.endDate,
      terms: req.body.terms !== undefined ? String(req.body.terms).trim() : existing.terms,
      badgeText: req.body.badgeText !== undefined ? String(req.body.badgeText).trim() : (existing.badgeText || 'OFF'),
      badgeStyle: req.body.badgeStyle !== undefined ? (req.body.badgeStyle === 'ribbon' ? 'ribbon' : 'starburst') : (existing.badgeStyle || 'starburst'),
      showBadge: req.body.showBadge !== undefined ? Boolean(req.body.showBadge) : (existing.showBadge !== false),
      promoLabel: req.body.promoLabel !== undefined ? String(req.body.promoLabel).trim() : (existing.promoLabel || ''),
      showSpecialOfferSticker: req.body.showSpecialOfferSticker !== undefined ? Boolean(req.body.showSpecialOfferSticker) : Boolean(existing.showSpecialOfferSticker),
      updatedAt: new Date().toISOString(),
    }

    updated.computedStatus = computeOfferStatus(updated)

    data.offers[index] = updated
    writeOffersData(data)

    logActivity(`Updated promotional offer: "${updated.title}"`)
    res.json(updated)
  } catch (error) {
    console.error('Error updating offer:', error)
    res.status(500).json({ error: 'Failed to update promotional offer: ' + error.message })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 7. Admin API: Delete Campaign
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const data = readOffersData()
    const { id } = req.params
    const beforeCount = (data.offers || []).length
    const deletedItem = (data.offers || []).find((o) => String(o.id) === String(id))

    data.offers = (data.offers || []).filter((o) => String(o.id) !== String(id))

    if (data.offers.length === beforeCount) {
      return res.status(404).json({ error: 'Offer not found' })
    }

    writeOffersData(data)
    logActivity(`Deleted promotional offer: "${deletedItem?.title || id}"`)
    res.json({ message: 'Offer deleted successfully', id })
  } catch (error) {
    console.error('Error deleting offer:', error)
    res.status(500).json({ error: 'Failed to delete promotional offer' })
  }
})

export default router
