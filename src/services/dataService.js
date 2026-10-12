import initialContent from '../../server/data/content.json'
import initialPhotos from '../../server/data/photos.json'

const STORAGE_KEY = 'josh_cms_data'
const EVENT_NAME = 'josh_data_updated'

// In browser, relative '/api' works seamlessly through Vite proxy or same-domain deployment.
// If not reachable, fallback to localStorage & bundled defaults.
const API_BASE = '/api'

class DataService {
  constructor() {
    this.memoryCache = null
    this.listeners = new Set()
    this.init()
  }

  init() {
    // Listen for storage events across tabs or windows
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
          this.memoryCache = null
          this.notify()
        }
      })
      window.addEventListener(EVENT_NAME, () => {
        this.notify()
      })
    }
  }

  subscribe(listener) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.getAllDataSync())
      } catch (err) {
        console.error('DataService listener error:', err)
      }
    })
  }

  // Get current state synchronously from cache or localStorage or bundled defaults
  getAllDataSync() {
    if (this.memoryCache) {
      return this.memoryCache
    }

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed && parsed.content && parsed.photos) {
            this.memoryCache = parsed
            return parsed
          }
        }
      } catch (e) {
        console.warn('Failed to read from localStorage:', e)
      }
    }

    const fallback = {
      content: initialContent,
      photos: initialPhotos.photos || [],
      categories: initialPhotos.categories || [],
    }
    this.memoryCache = fallback
    return fallback
  }

  // Fetch latest data from backend API with cache update
  async refreshAllData() {
    try {
      const [contentRes, photosRes] = await Promise.all([
        fetch(`${API_BASE}/content`).catch(() => null),
        fetch(`${API_BASE}/photos`).catch(() => null),
      ])

      let content = null
      let photosData = null

      if (contentRes && contentRes.ok) {
        content = await contentRes.json()
      }
      if (photosRes && photosRes.ok) {
        photosData = await photosRes.json()
      }

      if (content || photosData) {
        const current = this.getAllDataSync()
        const merged = {
          content: content || current.content,
          photos: photosData?.photos || current.photos,
          categories: photosData?.categories || current.categories,
        }

        this.memoryCache = merged
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          } catch (e) {}
        }
        this.notify()
        return merged
      }
    } catch (err) {
      console.warn('Backend refresh failed, using cached data:', err)
    }

    return this.getAllDataSync()
  }

  // Category-specific photos getter
  getCategoryPhotos(categorySlugOrId) {
    const data = this.getAllDataSync()
    const all = data.photos || []

    const slug = (categorySlugOrId || '').toLowerCase()

    // Match exact category or alternate slug
    const matching = all.filter((p) => {
      if (p.published === false) return false
      const cat = (p.category || '').toLowerCase()
      if (cat === slug) return true
      if (slug === 'birthdays' && cat === 'birthday-photography') return true
      if (slug === 'birthday-photography' && cat === 'birthdays') return true
      if (slug === 'pre-wedding' && (cat === 'engagement' || cat === 'pre-wedding')) return true
      return false
    })

    // Sort by order ascending
    matching.sort((a, b) => (a.order || 0) - (b.order || 0))

    return matching.map((p, idx) => ({
      id: p.id || `photo-${idx}`,
      num: p.num || String(idx + 1).padStart(2, '0'),
      title: p.title || `Photograph ${idx + 1}`,
      desc: p.desc || '',
      image: p.image || p.src || '',
      src: p.src || p.image || '',
      srcLarge: p.srcLarge || p.image || p.src || '',
      alt: p.alt || p.title || 'Josh Photography portfolio image',
      category: p.category,
      order: p.order || idx + 1,
      published: p.published !== false,
    }))
  }

  // Studio Info
  getStudioInfo() {
    const data = this.getAllDataSync()
    return data.content?.studio || initialContent.studio
  }

  // About Page
  getAboutData() {
    const data = this.getAllDataSync()
    return data.content?.about || initialContent.about
  }

  // Hero Slides
  getHeroSlides() {
    const data = this.getAllDataSync()
    const slides = data.content?.heroSlides || initialContent.heroSlides
    return slides.filter((s) => s.published !== false)
  }

  // Services
  getServices() {
    const data = this.getAllDataSync()
    const services = data.content?.services || initialContent.services
    return services.filter((s) => s.published !== false)
  }

  // Testimonials
  getTestimonials() {
    const data = this.getAllDataSync()
    const testimonials = data.content?.testimonials || initialContent.testimonials
    return testimonials.filter((t) => t.published !== false)
  }

  // Team
  getTeam() {
    const data = this.getAllDataSync()
    const team = data.content?.collaborators || initialContent.collaborators
    return team.filter((t) => t.published !== false)
  }

  // Social
  getSocialLinks() {
    const data = this.getAllDataSync()
    return data.content?.social || initialContent.social
  }

  // Settings
  getSettings() {
    const data = this.getAllDataSync()
    return data.content?.settings || initialContent.settings
  }

  // Update Section (used by Admin)
  async updateContentSection(sectionKey, endpoint, payload, authHeaders = {}) {
    // 1. Update memory and localStorage immediately
    const current = this.getAllDataSync()
    const updatedContent = { ...current.content, [sectionKey]: payload }
    const updated = { ...current, content: updatedContent }

    this.memoryCache = updated
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        window.dispatchEvent(new Event(EVENT_NAME))
      } catch (e) {}
    }

    // 2. Persist to backend API if available
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        console.warn('Backend update returned non-OK status:', res.status)
      }
    } catch (err) {
      console.warn('Backend update failed, saved to local cache:', err)
    }

    this.notify()
    return updated
  }

  // Update photos list
  async updatePhotos(photosList) {
    const current = this.getAllDataSync()
    const updated = { ...current, photos: photosList }
    this.memoryCache = updated
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        window.dispatchEvent(new Event(EVENT_NAME))
      } catch (e) {}
    }
    this.notify()
    return updated
  }

  // Submit Contact Form
  async submitContact(formData) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        return await res.json()
      }
    } catch (e) {
      console.warn('Backend contact submission error:', e)
    }

    // Fallback: store locally in messages queue if offline
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('josh_offline_messages') || '[]')
        stored.unshift({
          ...formData,
          id: 'offline-' + Date.now(),
          submittedAt: new Date().toISOString(),
          status: 'unread',
        })
        localStorage.setItem('josh_offline_messages', JSON.stringify(stored))
      } catch (e) {}
    }

    return { message: 'Message received successfully', status: 'stored' }
  }

  // Submit Comment
  async submitComment(photoId, commentData) {
    try {
      const res = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId, ...commentData }),
      })
      if (res.ok) {
        return await res.json()
      }
    } catch (e) {
      console.warn('Backend comment submission error:', e)
    }

    return { message: 'Comment submitted for approval' }
  }
}

export const dataService = new DataService()
export default dataService
