// ============================================================
// CLOUDINARY MEDIA OPTIMIZATION & CDN UTILITIES — JOSH PHOTOGRAPHY
// Provides automatic format (WebP/AVIF), perceptual compression,
// responsive thumbnail sizing, fallback placeholders, and direct client uploads.
// ============================================================

import { normalizeCategoryKey } from './categoryUtils'

export const CLOUDINARY_CLOUD_NAME =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME) ||
  'y5l55yxi'

export const CLOUDINARY_UPLOAD_PRESET =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_UPLOAD_PRESET) ||
  'josh_photography'

export const FALLBACK_IMAGE = '/images/hero-church-wedding.jpg'

/**
 * Checks if a URL points to Cloudinary CDN
 */
export function isCloudinaryUrl(url) {
  return typeof url === 'string' && url.includes('res.cloudinary.com')
}

/**
 * Transforms a Cloudinary URL with responsive width, auto format, and auto quality.
 * Example:
 * Input:  https://res.cloudinary.com/y5l55yxi/image/upload/v1793551381/josh_portfolio/birthdays/photo.jpg
 * Output: https://res.cloudinary.com/y5l55yxi/image/upload/f_auto,q_auto,w_800,c_limit/v1793551381/josh_portfolio/birthdays/photo.jpg
 *
 * @param {string} url - Original image URL
 * @param {object} [options] - Transformations: width, height, crop, quality, format
 * @returns {string} Optimized URL or original URL if not hosted on Cloudinary
 */
export function getOptimizedCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== 'string') {
    return FALLBACK_IMAGE
  }

  if (!isCloudinaryUrl(url)) {
    return url
  }

  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto',
    gravity,
  } = options

  const parts = []
  if (format) parts.push(`f_${format}`)
  if (quality) parts.push(`q_${quality}`)
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)
  if (width || height) parts.push(`c_${crop}`)
  if (gravity) parts.push(`g_${gravity}`)

  if (parts.length === 0) return url

  const transformString = parts.join(',')
  const uploadToken = '/image/upload/'
  const uploadIndex = url.indexOf(uploadToken)

  if (uploadIndex === -1) return url

  const prefix = url.substring(0, uploadIndex + uploadToken.length)
  const suffix = url.substring(uploadIndex + uploadToken.length)

  // Prevent duplicate transformation chains
  if (
    suffix.startsWith('f_auto') ||
    suffix.startsWith('q_auto') ||
    suffix.startsWith('w_') ||
    suffix.startsWith('c_')
  ) {
    return url
  }

  return `${prefix}${transformString}/${suffix}`
}

/**
 * Responsive thumbnail sizing for gallery cards (800px width limit)
 */
export function getCardImageUrl(url, width = 800) {
  return getOptimizedCloudinaryUrl(url, { width, quality: 'auto', format: 'auto', crop: 'limit' })
}

/**
 * Responsive thumbnail for small previews & admin tables (400px width limit)
 */
export function getThumbnailUrl(url, width = 400) {
  return getOptimizedCloudinaryUrl(url, { width, quality: 'auto', format: 'auto', crop: 'limit' })
}

/**
 * High-definition optimized version for full-screen Lightbox viewer (1800px width limit)
 */
export function getLightboxImageUrl(url, width = 1800) {
  return getOptimizedCloudinaryUrl(url, { width, quality: 'auto', format: 'auto', crop: 'limit' })
}

/**
 * Extracts a Cloudinary public_id from a URL or raw ID string.
 * Example input:  https://res.cloudinary.com/y5l55yxi/image/upload/v1793575561/josh_portfolio/maternity/difqddwwhtrsvxg4c4jq.jpg
 * Output:         josh_portfolio/maternity/difqddwwhtrsvxg4c4jq
 */
export function extractCloudinaryPublicId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return ''
  if (!urlOrId.startsWith('http://') && !urlOrId.startsWith('https://')) {
    return urlOrId.replace(/\.[a-zA-Z0-9]+$/, '')
  }
  if (urlOrId.includes('cloudinary.com')) {
    const afterUpload = urlOrId.split('/upload/')[1]
    if (afterUpload) {
      const parts = afterUpload.split('/')
      const cleanParts = []
      let pastPrefixes = false
      for (const part of parts) {
        if (/^v\d+$/.test(part)) {
          pastPrefixes = true
          continue
        }
        if (!pastPrefixes && (part.includes(',') || /^(?:[whcqfgebar]|co|bo|fl|pg|dn|so|eo|du|ar|dpr|cs)_/i.test(part))) {
          continue
        }
        cleanParts.push(part)
      }
      return cleanParts.join('/').replace(/\.[a-zA-Z0-9]+$/, '')
    }
  }
  return ''
}

/**
 * Direct client-side unsigned upload to Cloudinary.
 * Used for Netlify standalone deployment where no backend server is available.
 *
 * @param {File|Blob} file - The image file to upload
 * @param {string} [folderOrCategory] - Optional category or subfolder
 * @returns {Promise<string>} Direct HTTPS Cloudinary secure URL
 */
export async function uploadToCloudinaryDirect(file, folderOrCategory) {
  const result = await uploadToCloudinaryDirectFull(file, folderOrCategory)
  return result.url
}

/**
 * Direct client-side unsigned upload to Cloudinary returning both URL and publicId.
 */
export async function uploadToCloudinaryDirectFull(file, folderOrCategory) {
  if (!file) throw new Error('No file provided for upload')

  const cloudName = CLOUDINARY_CLOUD_NAME
  const uploadPreset = CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary environment variables missing (VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET)')
  }

  const isExplicit = folderOrCategory ? (folderOrCategory.startsWith('josh_') || folderOrCategory.includes('/')) : false
  const normCat = folderOrCategory && !isExplicit ? normalizeCategoryKey(folderOrCategory) : ''
  const targetFolder = isExplicit ? folderOrCategory : (normCat ? `josh_portfolio/${normCat}` : 'josh_photography')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', targetFolder)
  formData.append('asset_folder', targetFolder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Cloudinary upload failed: ${errorText}`)
  }

  const data = await res.json()
  if (!data.secure_url) {
    throw new Error('Cloudinary response did not contain secure_url')
  }

  // Automatically update asset_folder in Cloudinary so it shows inside the category folder in Cloudinary Media Library
  if (data.public_id && targetFolder) {
    try {
      await fetch('/api/content/assign-asset-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: data.public_id, folder: targetFolder }),
      })
    } catch (_) {}
  }

  return { url: data.secure_url, publicId: data.public_id || '' }
}

