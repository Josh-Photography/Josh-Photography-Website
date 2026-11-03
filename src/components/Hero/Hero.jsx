import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'
import { heroSlides as staticHeroSlides } from '../../data/stories'
import { useWebsiteData } from '../../hooks/useWebsiteData'
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary'

const SLIDE_DURATION = 5500 // 5.5 seconds per slide for a calm, luxury rhythm

export default function Hero() {
  const { heroSlides: dynamicSlides, settings = {} } = useWebsiteData()
  const heroSlides = (Array.isArray(dynamicSlides) && dynamicSlides.length > 0) ? dynamicSlides : staticHeroSlides
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)

  const safeCurrent = (current < heroSlides.length && current >= 0) ? current : 0
  const slide = heroSlides[safeCurrent] || heroSlides[0] || {}

  // Preload all slideshow images with optimized dimensions
  useEffect(() => {
    heroSlides.forEach((s) => {
      if (s && s.image) {
        const img = new Image()
        img.src = getOptimizedCloudinaryUrl(s.image, { width: 1920, quality: 'auto', format: 'auto' })
      }
    })
  }, [heroSlides])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [heroSlides.length])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [heroSlides.length])

  // Continuous automatic slideshow loop
  useEffect(() => {
    if (heroSlides.length <= 1) return
    const timer = setInterval(() => {
      nextSlide()
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [nextSlide, heroSlides.length])

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX.current - touchEndX
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    touchStartX.current = null
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
      aria-label="Hero Showcase Automatic Slideshow"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with Hardware-Accelerated Crossfade (Eliminates Safari Ghosting) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#140E0A]">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id || `slide-${safeCurrent}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'opacity',
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
            'linear-gradient(180deg, rgba(20, 14, 10, 0.38) 0%, rgba(20, 14, 10, 0.15) 40%, rgba(15, 10, 8, 0.72) 100%)',
        }}
      />

      {/* Manual Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center bg-black/35 hover:bg-black/60 text-ivory/80 hover:text-champagne border border-champagne/30 hover:border-champagne backdrop-blur-md transition-all duration-300 shadow-luxury group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center bg-black/35 hover:bg-black/60 text-ivory/80 hover:text-champagne border border-champagne/30 hover:border-champagne backdrop-blur-md transition-all duration-300 shadow-luxury group"
      >
        <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Main Content Area - Fast, seamless transition without blank gaps */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`content-${slide.id || safeCurrent}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-4xl mx-auto px-2 sm:px-4 pointer-events-auto"
          >
            {/* Category / Badge */}
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 sm:mb-6 rounded-full bg-deep-charcoal/70 backdrop-blur-md border border-champagne/40 text-champagne text-[11px] sm:text-xs font-nav font-semibold tracking-[0.22em] uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                <span>{slide.badge}</span>
              </div>
            )}

            {/* Decorative Gold Accent Line */}
            <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-4 sm:mb-6" />

            {/* Slide Title */}
            <h1 className="font-serif text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-wide leading-[1.18] mb-3 sm:mb-5 max-w-3xl mx-auto break-words drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-ivory/95 tracking-[0.14em] sm:tracking-[0.2em] uppercase font-light mb-6 sm:mb-9 max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              {slide.subtitle}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
              <Link
                to={slide.primaryButtonLink || settings.ctaButtonLink || settings.bookingButtonLink || '/check-availability'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-md border border-champagne/40"
              >
                <span>{slide.primaryButtonText || settings.ctaButtonText || settings.bookingButtonText || 'Check Date Availability'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.explorePath || '/portfolio'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-ivory/80 text-ivory font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-ivory/20 hover:border-ivory transition-all duration-300 backdrop-blur-sm"
              >
                {slide.exploreText || 'Explore Photography'}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-20 text-ivory/50">
        <span className="text-[8px] uppercase tracking-[0.25em] font-nav font-medium">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-4 bg-gradient-to-b from-[#D8B77A] to-transparent animate-pulse" />
      </div>

      {/* Decorative Corner Accents */}
      <div className="hidden md:block absolute top-8 left-8 w-16 h-16 border-l border-t border-ivory/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute top-8 right-8 w-16 h-16 border-r border-t border-ivory/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute bottom-8 left-8 w-16 h-16 border-l border-b border-ivory/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute bottom-8 right-8 w-16 h-16 border-r border-b border-ivory/20 pointer-events-none z-10" />
    </section>
  )
}
