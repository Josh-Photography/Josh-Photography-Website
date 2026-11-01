import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())
const activityPath = join(appDirPath, '../data/activity.json')

export function logActivity(action, user = 'Admin') {
  try {
    let list = []
    if (existsSync(activityPath)) {
      list = JSON.parse(readFileSync(activityPath, 'utf8'))
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
    writeFileSync(activityPath, JSON.stringify(list, null, 2))
  } catch (err) {
    console.error('Failed to log activity:', err)
  }
}
