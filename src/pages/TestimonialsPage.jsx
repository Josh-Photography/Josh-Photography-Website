import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Quote, Sparkles, Heart, MessageSquare, ArrowRight, Calendar, CheckCircle2 } from 'lucide-react'
import { testimonials as fallbackTestimonials } from '../data/testimonials'
import { useWebsiteData } from '../hooks/useWebsiteData'

const additionalTestimonials = [
  {
    id: 7,
    name: 'Harrison & Victoria',
    event: 'Countryside Manor Wedding',
    location: 'Cotswolds Estate, UK',
    rating: 5,
    review:
      'From our morning preparations to the candlelight sparkler exit, Josh captured every fleeting glance and emotion with sheer editorial mastery. The gallery brought our entire family to tears.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    date: 'Autumn Celebration',
  },
  {
    id: 8,
    name: 'Siddharth & Priya',
    event: 'Grand Engagement & Sangeet',
    location: 'London Luxury Venue',
    rating: 5,
    review:
      'We wanted energetic documentary coverage for our celebrations without intrusive lights or posing. Josh and the team were discreet, punctual, and delivered photos that exceeded all our expectations.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    date: 'Summer Jubilee',
  },
  {
    id: 9,
    name: 'Dr. Rebecca & Marcus',
    event: 'University Graduation & Family Feast',
    location: 'Oxfordshire, UK',
    rating: 5,
    review:
      'An exceptional eye for natural composition and genuine warmth. Graduating with my doctorate was a monumental family milestone, and the heirloom prints we received are priceless.',
    image: '/images/graduation-ceremony-regalia.jpg',
    date: 'Spring Milestone',
  },
]

const fallbackAll = fallbackTestimonials

export default function TestimonialsPage() {
  const { testimonials: dynamicTestimonials } = useWebsiteData()
  const filteredTestimonials = (dynamicTestimonials && dynamicTestimonials.length > 0)
    ? dynamicTestimonials
    : fallbackAll

  return (
    <div className="bg-[#F8F3EA] min-h-screen">
      {/* ── 1. Luxury Dark Hero Section ── */}
      <header
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-center border-b border-[#D8B77A]/35"
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
            className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-[#E5BA78] font-sans font-semibold mb-3.5 drop-shadow-[0_1px_8px_rgba(229,186,120,0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA78]" />
            <span>KIND WORDS & HEIRLOOM MEMORIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#FAF4EA] font-light tracking-wide mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] leading-[1.12]"
          >
            Client Testimonials
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
            className="text-[#FAF4EA]/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] mb-8"
          >
            Real stories, heartfelt words, and timeless memories shared by the couples and families who have welcomed us into their sacred celebrations across the United Kingdom.
          </motion.p>

          {/* Social Proof Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[#FAF4EA]/80 font-nav text-xs tracking-wider uppercase"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-[#E5BA78]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5BA78] stroke-none" />
                ))}
              </div>
              <span className="font-semibold text-[#FAF4EA]">5.0 / 5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E5BA78]" />
              <span>100% Genuine Client Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E5BA78]" />
              <span>250+ Celebrations Documented</span>
            </div>
          </motion.div>
        </div>
      </header>


      {/* ── 3. Testimonials Grid ── */}
      <main className="py-20 lg:py-28 max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredTestimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-[#FAF6EE] border border-[#D8B77A]/45 p-8 sm:p-9 flex flex-col justify-between shadow-[0_8px_24px_rgba(41,37,34,0.04)] hover:shadow-[0_16px_36px_rgba(41,37,34,0.08)] hover:border-[#B9975B] transition-all duration-300 group rounded-sm"
            >
              <div>
                {/* Top: Quote Icon & 5 Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#B9975B]/15 text-[#B9975B] flex items-center justify-center group-hover:bg-[#B9975B] group-hover:text-[#1A1715] transition-colors duration-300">
                    <Quote className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex items-center gap-1 text-[#B9975B]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B9975B] stroke-none" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-serif text-lg sm:text-[1.18rem] text-[#292522]/90 leading-relaxed font-light italic mb-8">
                  "{item.review}"
                </p>
              </div>

              {/* Author & Event Info */}
              <div className="pt-6 border-t border-[#D8B77A]/30 flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D8B77A]/60 flex-shrink-0 shadow-sm"
                  />
                )}
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#292522] leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-[12px] font-nav uppercase tracking-[0.14em] text-[#B9975B] font-semibold block mt-0.5">
                    {item.event}
                  </span>
                  {item.location && (
                    <span className="text-[12px] text-[#51443A]/70 font-light block">
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* ── 4. Booking Call-To-Action Banner ── */}
      <section className="py-20 lg:py-24 bg-[#F5EEE3] border-t border-[#D8B77A]/40 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.25em] text-[#B9975B] font-sans font-semibold block mb-3 text-xs sm:text-sm">
            YOUR STORY DESERVES THE SAME REVERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#292522] font-light leading-snug mb-5">
            Ready to Begin Your Storyboard?
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-6" />
          <p className="text-[#51443A]/85 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-9">
            Let us document your celebration with unhurried grace, true colors, and timeless emotional authenticity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all duration-300 shadow-sm rounded-sm"
            >
              <span>Check Availability</span>
              <Calendar className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#292522] text-[#292522] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#292522] hover:text-[#FAF6EE] transition-all duration-300 rounded-sm"
            >
              <span>Contact Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
