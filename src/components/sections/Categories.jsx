import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { eventCategories } from '../../data/events'

const displayCategories = eventCategories.slice(0, 6)

export default function Categories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-cream" aria-label="Photography Categories">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-section-label"
          >
            What We Capture
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-section-title mb-4"
          >
            Every Celebration Has a Story
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
            From sacred wedding ceremonies to joyful birthday parties — we bring the same
            artistry and passion to every event we photograph.
          </motion.p>
        </div>

        {/* Category Grid — Clean Uniform 3-Column Luxury Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.7 }}
              className="h-full"
            >
              <Link
                to={category.path}
                className="group relative block overflow-hidden border border-[#D8B77A]/40 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
              >
                <div className="relative overflow-hidden aspect-[4/3] w-full">
                  {/* Image */}
                  <img
                    src={category.heroImage}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-luxury group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent transition-all duration-500 group-hover:from-deep-black/90" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/80 font-sans mb-2 block">
                          {category.subcategories.length} specialties
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl font-light text-ivory tracking-wide">
                          {category.title}
                        </h3>
                        <p className="text-[0.8rem] text-ivory/50 mt-1 font-light max-w-xs line-clamp-2 hidden md:block">
                          {category.tagline}
                        </p>
                      </div>
                      <div className="w-10 h-10 border border-ivory/30 flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10">
                        <ArrowUpRight className="w-4 h-4 text-ivory/70 transition-all duration-500 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-center mt-12"
        >
          <Link to="/portfolio" className="btn-ghost group">
            View All Categories
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
