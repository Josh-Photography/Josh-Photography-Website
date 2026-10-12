import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { getCategoryBySlug } from '../../data/categoriesData'
import { PhotographyCard } from './PhotographyCard'
import ImageLightbox from './ImageLightbox'

export default function CategoryTemplate({
  categoryId,
  badge,
  title,
  tagline,
  description = [],
  chapters = [],
  features = [],
  quote,
  quoteImage,
}) {
  const [selectedImage, setSelectedImage] = useState(null)

  // Retrieve rich card data from categoriesData
  const categoryData = getCategoryBySlug(categoryId)
  const categoryCards = categoryData?.cards || []

  const heroImg = categoryData?.heroImage || quoteImage || '/images/hero-church-wedding.jpg'

  const lightboxImages = categoryCards.map((c, i) => ({
    id: `${categoryId}-${i}`,
    src: c.image,
    srcLarge: c.image,
    title: `${c.num} — ${c.title}`,
    alt: c.alt,
    event: c.desc,
  }))

  return (
    <div className="bg-[#F8F3EA]">
      {/* ── Hero Banner ── */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt={title || categoryData?.name}
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
            {badge || categoryData?.heroBadge || 'Luxury Photography'}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#F8F3EA] font-light tracking-wide max-w-5xl mx-auto mb-6 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {title || categoryData?.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#F8F3EA]/90 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          >
            {tagline || categoryData?.headline || categoryData?.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to={`/check-availability?type=${categoryId}`}
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40"
            >
              Reserve A Date
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                `Hi ${siteConfig.studioName}, I would like to inquire about ${title || categoryData?.name}.`
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

      {/* ── Editorial Story & Philosophy ── */}
      <section className="section-padding bg-[#F5EEE3]/80 border-b border-[#D8B77A]/25">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-3">
                01 — THE APPROACH
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#292522] font-light leading-tight mb-6">
                Artistic Vision & Thoughtful Composition
              </h2>

              <div className="space-y-4 mb-8">
                {description.length > 0 ? (
                  description.map((para, i) => (
                    <p key={i} className="text-[#51443A]/85 text-body-md leading-relaxed font-light">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-[#51443A]/85 text-body-md leading-relaxed font-light">
                    {categoryData?.description}
                  </p>
                )}
              </div>

              {features.length > 0 && (
                <div className="space-y-3.5 pt-2 border-t border-[#D8B77A]/25">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D8B77A]/30 flex items-center justify-center mt-0.5 text-[#B9975B] flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[#292522]/85 text-body-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative z-10 overflow-hidden shadow-luxury border-4 border-[#F8F3EA]">
                <img
                  src={quoteImage || categoryCards[1]?.image || heroImg}
                  alt={title}
                  className="w-full h-[520px] object-cover"
                />
              </div>

              {quote && (
                <div className="absolute -bottom-6 -left-6 z-20 bg-[#FAF6EE] p-6 shadow-luxury max-w-xs border border-[#D8B77A]/60 hidden sm:block">
                  <p className="font-serif italic text-base text-[#292522] mb-2 leading-relaxed">
                    "{quote.text}"
                  </p>
                  <p className="text-caption text-[#B9975B] uppercase tracking-widest font-nav font-semibold">
                    {quote.author}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── The 3-Column Photography Cards Grid (Reference Image Layout) ── */}
      {categoryCards.length > 0 && (
        <section className="section-padding bg-[#F8F3EA]">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-caption uppercase tracking-[0.25em] text-[#B9975B] font-nav font-semibold block mb-3">
                {categoryData?.heroBadge || '02 — THE COMPLETE JOURNEY'}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#292522] font-light">
                {categoryData?.headline || `${title} Showcase`}
              </h2>
              <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mt-4 mb-4" />
              <p className="text-[#51443A]/80 text-sm sm:text-base font-light">
                {categoryData?.subheadline ||
                  'We chronicle every chapter of your celebration with reverence, artistry, and authentic presence.'}
              </p>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
              {categoryCards.map((card, idx) => (
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
      )}

      {/* ── Experience / Process (if chapters provided) ── */}
      {chapters.length > 0 && (
        <section className="py-16 bg-[#F5EEE3]/60 border-t border-[#D8B77A]/25">
          <div className="container-luxury">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-sans font-semibold block mb-2">
                The Experience
              </span>
              <h2 className="font-serif text-2xl md:text-4xl text-[#292522] font-light">
                What You Can Expect
              </h2>
              <div className="w-12 h-[1px] bg-[#D8B77A] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF6EE] p-6 sm:p-7 border border-[#D8B77A]/50 hover:border-[#B9975B] transition-all duration-300 group"
                >
                  <span className="font-serif text-3xl text-[#B9975B]/50 group-hover:text-[#B9975B] transition-colors duration-300 block mb-3">
                    {ch.step || `0${idx + 1}`}
                  </span>
                  <h3 className="font-serif text-lg text-[#292522] mb-2 group-hover:text-[#9E7D42] transition-colors duration-300">
                    {ch.title}
                  </h3>
                  <p className="text-[#51443A]/80 text-xs sm:text-sm leading-relaxed font-light">
                    {ch.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Booking Banner ── */}
      <section className="py-16 bg-[#FAF6EE] border-t border-[#D8B77A]/35 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#292522] font-light mb-4">
            Begin Your Photography Journey
          </h3>
          <p className="text-[#51443A]/85 text-sm font-light mb-6">
            Inquire today to discuss dates, location commissions, and bespoke packages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={`/check-availability?type=${categoryId}`}
              className="px-8 py-3 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all duration-300 shadow-sm"
            >
              Check Availability
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3 border border-[#292522] text-[#292522] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#292522] hover:text-[#FAF6EE] transition-all duration-300"
            >
              All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox for zooming photos */}
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
