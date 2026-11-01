// ============================================================
// MONGODB ATLAS CONNECTION & HIGH-PERFORMANCE SEO CACHE
// Josh Photography Database Engine
// ============================================================

import mongoose from 'mongoose'
import { readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let isConnected = false
let connectionPromise = null

// In-Memory Fast Cache for Sub-millisecond SEO Page Load Speeds
const cacheStore = new Map()
const CACHE_TTL_MS = 60 * 1000 // 60 seconds TTL

export function getCached(key) {
  const item = cacheStore.get(key)
  if (!item) return null
  if (Date.now() > item.expiresAt) {
    cacheStore.delete(key)
    return null
  }
  return item.data
}

export function setCached(key, data, ttlMs = CACHE_TTL_MS) {
  cacheStore.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  })
}

export function clearCache(pattern = null) {
  if (!pattern) {
    cacheStore.clear()
    return
  }
  for (const key of cacheStore.keys()) {
    if (key.includes(pattern)) {
      cacheStore.delete(key)
    }
  }
}

/**
 * Dynamically loads and refreshes .env file
 */
export function getMongoUri() {
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
          if (key && !process.env[key]) {
            process.env[key] = val
          }
        }
      }
    }
  } catch (_) {}

  return process.env.MONGODB_URI || process.env.MONGO_URI || ''
}

/**
 * Connects to MongoDB Atlas cluster
 */
export async function connectDB() {
  if (isConnected) return mongoose.connection

  const uri = getMongoUri()
  if (!uri) {
    console.log('[Database] MONGODB_URI not set. Using local JSON files as high-availability storage.')
    return null
  }

  if (connectionPromise) {
    return connectionPromise
  }

  connectionPromise = (async () => {
    try {
      mongoose.set('strictQuery', false)

      const conn = await mongoose.connect(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })

      isConnected = true
      console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`)

      mongoose.connection.on('error', (err) => {
        console.error('[Database] MongoDB connection error:', err.message)
        isConnected = false
      })

      mongoose.connection.on('disconnected', () => {
        console.warn('[Database] MongoDB disconnected. Reconnection will be attempted on next request.')
        isConnected = false
        connectionPromise = null
      })

      return conn.connection
    } catch (err) {
      console.error('[Database] MongoDB Atlas connection failed:', err.message)
      isConnected = false
      connectionPromise = null
      return null
    }
  })()

  return connectionPromise
}

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1
}

export default connectDB

