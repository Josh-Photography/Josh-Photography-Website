import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'
import { heroSlides as staticHeroSlides } from '../../data/stories'
import { useWebsiteData } from '../../hooks/useWebsiteData'
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary'

const SLIDE_DURATION = 6000 // 6 seconds per slide for a calm, luxury rhythm

// Physical horizontal slide variants - 100% opaque, zero ghosting/transparency blending
const slideVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? '100%' : '-100%',
    zIndex: 2,
  }),
  center: {
    x: 0,
    zIndex: 2,
    transition: {
      x: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
    },
  },
  exit: (direction) => ({
    x: direction >= 0 ? '-100%' : '100%',
    zIndex: 1,
    transition: {
      x: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
    },
  }),
}

// Completely static, memoized hero content that NEVER re-renders or flickers on slide changes
const StaticHeroContent = memo(function StaticHeroContent() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 pointer-events-auto">
        {/* Small Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 sm:mb-6 rounded-full bg-deep-charcoal/80 backdrop-blur-md border border-champagne/40 text-champagne text-[11px] sm:text-xs font-nav font-semibold tracking-[0.22em] uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>JOSH PHOTOGRAPHY | CREATING TIMELESS MEMORIES</span>
        </div>

        {/* Decorative Gold Accent Line */}
        <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-4 sm:mb-6" />

        {/* Main Heading */}
        <h1 className="font-serif text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-wide leading-[1.18] mb-3 sm:mb-5 max-w-3xl mx-auto break-words drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
          Capturing Moments, Creating Memories
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-ivory/95 tracking-[0.14em] sm:tracking-[0.18em] uppercase font-light mb-6 sm:mb-9 max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
          Every Picture Tells a Story. Every Moment Becomes a Timeless Memory.
        </p>

        {/* Both Golden Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
          {/* Button 1: Check Availability */}
          <Link
            to="/check-availability"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-md border border-champagne/40"
          >
            <span>CHECK AVAILABILITY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Button 2: Explore Photography */}
          <Link
            to="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-md border border-champagne/40"
          >
            <span>EXPLORE PHOTOGRAPHY</span>
          </Link>
        </div>
      </div>
    </div>
  )
})

export default function Hero() {
  const { heroSlides: dynamicSlides } = useWebsiteData()
  const heroSlides = (Array.isArray(dynamicSlides) && dynamicSlides.length > 0) ? dynamicSlides : staticHeroSlides
  const [[page, direction], setPage] = useState([0, 0])
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const safeCurrent = (page < heroSlides.length && page >= 0) ? page : 0
  const slide = heroSlides[safeCurrent] || heroSlides[0] || {}

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => {
      let nextPage = prevPage + newDirection
      if (nextPage < 0) nextPage = heroSlides.length - 1
      if (nextPage >= heroSlides.length) nextPage = 0
      return [nextPage, newDirection]
    })
  }, [heroSlides.length])

  const nextSlide = useCallback(() => paginate(1), [paginate])
  const prevSlide = useCallback(() => paginate(-1), [paginate])

  // Preload next and previous slide images for instant, buttery-smooth sliding
  useEffect(() => {
    const nextIdx = (safeCurrent + 1) % heroSlides.length
    const prevIdx = (safeCurrent - 1 + heroSlides.length) % heroSlides.length
    ;[safeCurrent, nextIdx, prevIdx].forEach((idx) => {
      const s = heroSlides[idx]
      if (s?.image) {
        const img = new Image()
        img.src = getOptimizedCloudinaryUrl(s.image, { width: 1920, quality: 'auto', format: 'auto' })
      }
    })
  }, [safeCurrent, heroSlides])

  // Continuous automatic horizontal slideshow loop
  useEffect(() => {
    if (heroSlides.length <= 1) return
    const timer = setInterval(() => {
      nextSlide()
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [nextSlide, heroSlides.length])

  // Mobile Touch Swipe Handling (Strictly horizontal to never interrupt vertical scrolling)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY

    // Only swipe if horizontal movement is significantly greater than vertical movement
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const optimizedSlideUrl = getOptimizedCloudinaryUrl(slide.image, {
    width: 1920,
    quality: 'auto',
    format: 'auto',
  })

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden select-none bg-[#140E0A]"
      aria-label="Hero Showcase Carousel Slideshow"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Horizontal Sliding Image Reel (100% Solid - Zero Ghosting / Zero Double-Exposure) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#140E0A]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id || `slide-${safeCurrent}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          >
            <img
              src={optimizedSlideUrl}
              alt={slide.alt || slide.title || 'Josh Photography showcase'}
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
              style={{
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Luxury Cinematic Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(20, 14, 10, 0.44) 0%, rgba(20, 14, 10, 0.20) 40%, rgba(15, 10, 8, 0.82) 100%)',
        }}
      />

      {/* Manual Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center bg-black/40 hover:bg-black/70 text-ivory/80 hover:text-champagne border border-champagne/30 hover:border-champagne backdrop-blur-md transition-all duration-300 shadow-luxury group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center bg-black/40 hover:bg-black/70 text-ivory/80 hover:text-champagne border border-champagne/30 hover:border-champagne backdrop-blur-md transition-all duration-300 shadow-luxury group"
      >
        <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Permanently Static Hero Content (Never re-renders or changes on slide switch) */}
      <StaticHeroContent />

      {/* Decorative Corner Accents */}
      <div className="hidden md:block absolute top-8 left-8 w-16 h-16 border-l border-t border-ivory/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute top-8 right-8 w-16 h-16 border-r border-t border-ivory/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute bottom-8 left-8 w-16 h-16 border-l border-b border-ivory/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute bottom-8 right-8 w-16 h-16 border-r border-b border-ivory/20 pointer-events-none z-10" />
    </section>
  )
}
