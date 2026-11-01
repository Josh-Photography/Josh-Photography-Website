// ============================================================
// PERSISTENT STORAGE HANDLER — JOSH PHOTOGRAPHY
// Supports Cloudinary CDN & persistent local file mirroring
// ============================================================

import { copyFileSync, existsSync, mkdirSync, unlinkSync, createReadStream, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicUploadsPath = join(__dirname, '../../public/uploads')
const serverUploadsPath = join(__dirname, '../uploads')

if (!existsSync(publicUploadsPath)) {
  mkdirSync(publicUploadsPath, { recursive: true })
}
if (!existsSync(serverUploadsPath)) {
  mkdirSync(serverUploadsPath, { recursive: true })
}

/**
 * Uploads a file to Cloudinary if credentials exist; otherwise mirrors locally.
 * Guarantees zero downtime and complete offline compatibility.
 *
 * @param {object} file - Multer file object
 * @param {object} [options] - Optional upload parameters (folder, tags)
 * @returns {Promise<{ url: string, filename: string, provider: 'cloudinary' | 'local' }>}
 */
export async function processImageUpload(file, options = {}) {
  if (!file) {
    throw new Error('No file provided for storage')
  }

  // Dynamically load/refresh .env configuration
  try {
    const rootEnvPath = join(__dirname, '../../.env')
    if (existsSync(rootEnvPath)) {
      const lines = readFileSync(rootEnvPath, 'utf8').split(/\r?\n/)
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim()
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"](.*)['"]$/, '$1')
          if (key) {
            process.env[key] = val
          }
        }
      }
    }
  } catch (_) {}

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET

  // 1. Attempt Cloudinary persistent upload if credentials are provided
  if (cloudName && ((apiKey && apiSecret) || uploadPreset)) {
    try {
      const timestamp = Math.round(Date.now() / 1000)
      const folder = options.folder || (options.category ? `josh_portfolio/${options.category}` : 'josh_content')

      const formData = new FormData()
      const fileBuffer = file.buffer || (file.path && existsSync(file.path) ? readFileSync(file.path) : null)
      if (!fileBuffer) {
        throw new Error('File buffer is empty or file not found on disk')
      }
      const blob = new Blob([fileBuffer], { type: file.mimetype })
      formData.append('file', blob, file.originalname)
      formData.append('timestamp', String(timestamp))
      formData.append('folder', folder)
      formData.append('asset_folder', folder)

      if (apiKey && apiSecret) {
        formData.append('api_key', apiKey)
        const signParams = {
          asset_folder: folder,
          folder: folder,
          timestamp: timestamp
        }
        const sortedKeys = Object.keys(signParams).sort()
        const toSign = sortedKeys.map((k) => `${k}=${signParams[k]}`).join('&') + apiSecret
        const signature = crypto.createHash('sha1').update(toSign).digest('hex')
        formData.append('signature', signature)
      } else if (uploadPreset) {
        formData.append('upload_preset', uploadPreset)
      }

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        if (result.secure_url) {
          // Keep a local copy too if on disk
          try {
            if (file.path && existsSync(file.path)) {
              copyFileSync(file.path, join(publicUploadsPath, file.filename))
            }
          } catch (_) {}

          return {
            url: result.secure_url,
            filename: file.filename || file.originalname,
            provider: 'cloudinary',
            publicId: result.public_id,
          }
        }
      } else {
        const errText = await response.text()
        console.warn('Cloudinary upload returned non-200, falling back to local:', errText)
      }
    } catch (cloudErr) {
      console.warn('Cloudinary upload attempt failed, falling back to local:', cloudErr.message)
    }
  }

  // 2. Local fallback storage: ensure file is safely in server/uploads AND public/uploads
  try {
    if (file.path && existsSync(file.path)) {
      copyFileSync(file.path, join(publicUploadsPath, file.filename))
    }
  } catch (mirrorErr) {
    console.warn('Could not mirror file to public/uploads:', mirrorErr.message)
  }

  return {
    url: `/uploads/${file.filename}`,
    filename: file.filename,
    provider: 'local',
  }
}

/**
 * Deletes a file from local disk if it exists.
 */
export function removeLocalUpload(filenameOrUrl) {
  if (!filenameOrUrl) return
  const basename = filenameOrUrl.replace(/^\/uploads\//, '')
  const targets = [
    join(serverUploadsPath, basename),
    join(publicUploadsPath, basename),
  ]

  targets.forEach((target) => {
    try {
      if (existsSync(target)) {
        unlinkSync(target)
      }
    } catch (_) {}
  })
}

/**
 * Extracts a Cloudinary public_id from a URL or raw ID string.
 */
export function extractCloudinaryPublicId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null
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
        // Strip version tags (e.g. v1793551381)
        if (/^v\d+$/.test(part)) {
          pastPrefixes = true
          continue
        }
        // Strip transformation params before the version/folder (e.g. w_800, c_limit, f_auto, q_auto)
        if (!pastPrefixes && (part.includes(',') || /^(?:[whcqfgebar]|co|bo|fl|pg|dn|so|eo|du|ar|dpr|cs)_/i.test(part))) {
          continue
        }
        cleanParts.push(part)
      }
      return cleanParts.join('/').replace(/\.[a-zA-Z0-9]+$/, '')
    }
  }
  return null
}

/**
 * Permanently deletes an image from Cloudinary by public ID or URL.
 */
export async function deleteCloudinaryAsset(publicIdOrUrl) {
  const publicId = extractCloudinaryPublicId(publicIdOrUrl)
  if (!publicId) return { success: false, reason: 'invalid_public_id' }

  // Dynamically refresh credentials with production fallback
  try {
    const rootEnvPath = join(__dirname, '../../.env')
    if (existsSync(rootEnvPath)) {
      const lines = readFileSync(rootEnvPath, 'utf8').split(/\r?\n/)
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim()
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"](.*)['"]$/, '$1')
          if (key) process.env[key] = val
        }
      }
    }
  } catch (_) {}

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME || 'y5l55yxi'
  const apiKey = process.env.CLOUDINARY_API_KEY || '417454249619647'
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'Wb63pV-5QWKkgNnrO9lrVz5FqSs'

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cloudinary credentials missing, cannot delete asset:', publicId)
    return { success: false, reason: 'missing_credentials' }
  }

  async function destroyOne(targetId) {
    try {
      const timestamp = Math.round(Date.now() / 1000)
      const signParams = { public_id: targetId, timestamp }
      const sortedKeys = Object.keys(signParams).sort()
      const toSign = sortedKeys.map((k) => `${k}=${signParams[k]}`).join('&') + apiSecret
      const signature = crypto.createHash('sha1').update(toSign).digest('hex')

      const formData = new FormData()
      formData.append('public_id', targetId)
      formData.append('timestamp', String(timestamp))
      formData.append('api_key', apiKey)
      formData.append('signature', signature)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        return result
      }
    } catch (_) {}
    return null
  }

  try {
    let result = await destroyOne(publicId)
    if (result && result.result === 'ok') {
      console.log(`Cloudinary destroyed asset "${publicId}": ok`)
      return { success: true, result: 'ok', publicId }
    }

    // Fallback: If publicId contained folders (e.g. josh_portfolio/maternity/xxx), try just base ID xxx
    if (publicId.includes('/')) {
      const baseId = publicId.split('/').pop()
      const fallbackResult = await destroyOne(baseId)
      if (fallbackResult && fallbackResult.result === 'ok') {
        console.log(`Cloudinary destroyed asset with base ID "${baseId}": ok`)
        return { success: true, result: 'ok', publicId: baseId }
      }
    }

    console.warn(`Cloudinary destroy returned:`, result)
    return { success: false, result: result?.result || 'not_found' }
  } catch (err) {
    console.warn('Cloudinary destroy failed:', err.message)
    return { success: false, error: err.message }
  }
}

/**
 * Universal media deletion: removes from both Cloudinary CDN and local storage.
 */
export async function deleteMediaAsset(filenameOrUrl, publicId) {
  const cloudinaryTarget = publicId || filenameOrUrl
  let cloudResult = { success: false }

  if (cloudinaryTarget && (cloudinaryTarget.includes('cloudinary.com') || publicId)) {
    cloudResult = await deleteCloudinaryAsset(cloudinaryTarget)
  }

  if (filenameOrUrl) {
    removeLocalUpload(filenameOrUrl)
  }

  return {
    cloudinary: cloudResult.success,
    local: true,
  }
}

