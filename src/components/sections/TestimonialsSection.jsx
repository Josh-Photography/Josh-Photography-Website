import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials as fallbackTestimonials } from '../../data/testimonials'
import { useWebsiteData } from '../../hooks/useWebsiteData'

export default function TestimonialsSection() {
  const { testimonials: dynamicTestimonials } = useWebsiteData()
  const testimonials = (Array.isArray(dynamicTestimonials) && dynamicTestimonials.length > 0)
    ? dynamicTestimonials
    : fallbackTestimonials
  const list = testimonials
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Ensure current index is within bounds
  const safeCurrent = current >= testimonials.length ? 0 : current

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, testimonials.length])

  const testimonial = testimonials[safeCurrent] || testimonials[0] || {}

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden border-y border-[#B8864C]/35"
      style={{
        background: `
          radial-gradient(ellipse 95% 65% at 50% -10%, rgba(220, 160, 90, 0.30) 0%, transparent 65%),
          radial-gradient(ellipse 75% 55% at 90% 40%, rgba(195, 130, 65, 0.24) 0%, transparent 60%),
          radial-gradient(ellipse 75% 55% at 10% 65%, rgba(175, 110, 50, 0.22) 0%, transparent 60%),
          linear-gradient(175deg, #1C0F08 0%, #2B170E 22%, #3E2416 45%, #4A2B1A 55%, #351C11 80%, #1A0D07 100%)
        `,
      }}
      aria-label="Testimonials"
    >
      {/* Shining Amber-Bronze Radial Glow Accents */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(235,175,100,0.22),_transparent_70%)] blur-3xl pointer-events-none"
      />
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium mb-4 block"
          >
            Kind Words
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-display-sm md:text-display-md font-serif text-ivory"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '4rem' } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="gold-line-center mt-6"
          />
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id || safeCurrent}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-gold/30 mx-auto mb-8" />

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: Math.max(1, Math.min(5, Number(testimonial.rating) || 5)) }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Review */}
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory/95 font-light leading-snug mb-8 italic max-w-3xl mx-auto">
                "{testimonial.review}"
              </p>

              {/* Divider */}
              <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-6" />

              {/* Author */}
              <h4 className="font-serif text-2xl text-ivory mb-1 tracking-wide">
                — {testimonial.name}
              </h4>
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-nav text-champagne/80">
                <span>{testimonial.event}</span>
                <span>•</span>
                <span>{testimonial.location}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 border border-ivory/20 flex items-center justify-center transition-all duration-400 hover:border-gold hover:text-gold text-ivory/40"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-500 ${
                    index === current
                      ? 'w-6 h-[2px] bg-gold'
                      : 'w-3 h-[2px] bg-ivory/20 hover:bg-ivory/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-ivory/20 flex items-center justify-center transition-all duration-400 hover:border-gold hover:text-gold text-ivory/40"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
