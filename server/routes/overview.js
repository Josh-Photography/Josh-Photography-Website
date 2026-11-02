import express from 'express'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { authenticateToken } from '../middleware/auth.js'
import Photo from '../models/Photo.js'
import Content from '../models/Content.js'
import { isMongoConnected } from '../utils/db.js'
import { readJsonData } from '../utils/jsonData.js'

const router = express.Router()
const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())

function readJsonSafe(filename, defaultVal) {
  try {
    const candidates = [
      join(appDirPath, '../data', filename),
      join(process.cwd(), 'server/data', filename),
      join(process.cwd(), 'data', filename),
    ]
    const p = candidates.find((cand) => existsSync(cand))
    if (p) {
      return JSON.parse(readFileSync(p, 'utf8'))
    }
  } catch (e) {
    console.error(`Error reading ${filename}:`, e)
  }
  return defaultVal
}

function getJsonPath(filename) {
  const candidates = [
    join(appDirPath, '../data', filename),
    join(process.cwd(), 'server/data', filename),
    join(process.cwd(), 'data', filename),
  ]
  return candidates.find((candidate) => existsSync(candidate)) || candidates[0]
}

router.get('/', authenticateToken, async (req, res) => {
  try {
    const contacts = await readJsonData('contacts', getJsonPath('contacts.json'), [])
    const comments = await readJsonData('comments', getJsonPath('comments.json'), [])
    const activity = await readJsonData('activity', getJsonPath('activity.json'), [])

    let photos = []
    let content = {}

    // 1. Query MongoDB Atlas if connected
    if (isMongoConnected()) {
      try {
        photos = await Photo.find({}).lean()
        const contentDoc = await Content.findOne({ key: 'main_content' }).lean()
        if (contentDoc) {
          content = contentDoc
        }
      } catch (err) {
        console.warn('[Overview] Mongo query warning:', err.message)
      }
    }

    // 2. Fallback to data files if Mongo returned empty
    if (!photos || photos.length === 0) {
      const photosData = readJsonSafe('photos.json', { photos: [] })
      photos = photosData.photos || []
    }
    if (!content || !content.testimonials) {
      content = readJsonSafe('content.json', content || {})
    }

    const unreadMessages = contacts.filter((c) => c.status === 'unread' || c.status === 'new').length
    const pendingComments = comments.filter((c) => !c.approved).length
    const publishedPhotos = photos.filter((p) => p.published !== false).length
    const unpublishedPhotos = photos.length - publishedPhotos

    const testimonials = content.testimonials || []
    const publishedTestimonials = testimonials.filter((t) => t.published !== false).length

    const services = content.services || []
    const activeServices = services.filter((s) => s.published !== false).length

    const collaborators = content.collaborators || []

    res.json({
      stats: {
        totalMessages: contacts.length,
        unreadMessages,
        totalComments: comments.length,
        pendingComments,
        totalPhotos: photos.length,
        publishedPhotos,
        unpublishedPhotos,
        totalTestimonials: testimonials.length,
        publishedTestimonials,
        totalServices: services.length,
        activeServices,
        totalTeam: collaborators.length,
      },
      recentActivity: activity.slice(0, 15),
    })
  } catch (error) {
    console.error('Error getting overview stats:', error)
    res.status(500).json({ error: 'Failed to load overview data' })
  }
})

export default router
