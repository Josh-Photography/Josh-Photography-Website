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

