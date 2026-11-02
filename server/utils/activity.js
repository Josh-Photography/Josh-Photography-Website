import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readJsonData, writeJsonData } from './jsonData.js'

const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())
function getActivityPath() {
  const candidates = [
    join(appDirPath, '../data/activity.json'),
    join(process.cwd(), 'server/data/activity.json'),
    join(process.cwd(), 'data/activity.json'),
  ]
  return candidates.find((p) => existsSync(p)) || candidates[0]
}

export async function logActivity(action, user = 'Admin') {
  try {
    const actPath = getActivityPath()
    let list = await readJsonData('activity', actPath, [])
    list.unshift({
      id: 'act-' + Date.now(),
      action,
      user,
      timestamp: new Date().toISOString(),
    })
    if (list.length > 50) {
      list = list.slice(0, 50)
    }
    await writeJsonData('activity', actPath, list)
  } catch (err) {
    console.error('Failed to log activity:', err)
  }
}
