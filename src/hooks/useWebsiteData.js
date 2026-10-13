import { useState, useEffect } from 'react'
import dataService from '../services/dataService'

export function useWebsiteData() {
  const [data, setData] = useState(() => dataService.getAllDataSync())

  useEffect(() => {
    // Initial backend fetch
    dataService.refreshAllData()

    // Subscribe to reactive updates (from admin saves or cross-tab updates)
    const unsubscribe = dataService.subscribe((newData) => {
      setData(newData)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const content = (data && data.content && typeof data.content === 'object') ? data.content : {}

  return {
    data,
    studio: content.studio || {},
    about: content.about || {},
    heroSlides: (Array.isArray(content.heroSlides) ? content.heroSlides : []).filter((s) => s && s.published !== false),
    services: (Array.isArray(content.services) ? content.services : []).filter((s) => s && s.published !== false),
    testimonials: (Array.isArray(content.testimonials) ? content.testimonials : []).filter((t) => t && t.published !== false),
    team: (Array.isArray(content.collaborators) ? content.collaborators : []).filter((t) => t && t.published !== false),
    social: content.social || {},
    settings: content.settings || {},
    photos: Array.isArray(data?.photos) ? data.photos : (data?.photos?.photos || []),
    categories: Array.isArray(data?.categories) ? data.categories : (data?.photos?.categories || []),
    getCategoryCards: (categorySlugOrId) => dataService.getCategoryPhotos(categorySlugOrId),
    submitContact: (formData) => dataService.submitContact(formData),
    submitComment: (photoId, commentData) => dataService.submitComment(photoId, commentData),
  }
}

export default useWebsiteData
