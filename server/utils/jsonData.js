import { existsSync, readFileSync, writeFileSync } from 'fs'
import JsonData from '../models/JsonData.js'
import { isMongoConnected } from './db.js'

export async function readJsonData(key, filePath, fallback) {
  if (isMongoConnected()) {
    const stored = await JsonData.findOne({ key }).lean()
    if (stored) return stored.value
  }

  if (!existsSync(filePath)) return fallback

  try {
    return JSON.parse(readFileSync(filePath, 'utf8'))
  } catch (_) {
    return fallback
  }
}

export async function writeJsonData(key, filePath, value) {
  if (isMongoConnected()) {
    await JsonData.findOneAndUpdate(
      { key },
      { $set: { value } },
      { upsert: true, new: true }
    )
    return
  }

  writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8')
}
