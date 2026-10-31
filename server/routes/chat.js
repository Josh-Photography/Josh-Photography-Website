import express from 'express'
import { handleChatMessage } from '../utils/chatEngine.js'
import { getKnowledgeBase } from '../utils/chatKnowledge.js'
import { OFF_TOPIC_RESPONSE } from '../utils/topicFilter.js'

const router = express.Router()

// POST /api/chat - Send message to Hello Chatbot
router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required',
        fallback: OFF_TOPIC_RESPONSE,
      })
    }

    const result = await handleChatMessage({
      message: message.trim(),
      history: Array.isArray(history) ? history : [],
    })

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    })
  } catch (error) {
    console.error('Chat error in /api/chat:', error)
    res.status(500).json({
      success: false,
      reply: 'I’m Hello Chatbot, your photography assistant! I am here to help you with our photography services, date bookings, promotional offers, and other website-related questions. Please feel free to ask your question or reach us directly on WhatsApp or call +44 7988 827057.',
      suggestions: ['Wedding Photography', 'Birthday Photography', 'Special Offers', 'Check Availability'],
      actions: [
        { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
        { label: 'Contact Us', url: '/contact', type: 'internal' },
      ],
    })
  }
})

// GET /api/chat/faq - Get starter FAQs and studio quick facts
router.get('/faq', (req, res) => {
  try {
    const kb = getKnowledgeBase()
    res.json({
      studioName: kb.studio.name,
      tagline: kb.studio.tagline,
      location: kb.studio.location,
      phone: kb.studio.phone,
      whatsapp: kb.studio.whatsapp,
      announcement: kb.announcement,
      starterSuggestions: [
        '💍 Wedding Photography',
        '🎂 Birthday Celebrations',
        '🎁 Special Offers & Discounts',
        '📅 How far in advance should we book?',
        '🏛️ Tell me about your new studio opening',
        '⏱️ What is your photo delivery turnaround time?',
      ],
      faqs: kb.faqs,
      services: kb.services.slice(0, 8),
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to load chat FAQs' })
  }
})

// GET /api/chat/status - Status check
router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    botName: 'Hello Chatbot',
    studio: 'Josh Photography',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

export default router
