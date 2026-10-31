import { siteConfig } from '../data/siteConfig.js'

/**
 * ============================================================
 * CENTRALIZED WHATSAPP INTEGRATION — JOSH PHOTOGRAPHY (UK)
 * Official WhatsApp Number: +44 7988 827057
 * Official Click-to-Chat Path: https://wa.me/447988827057
 * ============================================================
 */

export const DEFAULT_WHATSAPP_DISPLAY = '+44 7988 827057'
export const DEFAULT_WHATSAPP_DIGITS = '447988827057'

/**
 * Strips all non-digit characters to return the standardized international digits string for wa.me.
 * Handles inputs like:
 *   "+44 7988 827057" -> "447988827057"
 *   "07988 827057"    -> "447988827057" (UK local to international)
 *   "https://wa.me/447988827057" -> "447988827057"
 */
export function getCleanWhatsAppNumber(rawNumber) {
  if (!rawNumber) return DEFAULT_WHATSAPP_DIGITS

  const str = String(rawNumber).trim()

  // If a full wa.me URL was passed
  if (str.includes('wa.me/')) {
    const segment = str.split('wa.me/')[1] || ''
    const extracted = segment.split(/[?#/]/)[0].replace(/[^0-9]/g, '')
    if (extracted) return extracted
  }

  const digits = str.replace(/[^0-9]/g, '')

  // Handle standard UK 11-digit local format: 07xxxxxxxxx -> 447xxxxxxxxx
  if (digits.startsWith('0') && digits.length === 11) {
    return '44' + digits.slice(1)
  }

  return digits || DEFAULT_WHATSAPP_DIGITS
}

/**
 * Generates the official WhatsApp click-to-chat URL per WhatsApp documentation.
 * URL format: https://wa.me/<number>?text=<encoded_text>
 *
 * @param {string} rawNumber - Phone number string or studio setting
 * @param {string} messageText - Optional unencoded text message
 * @returns {string} Fully encoded https://wa.me click-to-chat URL
 */
export function getWhatsAppUrl(rawNumber, messageText = '') {
  const cleanNumber = getCleanWhatsAppNumber(rawNumber)
  if (messageText && typeof messageText === 'string' && messageText.trim().length > 0) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText.trim())}`
  }
  return `https://wa.me/${cleanNumber}`
}

/**
 * Formats a clean, professional booking inquiry message for WhatsApp
 * containing all 8 customer-entered celebration details.
 */
export function formatBookingInquiryMessage({
  name = '',
  phone = '',
  email = '',
  eventType = 'Wedding Ceremony & Reception',
  date = '',
  location = '',
  guestCount = '',
  message = '',
} = {}) {
  const lines = [
    '*New Booking Inquiry — Josh Photography*',
    '',
    `• *Customer Name:* ${name ? name.trim() : 'Not specified'}`,
    `• *Phone Number:* ${phone ? phone.trim() : 'Not specified'}`,
    `• *Email Address:* ${email ? email.trim() : 'Not specified'}`,
    `• *Event Type:* ${eventType ? eventType.trim() : 'General Photography'}`,
    `• *Event Date(s):* ${date ? String(date).trim() : 'To be confirmed'}`,
    `• *Venue / City:* ${location ? location.trim() : 'To be confirmed'}`,
    `• *Estimated Guest Count:* ${guestCount && guestCount.trim() ? guestCount.trim() : 'Not specified'}`,
    `• *Vision & Special Requests:* ${message && message.trim() ? message.trim() : 'None provided'}`,
  ]

  return lines.join('\n')
}

/**
 * Cross-platform WhatsApp opener (desktop browser & mobile apps).
 * Attempts to open in a new tab first; falls back to window.location
 * if a popup blocker or mobile browser blocks the new window.
 */
export function openWhatsAppChat(url) {
  if (typeof window === 'undefined' || !url) return
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url
    }
  } catch (err) {
    window.location.href = url
  }
}
