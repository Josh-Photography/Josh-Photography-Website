import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { getCategoryBySlug } from '../data/categoriesData'
import { PhotographyCard } from '../components/common/PhotographyCard'
import ImageLightbox from '../components/common/ImageLightbox'
import { useWebsiteData } from '../hooks/useWebsiteData'

export default function BirthdayPhotography() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { getCategoryCards, data, studio = {} } = useWebsiteData()
  const rawNumber = studio.whatsapp || siteConfig.whatsapp
  const cleanWhatsapp = String(rawNumber).replace(/[^0-9]/g, '')
  const studioName = studio.name || siteConfig.studioName
  const categoryData = getCategoryBySlug('birthdays')
  const dynamicCards = getCategoryCards ? getCategoryCards('birthdays') : []
  const hasLoadedData = Boolean(data && Array.isArray(data.photos) && data.photos.length > 0)
  const cards = (dynamicCards && (dynamicCards.length > 0 || hasLoadedData)) ? dynamicCards : (categoryData?.cards || [])

  const lightboxImages = cards.map((c, i) => ({
    id: `birthday-${c.id || i}`,
    src: c.image || c.src,
    srcLarge: c.srcLarge || c.image || c.src,
    title: `${c.num || String(i + 1).padStart(2, '0')} — ${c.title}`,
    alt: c.alt || c.title,
    event: c.desc || '',
  }))

  const features = [
    'Complete coverage of venue styling, balloon installations, and custom dessert stations',
    'Artisanal cake cutting, candle blowing, and confetti moments captured from multiple angles',
    'Patient, natural interaction direction tailored to young children and energetic toddler parties',
    'Flattering multi-generational family group portraits with parents, grandparents, and cousins',
    'Unobtrusive documentary style capturing unscripted laughter, hugs, and celebration games',
    'Fast-turnaround preview gallery delivered within 48 hours for immediate social sharing',
  ]

  return (
    <div className="bg-[#F8F3EA]">
      {/* ── Hero Banner ── */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/birthday_01.png"
            alt="Joyful birthday celebration with colorful confetti and happy party atmosphere"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(28, 15, 8, 0.40) 0%, rgba(28, 15, 8, 0.25) 45%, rgba(20, 12, 7, 0.72) 100%)',
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 text-center px-6 pt-32 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-1.5 border border-[#D8B77A]/40 text-[#D8B77A] font-nav text-xs uppercase tracking-[0.25em] mb-6 backdrop-blur-sm bg-black/30 rounded-full"
          >
            02 — Joyful Milestones
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#F8F3EA] font-light tracking-wide max-w-5xl mx-auto mb-6 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            Birthday Celebrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#F8F3EA]/90 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          >
            From milestone first-year cake smashes and colorful balloon wonderlands to distinguished adult jubilees, we document every smile and candid laugh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/check-availability?type=birthday"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40"
            >
              Reserve Birthday Date
            </Link>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                `Hi ${studioName}, I would like to inquire about booking birthday photography.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-[#F8F3EA]/80 text-[#F8F3EA] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#F8F3EA]/15 transition-all duration-300 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Editorial Birthday Philosophy ── */}
      <section className="section-padding bg-[#F5EEE3]/80 border-b border-[#D8B77A]/25">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-3">
                01 — THE CELEBRATION STORY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#292522] font-light leading-tight mb-6">
                Capturing Pure Wonder & Milestone Joy
              </h2>
              <p className="text-[#51443A]/85 text-body-md leading-relaxed mb-5 font-light">
                Too often, party photography focuses strictly on the cake. We believe birthdays are rich with little stories: the nervous anticipation while dressing up, the awe in a child's eyes when seeing the balloon arch, the secret laughter between best friends, and the warm embraces of relatives.
              </p>
              <p className="text-[#51443A]/85 text-body-md leading-relaxed mb-8 font-light">
                Whether hosting an intimate family garden tea or a grand 50th milestone dinner, our photographers ensure every candid reaction and heirloom group portrait is preserved with luminous quality.
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
                  src="/images/birthday-cake-celebration.png"
                  alt="Artisanal floral birthday cake with sparklers and macarons"
                  className="w-full h-[520px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 z-20 bg-[#FAF6EE] p-6 shadow-luxury max-w-xs border border-[#D8B77A]/60 hidden sm:block">
                <p className="font-serif italic text-base text-[#292522] mb-2 leading-relaxed">
                  "Josh captured the pure spirit of our son's party. Looking at the photos brings all that joy right back."
                </p>
                <p className="text-caption text-[#B9975B] uppercase tracking-widest font-nav font-semibold">
                  Emily & James — Birthday Clients
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
              Unscripted Laughter, Sweet Details & Milestones
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
            Book Your Birthday Celebration
          </h3>
          <p className="text-[#51443A]/85 text-sm sm:text-base font-light mb-8 leading-relaxed">
            From children’s themed parties to milestone adult jubilees, secure your date on our calendar today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability?type=birthday"
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
