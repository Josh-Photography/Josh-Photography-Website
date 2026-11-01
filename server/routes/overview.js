import express from 'express'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())

function readJsonSafe(filename, defaultVal) {
  try {
    const p = join(appDirPath, '../data', filename)
    if (existsSync(p)) {
      return JSON.parse(readFileSync(p, 'utf8'))
    }
  } catch (e) {
    console.error(`Error reading ${filename}:`, e)
  }
  return defaultVal
}

router.get('/', authenticateToken, (req, res) => {
  try {
    const contacts = readJsonSafe('contacts.json', [])
    const comments = readJsonSafe('comments.json', [])
    const photosData = readJsonSafe('photos.json', { photos: [] })
    const content = readJsonSafe('content.json', {})
    const activity = readJsonSafe('activity.json', [])

    const photos = photosData.photos || []
    const unreadMessages = contacts.filter((c) => c.status === 'unread').length
    const pendingComments = comments.filter((c) => !c.approved).length
    const publishedPhotos = photos.filter((p) => p.published !== false).length
    const unpublishedPhotos = photos.length - publishedPhotos

    const testimonials = content.testimonials || []
    const publishedTestimonials = testimonials.filter(
      (t) => t.published !== false
    ).length

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
