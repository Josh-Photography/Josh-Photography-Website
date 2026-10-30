import { app } from './app.js'

const PORT = process.env.PORT || 3001

if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  app.listen(PORT, () => {
    console.log(`🚀 Josh Photography Standalone Server running on http://localhost:${PORT}`)
  })
}

export default app
export { app }
