import serverless from 'serverless-http'
import { app } from '../../server/app.js'

const serverlessHandler = serverless(app)

export const handler = async (event, context) => {
  if (event.path) {
    event.path = event.path.replace(/^\/\.netlify\/functions\/api/, '/api')
  }
  return serverlessHandler(event, context)
}

