import serverless from 'serverless-http'
import { app } from '../../server/app.js'
import { connectDB } from '../../server/utils/db.js'

const serverlessHandler = serverless(app)

export const handler = async (event, context) => {
  // Prevent Lambda from waiting for open event loop / connection pool
  if (context) {
    context.callbackWaitsForEmptyEventLoop = false
  }

  // Ensure MongoDB is connected before handling any request (critical for cold starts)
  try {
    await connectDB()
  } catch (_) {}

  if (event.path) {
    event.path = event.path.replace(/^\/\.netlify\/functions\/api/, '/api')
  }
  return serverlessHandler(event, context)
}

