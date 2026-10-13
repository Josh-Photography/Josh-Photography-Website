import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats as fallbackStats } from '../../data/stories'
import { siteConfig } from '../../data/siteConfig'
import { useWebsiteData } from '../../hooks/useWebsiteData'

export default function BrandStory() {
  const { studio = {}, about = {} } = useWebsiteData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const liveStats = (Array.isArray(about.stats) && about.stats.length > 0) ? about.stats : fallbackStats
  const description = studio.description || about.storyParagraph1 || siteConfig.fullDescription

  return (
    <section ref={ref} className="section-padding bg-ivory" aria-label="Brand Story">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-section-label"
            >
              {about.storyBadge || 'Our Philosophy'}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-section-title mb-6"
            >
              {studio.tagline ? (
                <span>{studio.tagline}</span>
              ) : (
                <>More Than <em className="italic text-gold-dark">Photographs</em></>
              )}
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '4rem' } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="gold-line mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-body-lg text-warm-brown/80 font-light leading-[1.9] mb-6"
            >
              {description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-body-md text-warm-brown/60 font-light leading-relaxed mb-10"
            >
              {about.storyParagraph2 || 'Every celebration has a story. We are here to make sure yours is told beautifully, authentically, and with the artistry it deserves.'}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {liveStats.map((stat, index) => (
                <div key={stat.label || index} className="text-center lg:text-left">
                  <div className="font-serif text-display-sm text-charcoal mb-1">
                    {stat.value}
                  </div>
                  <div className="text-caption uppercase tracking-[0.15em] text-warm-brown/50 font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Grid */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="image-reveal aspect-[3/4] overflow-hidden">
                <img
                  src="/images/church-wedding-ceremony.jpg"
                  alt="Traditional British church wedding ceremony at the altar by Josh Photography"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Secondary Image (Overlapping) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="absolute -bottom-8 -left-8 w-48 h-64 shadow-luxury-lg border-4 border-ivory hidden md:block"
              >
                <div className="image-reveal w-full h-full overflow-hidden">
                  <img
                    src="/images/church-wedding-altar.jpg"
                    alt="Bride and groom at the sacred church altar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Gold accent */}
              <div className="hidden md:block absolute -top-4 -right-4 w-full h-full border border-gold/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
