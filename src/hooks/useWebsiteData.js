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

  return {
    data,
    studio: data.content?.studio || {},
    about: data.content?.about || {},
    heroSlides: (data.content?.heroSlides || []).filter((s) => s.published !== false),
    services: (data.content?.services || []).filter((s) => s.published !== false),
    testimonials: (data.content?.testimonials || []).filter((t) => t.published !== false),
    team: (data.content?.collaborators || []).filter((t) => t.published !== false),
    social: data.content?.social || {},
    settings: data.content?.settings || {},
    photos: data.photos || [],
    categories: data.categories || [],
    getCategoryCards: (categorySlugOrId) => dataService.getCategoryPhotos(categorySlugOrId),
    submitContact: (formData) => dataService.submitContact(formData),
    submitComment: (photoId, commentData) => dataService.submitComment(photoId, commentData),
  }
}

export default useWebsiteData
