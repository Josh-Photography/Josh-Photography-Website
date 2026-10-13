import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useWebsiteData } from '../../hooks/useWebsiteData'

const defaultEditorialServices = [
  {
    num: '01',
    title: 'Wedding Photography',
    quote: 'Every ritual, every glance, every unrepeatable emotion.',
    desc: 'Full-day documentary coverage of sacred wedding celebrations. From historic British church ceremonies and cathedral aisles to countryside manor receptions, intimate couple portraits, and authentic family tears of joy.',
    image: '/images/hero-church-wedding.jpg',
    alt: 'Traditional British church wedding ceremony with floral arch at altar',
    path: '/weddings',
    ctaText: 'EXPLORE WEDDING STORIES',
  },
  {
    num: '02',
    title: 'Birthday Celebrations',
    quote: 'Every birthday has a story — far beyond the cake cutting.',
    desc: 'From milestone first birthdays to energetic themed parties, we document the anticipation, bespoke stage decor, joyous games, family embraces, and the quiet moments in between.',
    image: '/images/birthday_01.png',
    alt: 'Joyful birthday celebration with children, glowing candles, balloons, and cake',
    path: '/birthday-photography',
    ctaText: 'EXPLORE BIRTHDAY STORIES',
  },
  {
    num: '03',
    title: 'Maternity Photography',
    quote: 'Carrying life, radiating grace, embracing tomorrow.',
    desc: 'Poetic fine-art portraits celebrating the feminine form, expectant parents, and the sacred anticipation of new life amidst golden hour meadows and elegant studio lighting.',
    image: '/images/maternity-editorial-portrait.jpg',
    alt: 'Editorial fine-art maternity portrait in flowing gown holding baby bump at sunset',
    path: '/maternity',
    ctaText: 'EXPLORE MATERNITY STORIES',
  },
  {
    num: '04',
    title: 'Family Photography',
    quote: 'Generations united in laughter, warmth, and lifelong connection.',
    desc: 'Natural lifestyle portraits celebrating kinship across blooming countryside gardens, sunlit wildflower meadows, and historic estates where genuine affection flourishes without stiff poses.',
    image: '/images/family-photography-img-5.jpg',
    alt: 'Grand estate multigenerational family legacy portrait standing together under ancient trees',
    path: '/family',
    ctaText: 'EXPLORE FAMILY STORIES',
  },
  {
    num: '05',
    title: 'Anniversary Photography',
    quote: 'Honoring years of love, enduring devotion, and a blossoming legacy.',
    desc: 'From intimate first-year milestones to Silver (25th) and Golden (50th) Jubilees, we document enduring companionship, private vow renewals, and the timeless beauty of love that deepens over time.',
    image: '/images/Anniversary-img-2.jpg',
    alt: 'Affectionate couple smiling together in open countryside meadow during golden hour vow renewal',
    path: '/anniversary',
    ctaText: 'EXPLORE ANNIVERSARY STORIES',
  },
]

export default function ServicesSection() {
  const { services } = useWebsiteData()
  const activeServices = (Array.isArray(services) && services.length > 0) ? services : defaultEditorialServices
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-[#F5EEE3]/90 border-y border-[#D8B77A]/25 overflow-hidden"
      aria-label="Editorial Services Showcase"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-12">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-caption uppercase tracking-[0.25em] text-muted-gold font-nav font-semibold block mb-3"
          >
            02 — OUR SERVICES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-light tracking-wide mb-5 leading-tight"
          >
            What We Offer
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '4.5rem' } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-[1.5px] bg-[#D8B77A] mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-warm-brown/85 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Comprehensive photography services tailored to capture every kind of celebration with artistry, emotional depth, and authenticity.
          </motion.p>
        </div>

        {/* Alternating Editorial Showcase Rows — IMAGES > CARDS */}
        <div className="space-y-24 md:space-y-32">
          {activeServices.map((service, index) => {
            const isImageLeft = index % 2 === 0
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${!isImageLeft ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Large Visual Hero Image */}
                <div
                  className={`lg:col-span-7 ${!isImageLeft ? 'lg:order-2' : 'lg:order-1'
                    }`}
                >
                  <Link
                    to={service.path}
                    className="group block relative overflow-hidden aspect-[16/11] bg-beige border border-champagne/50 shadow-luxury"
                  >
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Sophisticated rose-tinted dark hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <span className="text-xs uppercase tracking-[0.2em] text-champagne font-nav font-medium mb-1">
                        {service.num} — {service.title}
                      </span>
                      <p className="font-serif italic text-lg text-ivory/95">{service.quote}</p>
                    </div>
                  </Link>
                </div>

                {/* Editorial Text Content */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${!isImageLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  <span className="font-serif text-5xl sm:text-6xl text-muted-gold/40 font-light block mb-2">
                    {service.num}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-light mb-3 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="font-serif italic text-lg text-muted-gold mb-4 leading-snug">
                    "{service.quote}"
                  </p>
                  <p className="text-warm-brown/85 text-body-md font-light leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  <div>
                    <Link
                      to={service.path}
                      className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] font-nav font-semibold text-charcoal hover:text-muted-gold transition-all duration-300 pb-1 border-b border-charcoal/30 hover:border-muted-gold"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-muted-gold" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-24 pt-12 border-t border-[#D8B77A]/30"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-10 py-4 bg-deep-charcoal text-ivory font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-muted-gold hover:text-deep-black transition-all duration-300 shadow-md"
          >
            <span>View All Services & Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
