import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, FacebookIcon } from '../common/Icons'
import { siteConfig } from '../../data/siteConfig'
import { galleryImages } from '../../data/gallery'

export default function SocialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Pick 6 random images for "social feed"
  const socialImages = galleryImages.filter(img => img.featured).concat(galleryImages.slice(0, 6)).slice(0, 6)

  return (
    <section ref={ref} className="section-padding bg-ivory" aria-label="Social Media">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-section-label"
          >
            Follow Along
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-section-title mb-4"
          >
            Follow The Stories
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '4rem' } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="gold-line-center mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-section-subtitle mx-auto"
          >
            Go behind the scenes, see our latest work, and join our creative journey.
          </motion.p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-10">
          {socialImages.map((img, index) => (
            <motion.a
              key={img.id}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * index + 0.3, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/50 transition-all duration-500 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-ivory opacity-0 group-hover:opacity-100 transition-all duration-400 scale-75 group-hover:scale-100" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex items-center justify-center gap-6"
        >
          {siteConfig.social.instagram && (
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-body-sm text-warm-brown/60 hover:text-gold transition-colors duration-300"
            >
              <InstagramIcon className="w-5 h-5" />
              Instagram
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {siteConfig.social.youtube && (
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-body-sm text-warm-brown/60 hover:text-gold transition-colors duration-300"
            >
              YouTube
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {siteConfig.social.facebook && (
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-body-sm text-warm-brown/60 hover:text-gold transition-colors duration-300"
            >
              Facebook
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
