import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { WhatsAppIcon } from '../common/Icons'

export default function BookingCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden" aria-label="Book Now">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1920&q=85"
          alt="Emotional wedding celebration moments under ambient lighting"
          className="w-full h-full object-cover scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(26, 23, 21, 0.70) 0%, rgba(41, 37, 34, 0.85) 50%, rgba(26, 23, 21, 0.90) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-caption uppercase tracking-[0.25em] text-champagne font-nav font-semibold block mb-4"
        >
          06 — YOUR STORY
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-wide mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          Your Story Deserves To Be Remembered.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-ivory/85 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        >
          Every celebration is fleeting, but the photographs become family heirlooms for generations. Let us craft an unrepeatable visual chronicle of your most meaningful moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/check-availability"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-champagne/40"
          >
            <Calendar className="w-4 h-4" />
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              `Hi ${siteConfig.studioName}, I would like to check availability for our upcoming celebration.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-ivory/80 text-ivory font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-ivory/15 hover:border-ivory transition-all duration-300 backdrop-blur-sm"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>WhatsApp Us</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
