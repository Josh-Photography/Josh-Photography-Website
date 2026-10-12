import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const activityPath = join(__dirname, '../data/activity.json')

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
