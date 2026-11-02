import express from 'express'
import multer from 'multer'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'
import { processImageUpload } from '../utils/storage.js'
import Offer from '../models/Offer.js'
import { readJsonData, writeJsonData } from '../utils/jsonData.js'
import { isMongoConnected, getCached, setCached, clearCache } from '../utils/db.js'

const router = express.Router()
const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())
function getOffersPath() {
  const candidates = [
    join(appDirPath, '../data/offers.json'),
    join(process.cwd(), 'server/data/offers.json'),
    join(process.cwd(), 'data/offers.json'),
  ]
  return candidates.find((p) => existsSync(p)) || candidates[0]
}

const upload = multer({
  storage: multer.memoryStorage(),
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

async function readOffersData() {
  const data = await readJsonData('offers', getOffersPath(), {
    sectionSettings: {
      enabled: true,
      eyebrow: 'SPECIAL OFFERS & SEASONAL PROMOTIONS',
      title: 'Limited-Time Photography Promotions',
      subtitle: 'Discover our bespoke seasonal collections, featuring generous inclusions, complimentary keepsake upgrades, and preferential calendar priority.',
    },
    offers: [],
  })

  if (isMongoConnected()) {
    const storedOffers = await Offer.find({}).sort({ order: 1 }).lean()
    if (storedOffers.length) data.offers = storedOffers
  }

  return {
    sectionSettings: data.sectionSettings || { enabled: true },
    offers: Array.isArray(data.offers) ? data.offers : [],
  }
}

async function writeOffersData(data) {
  await writeJsonData('offers', getOffersPath(), data)
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
router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')

    const cached = getCached('public_offers')
    if (cached) return res.json(cached)

    let allOffers = []
    let settings = { enabled: true }

    if (isMongoConnected()) {
      try {
        allOffers = await Offer.find({ published: true }).sort({ order: 1 }).lean()
      } catch (e) {
        console.warn('[Database] Offers Mongo fetch error:', e.message)
      }
    }

    if (!allOffers.length) {
      const data = await readOffersData()
      settings = data.sectionSettings || { enabled: true }
      allOffers = Array.isArray(data.offers) ? data.offers : []
    } else {
      const data = await readOffersData()
      settings = data.sectionSettings || { enabled: true }
    }

    // If whole section/page is disabled by admin, return empty list
    if (settings.enabled === false) {
      const emptyRes = {
        enabled: false,
        eyebrow: settings.eyebrow || 'SPECIAL OFFERS & SEASONAL PROMOTIONS',
        title: settings.title || 'Limited-Time Photography Promotions',
        subtitle: settings.subtitle || '',
        offers: [],
      }
      setCached('public_offers', emptyRes)
      return res.json(emptyRes)
    }

    const validOffers = allOffers
      .filter((offer) => computeOfferStatus(offer) === 'active')
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))

    const result = {
      enabled: true,
      eyebrow: settings.eyebrow || 'SPECIAL OFFERS & SEASONAL PROMOTIONS',
      title: settings.title || 'Limited-Time Photography Promotions',
      subtitle: settings.subtitle || '',
      offers: validOffers,
    }
    setCached('public_offers', result)
    res.json(result)
  } catch (error) {
    console.error('Error fetching public offers:', error)
    res.status(500).json({ error: 'Failed to load promotional offers' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. Admin API: Get All Offers (including drafts, expired, upcoming, hidden)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')

    let allOffers = []
    const data = await readOffersData()

    if (isMongoConnected()) {
      try {
        allOffers = await Offer.find({}).sort({ order: 1 }).lean()
      } catch (e) {
        console.warn('[Database] Admin offers Mongo fetch error:', e.message)
      }
    }

    if (!allOffers.length) {
      allOffers = Array.isArray(data.offers) ? data.offers : []
    }

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
router.put('/settings', authenticateToken, async (req, res) => {
  try {
    const data = await readOffersData()
    data.sectionSettings = {
      ...data.sectionSettings,
      ...req.body,
    }
    await writeOffersData(data)
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
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No promotional image file uploaded' })
    }
    const cleanName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')
    req.file.filename = `offer-${Date.now()}-${uuidv4().slice(0, 8)}${extname(cleanName)}`
    const result = await processImageUpload(req.file, { folder: 'josh_offers' })
    logActivity(`Uploaded promotional banner: ${req.file.originalname}`)
    res.json({ url: result.url, filename: result.filename, provider: result.provider })
  } catch (error) {
    console.error('Banner upload error:', error)
    res.status(500).json({ error: 'Failed to upload promotional banner' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 5. Admin API: Create New Campaign
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', authenticateToken, async (req, res) => {
  try {
    const data = await readOffersData()
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

    if (isMongoConnected()) {
      await Offer.findOneAndUpdate({ id: newOffer.id }, newOffer, { upsert: true, new: true })
    }
    await writeOffersData(data)
    clearCache('offers')

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
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const data = await readOffersData()
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

    if (isMongoConnected()) {
      await Offer.findOneAndUpdate({ id }, { $set: updated }, { upsert: true, new: true })
    }
    await writeOffersData(data)
    clearCache('offers')

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
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const data = await readOffersData()
    const { id } = req.params
    const beforeCount = (data.offers || []).length
    const deletedItem = (data.offers || []).find((o) => String(o.id) === String(id))

    data.offers = (data.offers || []).filter((o) => String(o.id) !== String(id))

    if (data.offers.length === beforeCount) {
      return res.status(404).json({ error: 'Offer not found' })
    }

    if (isMongoConnected()) {
      await Offer.findOneAndDelete({ id })
    }
    await writeOffersData(data)
    clearCache('offers')

    logActivity(`Deleted promotional offer: "${deletedItem?.title || id}"`)
    res.json({ message: 'Offer deleted successfully', id })
  } catch (error) {
    console.error('Error deleting offer:', error)
    res.status(500).json({ error: 'Failed to delete promotional offer' })
  }
})

export default router
