import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())
function getActivityPath() {
  const candidates = [
    join(appDirPath, '../data/activity.json'),
    join(process.cwd(), 'server/data/activity.json'),
    join(process.cwd(), 'data/activity.json'),
  ]
  return candidates.find((p) => existsSync(p)) || candidates[0]
}

export function logActivity(action, user = 'Admin') {
  try {
    const actPath = getActivityPath()
    let list = []
    if (existsSync(actPath)) {
      list = JSON.parse(readFileSync(actPath, 'utf8'))
    }
    list.unshift({
      id: 'act-' + Date.now(),
      action,
      user,
      timestamp: new Date().toISOString(),
    })
    if (list.length > 50) {
      list = list.slice(0, 50)
    }
    try {
      writeFileSync(actPath, JSON.stringify(list, null, 2))
    } catch (_) {}
  } catch (err) {
    console.error('Failed to log activity:', err)
  }
}
