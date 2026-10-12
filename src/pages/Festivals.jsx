import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Trees, Flame, Wine, Check } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { getCategoryBySlug } from '../data/categoriesData'
import { PhotographyCard } from '../components/common/PhotographyCard'
import ImageLightbox from '../components/common/ImageLightbox'

export default function Festivals() {
  const [selectedImage, setSelectedImage] = useState(null)
  const categoryData = getCategoryBySlug('festivals')
  const cards = categoryData?.cards || []

  const lightboxImages = cards.map((c, i) => ({
    id: `festival-${i}`,
    src: c.image,
    srcLarge: c.image,
    title: `${c.num} — ${c.title}`,
    alt: c.alt,
    event: c.desc,
  }))

  const features = [
    'Documenting British seasonal celebrations, Christmas market fairs, and illuminated winter squares',
    'Atmospheric natural light captures around crackling firesides, glowing fir trees, and candlelight',
    'Autumn harvest excursions, sprawling pumpkin patch family adventures, and carved lantern evenings',
    'Springtime Easter garden sessions with blooming daffodils, Easter egg hunts, and joyous gatherings',
    'Heirloom fine-art print framing designed for holiday greetings and seasonal keepsake displays',
    'Unobtrusive photojournalism celebrating warmth, family heritage, and authentic community spirit',
  ]

  return (
    <div className="bg-[#F8F3EA] min-h-screen">
      {/* ── Hero Banner ── */}
      <section className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/christmas-festival.jpg"
            alt="Warm glowing British Christmas festival market stalls illuminated by golden lights"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(28, 15, 8, 0.45) 0%, rgba(35, 18, 10, 0.30) 40%, rgba(20, 10, 5, 0.80) 100%)',
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 text-center px-6 pt-32 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 border border-[#E5BA78]/40 text-[#E5BA78] font-nav text-xs uppercase tracking-[0.25em] mb-6 backdrop-blur-md bg-black/35 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA78]" />
            <span>06 — British Heritage & Seasons</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#FAF4EA] font-light tracking-wide max-w-5xl mx-auto mb-6 leading-[1.08] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            Festival & Cultural Celebrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#FAF4EA]/90 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          >
            Vivid seasonal storytelling — from illuminated British Christmas markets and glowing fireside hearths to crisp autumn pumpkin patches and springtime celebrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/check-availability?type=festivals"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40"
            >
              Book Seasonal Session
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                `Hi ${siteConfig.studioName}, I would like to inquire about booking a seasonal festival session.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-[#FAF4EA]/80 text-[#FAF4EA] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#FAF4EA]/15 transition-all duration-300 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Editorial Story & Philosophy ── */}
      <section className="section-padding bg-[#F5EEE3]/80 border-b border-[#D8B77A]/25">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-3">
                01 — THE SEASONAL ATMOSPHERE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#292522] font-light leading-tight mb-6">
                British Seasons, Timeless Traditions & Festive Wonder
              </h2>
              <p className="text-[#51443A]/85 text-body-md leading-relaxed mb-5 font-light">
                There is a unique enchantment to the passing of the seasons across the British countryside and town squares: the aroma of cinnamon and mulled cider at winter Christmas markets, the gentle glow of candlelight on foggy autumn evenings, and the burst of fresh daffodils welcoming springtime.
              </p>
              <p className="text-[#51443A]/85 text-body-md leading-relaxed mb-8 font-light">
                We document these cherished cultural moments with reverence, capturing natural skin tones, ambient candlelight, and genuine family connection without distracting flash.
              </p>

              <div className="space-y-3.5">
                {features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D8B77A]/30 flex items-center justify-center mt-0.5 text-[#B9975B] flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[#292522]/85 text-body-sm font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 overflow-hidden shadow-luxury border-4 border-[#F8F3EA]">
                <img
                  src="/images/halloween-festival.jpg"
                  alt="Carved Jack-o’-Lanterns glowing at dusk on autumn leaves"
                  className="w-full h-[520px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 z-20 bg-[#FAF6EE] p-6 shadow-luxury max-w-xs border border-[#D8B77A]/60 hidden sm:block">
                <p className="font-serif italic text-base text-[#292522] mb-2 leading-relaxed">
                  "Our Christmas portraits felt like something straight out of a fine-art holiday storybook."
                </p>
                <p className="text-caption text-[#B9975B] uppercase tracking-widest font-nav font-semibold">
                  The Sterling Family — Seasonal Session
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-Column Photography Cards Grid (Reference Image Layout) ── */}
      <section className="section-padding bg-[#F8F3EA]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-caption uppercase tracking-[0.25em] text-[#B9975B] font-nav font-semibold block mb-3">
              02 — THE COMPLETE JOURNEY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#292522] font-light">
              Christmas Magic, Autumn Glow & UK Festivities
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

      {/* ── Booking Banner ── */}
      <section className="py-20 bg-[#FAF6EE] border-t border-[#D8B77A]/35 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-serif text-3xl text-[#292522] font-light mb-4">
            Reserve Your Seasonal Session
          </h3>
          <p className="text-[#51443A]/85 text-sm sm:text-base font-light mb-8 leading-relaxed">
            Seasonal holiday mini-sessions and private festival commissions open each autumn and winter. Inquire early to secure your preferred date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability?type=festivals"
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
