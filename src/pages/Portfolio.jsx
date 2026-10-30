import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Calendar, ChevronRight } from 'lucide-react'
import { photographyCategories } from '../data/categoriesData'
import { EditorialCollectionSection } from '../components/common/PhotographyCard'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')
  const location = useLocation()

  // Handle smooth scroll when navigating to hash or category selection
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId)
    if (categoryId === 'all') {
      window.scrollTo({ top: 400, behavior: 'smooth' })
      return
    }
    const elem = document.getElementById(categoryId)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Scroll to hash on page load if present (e.g. from direct link /portfolio#weddings)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const found = photographyCategories.find((c) => c.id === id || c.slug === id)
      if (found) {
        setTimeout(() => {
          scrollToCategory(found.id)
        }, 150)
      }
    }
  }, [location])

  return (
    <div className="bg-[#F8F3EA] min-h-screen">
      {/* ── 1. Editorial Luxury Dark Chocolate Hero Section ── */}
      <header
        className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden text-center border-b border-[#D8B77A]/35"
        style={{
          background: `
            radial-gradient(ellipse 95% 65% at 50% -10%, rgba(220, 160, 90, 0.32) 0%, transparent 65%),
            radial-gradient(ellipse 75% 55% at 92% 35%, rgba(195, 130, 65, 0.24) 0%, transparent 60%),
            radial-gradient(ellipse 75% 55% at 8% 70%, rgba(175, 110, 50, 0.22) 0%, transparent 60%),
            linear-gradient(175deg, #1C0F08 0%, #2B170E 20%, #3E2416 45%, #4A2B1A 55%, #351C11 82%, #1A0D07 100%)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-[#E5BA78] font-sans font-semibold mb-3.5 drop-shadow-[0_1px_8px_rgba(229,186,120,0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA78]" />
            <span>EDITORIAL PHOTOGRAPHY PORTFOLIO</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#FAF4EA] font-light tracking-wide mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] leading-[1.12]"
          >
            Every Moment, Beautifully Captured
          </motion.h1>

          {/* Champagne Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4.5rem' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#E5BA78] to-transparent mx-auto mb-5"
          />

          {/* Rich Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#FAF4EA]/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] mb-4"
          >
            From timeless weddings and joyful birthdays to intimate family moments and professional events, we capture the emotions, details, and stories that make every occasion unforgettable.
          </motion.p>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#E5BA78]/90 text-sm sm:text-base font-light italic max-w-2xl mx-auto mb-9"
          >
            Explore our curated collections below to discover our full range of photography services across the United Kingdom.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#weddings"
              onClick={(e) => {
                e.preventDefault()
                scrollToCategory('weddings')
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40 rounded-sm"
            >
              <span>Explore Our Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/check-availability"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#FAF4EA]/80 text-[#FAF4EA] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#FAF4EA]/15 transition-all duration-300 backdrop-blur-sm rounded-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E5BA78]" />
              <span>Enquire About a Photoshoot</span>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ── 3. All 12 Informative Photography Collections ── */}
      <main className="divide-y divide-[#D8B77A]/30">
        {photographyCategories.map((cat, index) => (
          <EditorialCollectionSection
            key={cat.id}
            category={cat}
            index={index}
            showCards={false}
          />
        ))}
      </main>

      {/* ── 4. Luxury Commissions & Studio Booking Footer Strip ── */}
      <section className="py-20 bg-[#FAF6EE] border-t border-[#D8B77A]/35 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.25em] text-[#B9975B] font-sans font-semibold block mb-3">
            COMMISSIONS & ENQUIRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] font-light mb-4">
            Preserve Your Next Chapter
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-5" />
          <p className="text-[#51443A]/85 text-base font-light mb-8 leading-relaxed">
            Available across the United Kingdom and premier destination celebrations. Inquire today to discuss commissions, availability, and custom bespoke packages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all duration-300 shadow-sm border border-[#D8B77A]/40 rounded-sm"
            >
              Check Availability
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-[#292522] text-[#292522] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#292522] hover:text-[#FAF6EE] transition-all duration-300 rounded-sm"
            >
              Contact Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
