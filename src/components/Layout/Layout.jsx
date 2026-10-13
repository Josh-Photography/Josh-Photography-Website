import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import WhatsAppFloat from '../WhatsAppFloat/WhatsAppFloat'
import HelloChatbot from '../Chatbot/HelloChatbot'
import ScrollToTop from './ScrollToTop'
import { useWebsiteData } from '../../hooks/useWebsiteData'

export default function Layout() {
  const { settings = {}, studio = {} } = useWebsiteData()

  useEffect(() => {
    const title = settings.seoTitle || settings.seoDefaultTitle || (studio.name ? `${studio.name} | ${studio.tagline || 'Stories Worth Remembering'}` : '')
    if (title) {
      document.title = title
    }
    const description = settings.seoDescription || studio.description
    if (description) {
      let metaTag = document.querySelector('meta[name="description"]')
      if (!metaTag) {
        metaTag = document.createElement('meta')
        metaTag.name = 'description'
        document.head.appendChild(metaTag)
      }
      metaTag.content = description
    }
  }, [settings.seoTitle, settings.seoDefaultTitle, settings.seoDescription, studio.name, studio.tagline, studio.description])

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal selection:bg-gold/20 selection:text-charcoal font-sans antialiased">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <HelloChatbot />
    </div>
  )
}
