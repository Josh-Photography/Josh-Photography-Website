import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Cake, Sparkles } from 'lucide-react'

const birthdayStages = [
  {
    num: '01',
    title: 'Preparation & Details',
    desc: 'The bespoke balloon arch, dessert table, personalized banners, floral arrangements, and dressing up the birthday star.',
    img: '/images/birthday-cake-celebration.png',
  },
  {
    num: '02',
    title: 'The Arrivals & Welcomes',
    desc: 'Grandparents arriving with blessings, excited hugs at the doorway, and children discovering the wonderland venue.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
  },
  {
    num: '03',
    title: 'Games & Entertainment',
    desc: 'Unbridled laughter during musical chairs, magic shows, bouncy castles, and friendly dance competitions.',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
  },
  {
    num: '04',
    title: 'The Cake Cutting Moment',
    desc: 'The golden sparkler candles, the full room singing in chorus, confetti showers, and the sweet first bite.',
    img: '/images/birthday_01.png',
  },
  {
    num: '05',
    title: 'Family & Generational Love',
    desc: 'Three generations united: grandparents feeding the little one, parents kissing cheeks, and proud siblings.',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  },
  {
    num: '06',
    title: 'Flattering Group Portraits',
    desc: 'Well-composed, beautifully lit group photographs with family, cousins, and friends before energy fades.',
    img: '/images/birthday-img-6.jpg',
  },
  {
    num: '07',
    title: 'Unscripted Candids',
    desc: 'Cousins whispering secrets in a corner, messy frosting-covered hands, and spontaneous belly laughs.',
    img: '/images/birthday-img-4.jpg',
  },
  {
    num: '08',
    title: 'The Final Frame',
    desc: 'Unwrapping heartfelt gifts, goodbye embraces, and the sweet exhausted smile of a child tucked into bed.',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
  },
]

export default function BirthdayStorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-ivory border-b border-[#D8B77A]/25"
      aria-label="Birthday Storytelling"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-caption uppercase tracking-[0.25em] text-muted-gold font-nav font-semibold block mb-3"
          >
            04 — CELEBRATIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-light tracking-wide mb-5 leading-tight"
          >
            Every Birthday Has A Story
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
            We don't only photograph the cake cutting. We capture the complete celebration — from the morning decor setup to the last sleepy smile.
          </motion.p>
        </div>

        {/* 8-Stage Visual Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {birthdayStages.map((stage, idx) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.08 + 0.2, duration: 0.6 }}
              className="bg-[#F5EEE3]/60 border border-champagne/50 hover:border-muted-gold transition-all duration-400 group flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-beige">
                <img
                  src={stage.img}
                  alt={stage.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="font-serif text-2xl text-muted-gold/50 group-hover:text-muted-gold transition-colors duration-300 block mb-1">
                  {stage.num}
                </span>
                <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-muted-gold transition-colors duration-300">
                  {stage.title}
                </h3>
                <p className="text-warm-brown/80 text-xs font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/birthday-photography"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light transition-all duration-300 shadow-sm border border-champagne/40"
          >
            <span>Explore Complete Birthday Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
