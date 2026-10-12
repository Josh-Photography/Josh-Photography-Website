import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { getCategoryBySlug } from '../data/categoriesData'
import { PhotographyCard } from '../components/common/PhotographyCard'
import ImageLightbox from '../components/common/ImageLightbox'

export default function Weddings() {
  const [selectedImage, setSelectedImage] = useState(null)
  const categoryData = getCategoryBySlug('weddings')
  const cards = categoryData?.cards || []

  const lightboxImages = cards.map((c, i) => ({
    id: `wedding-${i}`,
    src: c.image,
    srcLarge: c.image,
    title: `${c.num} — ${c.title}`,
    alt: c.alt,
    event: c.desc,
  }))

  const highlights = [
    'Unobtrusive candid storytelling capturing real, unposed tears, laughter, and authentic emotion',
    'Specialized expertise in traditional church ceremonies and historic countryside weddings',
    'Custom color grading calibrated for delicate lace, fine tailoring, and natural skin tones',
    'Dual-angle coverage ensuring no sacred exchange or emotional glance is overlooked',
    'Teaser preview gallery of 25–30 hand-graded photographs delivered within 48 to 72 hours',
    'Handcrafted fine-art heirloom albums bound with archival European materials',
  ]

  return (
    <div className="bg-[#F8F3EA]">
      {/* ── Hero Banner ── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-church-wedding.jpg"
            alt="Traditional British church wedding ceremony with bride in white gown and groom at the altar"
            className="w-full h-full object-cover object-center scale-105 animate-ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(28, 22, 18, 0.40) 0%, rgba(28, 22, 18, 0.25) 45%, rgba(22, 16, 13, 0.75) 100%)',
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 text-center px-6 pt-32 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-1.5 border border-[#D8B77A]/40 text-[#D8B77A] font-nav text-xs uppercase tracking-[0.25em] mb-6 backdrop-blur-sm bg-black/25 rounded-full"
          >
            Luxury Wedding Photography
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#F8F3EA] font-light tracking-wide max-w-5xl mx-auto mb-6 leading-[1.08] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            Where Forever Begins
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#F8F3EA]/90 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            Every wedding is an unrepeatable tapestry of sacred traditions and quiet emotions — from church ceremonies and cathedral aisles to historic countryside manor celebrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/check-availability?type=wedding"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40"
            >
              Check Wedding Dates
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                `Hi ${siteConfig.studioName}, I would like to check availability for our wedding photography.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-[#F8F3EA]/80 text-[#F8F3EA] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#F8F3EA]/15 transition-all duration-300 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#F8F3EA]/70 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-nav">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-7 bg-gradient-to-b from-[#D8B77A] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Editorial Wedding Story & Philosophy ── */}
      <section className="section-padding bg-[#F5EEE3]/80 border-b border-[#D8B77A]/25">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-3">
                01 — THE WEDDING PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#292522] font-light leading-tight mb-6">
                Capturing the Sacred, the Unplanned, and the Unforgettable
              </h2>
              <p className="text-[#51443A]/85 text-body-md leading-relaxed mb-5 font-light">
                We believe that the most powerful wedding photographs are never orchestrated. They live in the quiet breath before the church doors open, the tremor in a father's voice during his toast, the radiant smile after sacred vows, and the unspoken glance exchanged across a crowded room.
              </p>
              <p className="text-[#51443A]/85 text-body-md leading-relaxed mb-8 font-light">
                With a blend of editorial elegance and sensitive photojournalism, we document your wedding day as an unfolding story — honoring sacred church traditions and English countryside venues with equal reverence and mastery.
              </p>

              <div className="space-y-3.5">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D8B77A]/30 flex items-center justify-center mt-0.5 text-[#B9975B] flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[#292522]/85 text-body-sm font-light">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 overflow-hidden shadow-luxury border-4 border-[#F8F3EA]">
                <img
                  src="/images/wedding-img-2.png"
                  alt="Bride and groom romantic wedding kiss"
                  className="w-full h-[520px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 z-20 bg-[#FAF6EE] p-6 shadow-luxury max-w-xs border border-[#D8B77A]/60 hidden sm:block">
                <p className="font-serif italic text-base text-[#292522] mb-2 leading-relaxed">
                  "They captured every moment we were too overwhelmed to notice."
                </p>
                <p className="text-caption text-[#B9975B] uppercase tracking-widest font-nav font-semibold">
                  Eleanor & Oliver — Wedding Couple
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-Column Photography Cards Grid (Exact Reference Image Design) ── */}
      <section className="section-padding bg-[#F8F3EA]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-caption uppercase tracking-[0.25em] text-[#B9975B] font-nav font-semibold block mb-3">
              02 — THE COMPLETE JOURNEY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#292522] font-light">
              From Sacred Vows to Timeless Portraits
            </h2>
            <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mt-4 mb-4" />
            <p className="text-[#51443A]/80 text-sm sm:text-base font-light">
              We chronicle every chapter of your celebration with reverence, artistry, and authentic presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {cards.map((card, idx) => (
              <PhotographyCard
                key={card.num || idx}
                num={card.num}
                title={card.title}
                desc={card.desc}
                image={card.image}
                alt={card.alt}
                onImageClick={() => setSelectedImage(lightboxImages[idx])}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wedding Booking Banner ── */}
      <section className="py-20 bg-[#FAF6EE] border-t border-[#D8B77A]/35 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-3">
            03 — COMMISSION YOUR DATE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] font-light mb-4">
            Are We Available For Your Date?
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-5" />
          <p className="text-[#51443A]/85 text-sm sm:text-base font-light mb-8 leading-relaxed">
            We accept a limited number of church and countryside wedding commissions each season to ensure uncompromising devotion to every couple.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability?type=wedding"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all duration-300 shadow-sm"
            >
              Check Availability
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3.5 border border-[#292522] text-[#292522] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#292522] hover:text-[#FAF6EE] transition-all duration-300"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          images={lightboxImages}
          onClose={() => setSelectedImage(null)}
          onNavigate={(img) => setSelectedImage(img)}
        />
      )}
    </div>
  )
}
