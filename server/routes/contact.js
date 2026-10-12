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
const contactsPath = join(__dirname, '../data/contacts.json')

function readContacts() {
  if (!existsSync(contactsPath)) {
    return []
  }
  try {
    return JSON.parse(readFileSync(contactsPath, 'utf8'))
  } catch (e) {
    return []
  }
}

function writeContacts(data) {
  writeFileSync(contactsPath, JSON.stringify(data, null, 2))
}

// Get all contacts (admin only)
router.get('/', authenticateToken, (req, res) => {
  try {
    const contacts = readContacts()
    contacts.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0))
    res.json(contacts)
  } catch (error) {
    console.error('Error reading contacts:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Submit contact / booking inquiry (public)
router.post('/', (req, res) => {
  try {
    const { name, email, phone, service, eventDate, location, message } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const contacts = readContacts()

    const newContact = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      service: service || 'General Inquiry',
      eventDate: eventDate || '',
      location: location || '',
      message: message ? message.trim() : '',
      submittedAt: new Date().toISOString(),
      status: 'unread',
    }

    contacts.unshift(newContact)
    writeContacts(contacts)
    logActivity(`New inquiry received from ${newContact.name} (${newContact.service})`, 'System')

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      id: newContact.id,
    })
  } catch (error) {
    console.error('Error submitting contact inquiry:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Update message status (unread / read) (protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const contacts = readContacts()
    const { id } = req.params
    const index = contacts.findIndex((c) => c.id === id)

    if (index === -1) {
      return res.status(404).json({ error: 'Message not found' })
    }

    const { status } = req.body
    contacts[index].status = status || (contacts[index].status === 'unread' ? 'read' : 'unread')
    writeContacts(contacts)

    res.json(contacts[index])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message status' })
  }
})

// Delete contact message (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const contacts = readContacts()
    const { id } = req.params
    const filtered = contacts.filter((c) => c.id !== id)

    if (filtered.length === contacts.length) {
      return res.status(404).json({ error: 'Message not found' })
    }

    writeContacts(filtered)
    logActivity(`Deleted message #${id}`)
    res.json({ message: 'Message deleted successfully', id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

export default router