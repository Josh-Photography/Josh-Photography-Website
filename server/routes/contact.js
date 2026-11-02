import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { authenticateToken } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'
import { readJsonData, writeJsonData } from '../utils/jsonData.js'

const router = express.Router()
const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())
const contactsPath = join(appDirPath, '../data/contacts.json')

function readContacts() {
  return readJsonData('contacts', contactsPath, [])
}

function writeContacts(data) {
  return writeJsonData('contacts', contactsPath, data)
}

// Get all contacts (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const contacts = await readContacts()
    contacts.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0))
    res.json(contacts)
  } catch (error) {
    console.error('Error reading contacts:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Submit contact / booking inquiry (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, eventDate, location, message } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const contacts = await readContacts()

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
    await writeContacts(contacts)
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
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const contacts = await readContacts()
    const { id } = req.params
    const index = contacts.findIndex((c) => c.id === id)

    if (index === -1) {
      return res.status(404).json({ error: 'Message not found' })
    }

    const { status } = req.body
    contacts[index].status = status || (contacts[index].status === 'unread' ? 'read' : 'unread')
    await writeContacts(contacts)

    res.json(contacts[index])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message status' })
  }
})

// Delete contact message (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const contacts = await readContacts()
    const { id } = req.params
    const filtered = contacts.filter((c) => c.id !== id)

    if (filtered.length === contacts.length) {
      return res.status(404).json({ error: 'Message not found' })
    }

    await writeContacts(filtered)
    logActivity(`Deleted message #${id}`)
    res.json({ message: 'Message deleted successfully', id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

export default router