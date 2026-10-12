import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { photographyCategories } from '../data/categoriesData'
import { PhotographyCategorySection } from '../components/common/PhotographyCard'

export default function Celebrations() {
  const [activeCategory, setActiveCategory] = useState('all')

  // Filter celebration categories (excluding weddings for celebration focus, or all celebration categories)
  const celebrationCats = photographyCategories.filter((cat) => cat.id !== 'weddings')
  const displayedCategories =
    activeCategory === 'all'
      ? celebrationCats
      : celebrationCats.filter((cat) => cat.id === activeCategory)

  return (
    <div className="bg-[#F8F3EA] min-h-screen">
      {/* ── Refined Luxury Header ── */}
      <header
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden text-center border-b border-[#D8B77A]/35"
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-[#E5BA78] font-sans font-semibold mb-3 drop-shadow-[0_1px_8px_rgba(229,186,120,0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA78]" />
            <span>Celebrations & Milestones</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF4EA] font-light tracking-wide mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] leading-tight"
          >
            Celebration Galleries
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4.5rem' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#E5BA78] to-transparent mx-auto mb-5"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#FAF4EA]/85 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          >
            Honoring every landmark moment — from intimate surprise proposals and jubilant birthdays to peaceful newborns, maternal beauty, and multigenerational family reunions.
          </motion.p>
        </div>
      </header>

      {/* ── Category Filter Bar ── */}
      <nav
        aria-label="Celebration categories filter"
        className="sticky top-[68px] z-30 bg-[#F5EEE3]/95 backdrop-blur-md border-b border-[#D8B77A]/50 py-3.5 shadow-[0_4px_16px_rgba(41,37,34,0.06)]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-xs sm:text-[13px] font-nav uppercase tracking-[0.14em] font-semibold whitespace-nowrap transition-all duration-300 border ${
                activeCategory === 'all'
                  ? 'bg-[#B9975B] text-[#1A1715] border-[#B9975B] shadow-sm'
                  : 'bg-transparent text-[#51443A] border-[#D8B77A]/60 hover:border-[#B9975B] hover:text-[#292522]'
              }`}
            >
              All Celebrations ({celebrationCats.length})
            </button>
            {celebrationCats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-[13px] font-nav uppercase tracking-[0.14em] font-semibold whitespace-nowrap transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-[#B9975B] text-[#1A1715] border-[#B9975B] shadow-sm'
                    : 'bg-transparent text-[#51443A] border-[#D8B77A]/60 hover:border-[#B9975B] hover:text-[#292522]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Category Sections ── */}
      <main className="divide-y divide-[#D8B77A]/25">
        {displayedCategories.map((cat) => (
          <div key={cat.id} className="relative">
            <PhotographyCategorySection
              category={cat}
              cards={cat.cards}
            />

            <div className="bg-[#F8F3EA] pb-12 text-center">
              <Link
                to={`/${cat.slug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#D8B77A] text-[#292522] hover:bg-[#B9975B] hover:text-[#1A1715] font-nav text-xs uppercase tracking-[0.18em] transition-all duration-300 group rounded-sm"
              >
                <span>Explore Dedicated {cat.name} Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </main>

      {/* ── Booking Banner ── */}
      <section className="py-20 bg-[#FAF6EE] border-t border-[#D8B77A]/35 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-serif text-3xl text-[#292522] font-light mb-4">
            Reserve Your Celebration Date
          </h3>
          <p className="text-[#51443A]/85 text-sm sm:text-base font-light mb-8 leading-relaxed">
            From milestones to joyful reunions, our team delivers magazine-grade photography with unhurried grace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all duration-300 shadow-sm"
            >
              Check Availability
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3.5 border border-[#292522] text-[#292522] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#292522] hover:text-[#FAF6EE] transition-all duration-300"
            >
              Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
