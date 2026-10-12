import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const commentsPath = join(__dirname, '../data/comments.json')

function readComments() {
  if (!existsSync(commentsPath)) {
    return []
  }
  try {
    return JSON.parse(readFileSync(commentsPath, 'utf8'))
  } catch (e) {
    return []
  }
}

function writeComments(data) {
  writeFileSync(commentsPath, JSON.stringify(data, null, 2))
}

// Get all comments (admin auth or public approved)
router.get('/', (req, res) => {
  try {
    const comments = readComments()
    // If not authenticated, return only approved
    const isPublic = !req.headers.authorization
    const result = isPublic ? comments.filter((c) => c.approved) : comments
    result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    res.json(result)
  } catch (error) {
    console.error('Error reading comments:', error)
    res.status(500).json({ error: 'Failed to load comments' })
  }
})

// Get comments for specific photo
router.get('/photo/:photoId', (req, res) => {
  try {
    const comments = readComments()
    const photoComments = comments.filter(
      (c) => c.photoId === req.params.photoId && c.approved
    )
    res.json(photoComments)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load comments' })
  }
})

// Add comment (public)
router.post('/', (req, res) => {
  try {
    const { photoId, name, email, comment } = req.body

    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' })
    }

    const comments = readComments()

    const newComment = {
      id: uuidv4(),
      photoId: photoId || 'general',
      name: name.trim(),
      email: email ? email.trim() : '',
      comment: comment.trim(),
      approved: false, // Moderated by default
      createdAt: new Date().toISOString(),
    }

    comments.unshift(newComment)
    writeComments(comments)
    logActivity(`New comment submitted by ${newComment.name} (pending approval)`, 'System')

    res.status(201).json(newComment)
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ error: 'Failed to add comment' })
  }
})

// Approve / moderate comment (protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const comments = readComments()
    const { id } = req.params
    const index = comments.findIndex((c) => c.id === id)

    if (index === -1) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    const { approved } = req.body
    comments[index].approved = approved !== undefined ? approved : !comments[index].approved
    writeComments(comments)
    logActivity(`${comments[index].approved ? 'Approved' : 'Unapproved'} comment #${id}`)

    res.json(comments[index])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' })
  }
})

// Delete comment (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const comments = readComments()
    const { id } = req.params
    const filtered = comments.filter((c) => c.id !== id)

    if (filtered.length === comments.length) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    writeComments(filtered)
    logActivity(`Deleted comment #${id}`)
    res.json({ message: 'Comment deleted successfully', id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' })
  }
})

export default router