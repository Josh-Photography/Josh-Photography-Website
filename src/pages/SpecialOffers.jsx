import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, Gift } from 'lucide-react'
import { useWebsiteData } from '../hooks/useWebsiteData'
import { siteConfig } from '../data/siteConfig'
import PromotionalBadge, { SpecialOfferSticker } from '../components/common/PromotionalBadge'
import { getCategoryHeroImage } from '../data/offerCategories'

export default function SpecialOffers() {
  const { offers = [], offersSettings = {}, studio = {} } = useWebsiteData()
  const rawNumber = studio.whatsapp || siteConfig.whatsapp
  const cleanWhatsapp = String(rawNumber).replace(/[^0-9]/g, '')
  const studioName = studio.name || siteConfig.studioName

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Special Offers & Seasonal Photography Promotions | Josh Photography'
  }, [])

  // Strict Date, Image, and Publication Enforcement
  const now = new Date()
  const validOffers = useMemo(() => {
    if (offersSettings?.enabled === false) return []
    if (!Array.isArray(offers)) return []

    return offers
      .filter((offer) => {
        // Must be active / published
        if (offer.published === false) return false

        // Must have an image (prevents broken placeholders for shoot types without images yet)
        const targetCat = offer.category || (Array.isArray(offer.categories) && offer.categories[0]) || ''
        const bannerImg = (offer.bannerImage && offer.bannerImage.trim()) || getCategoryHeroImage(targetCat)
        if (!bannerImg) return false

        // Start date check
        if (offer.startDate) {
          const start = new Date(offer.startDate)
          if (!isNaN(start) && now < start) return false
        }

        // End date check
        if (offer.endDate) {
          const end = new Date(offer.endDate.includes('T') ? offer.endDate : `${offer.endDate}T23:59:59`)
          if (!isNaN(end) && now > end) return false
        }

        return true
      })
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
  }, [offers])

  const eyebrow = offersSettings.eyebrow || 'SPECIAL OFFERS & SEASONAL PROMOTIONS'
  const title = offersSettings.title || 'Exclusive Photography Promotions'
  const subtitle =
    offersSettings.subtitle ||
    'Discover our limited-time seasonal collections, featuring generous inclusions, complimentary bespoke upgrades, and priority calendar dates across the United Kingdom.'

  return (
    <div className="bg-[#F8F3EA] min-h-screen">
      {/* ── 1. Compact Luxury Header Banner (Natural Spacing, No Excessive Gap) ── */}
      <section className="relative overflow-hidden bg-[#16120F] text-center pt-28 pb-14 sm:pt-36 sm:pb-16 px-6 border-b border-[#D8B77A]/30">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src="/images/hero-church-wedding.jpg"
            alt="Josh Photography Celebrations"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#16120F]/90 via-[#16120F]/80 to-[#16120F]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 border border-[#D8B77A]/50 text-[#D8B77A] font-nav text-[11px] sm:text-xs uppercase tracking-[0.25em] mb-4 backdrop-blur-sm bg-black/40 rounded-full"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F8F3EA] font-light tracking-wide mb-4 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#F8F3EA]/85 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-6"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/check-availability"
              className="px-7 py-3 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40"
            >
              Check Availability
            </Link>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                `Hi ${studioName}, I would like to inquire about your seasonal photography offers.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 border border-[#F8F3EA]/70 text-[#F8F3EA] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#F8F3EA]/15 transition-all duration-300 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Promotional Advertisement Cards Grid (Appears Naturally Near the Top) ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        {validOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9 items-stretch">
            {validOffers.map((offer, idx) => {
              const discount = Number(offer.discountPercent) || 0
              const targetCat = offer.category || (Array.isArray(offer.categories) && offer.categories[0]) || 'weddings'
              const resolvedImage = offer.bannerImage || getCategoryHeroImage(targetCat) || '/images/hero-church-wedding.jpg'
              const bookingLink = `/check-availability?offer=${encodeURIComponent(offer.title)}&type=${encodeURIComponent(targetCat)}`

              // Formatted date string
              let dateDisplay = ''
              if (offer.startDate && offer.endDate) {
                dateDisplay = `Valid: ${offer.startDate} – ${offer.endDate}`
              } else if (offer.endDate) {
                dateDisplay = `Valid through ${offer.endDate}`
              } else if (offer.startDate) {
                dateDisplay = `From ${offer.startDate}`
              }

              return (
                <article
                  key={offer.id || idx}
                  className="group bg-[#FAF6EE] border border-[#D8B77A]/50 hover:border-[#B9975B] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-[0_2px_14px_rgba(41,37,34,0.05)] hover:shadow-[0_10px_28px_rgba(185,151,91,0.2)] rounded-sm"
                >
                  {/* ── Card Image Container ── */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EADECF]">
                    <img
                      src={resolvedImage}
                      alt={offer.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      onError={(e) => {
                        const fallback = getCategoryHeroImage(targetCat) || '/images/hero-church-wedding.jpg'
                        if (e.target.src !== fallback) {
                          e.target.src = fallback
                        }
                      }}
                    />

                    {/* Subtle Vignette Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 pointer-events-none" />

                    {/* Code-Generated Red Starburst Discount Badge (Reference Image 4) */}
                    <PromotionalBadge
                      discount={discount}
                      text={offer.badgeText || 'OFF'}
                      style={offer.badgeStyle || 'starburst'}
                      visible={offer.showBadge !== false}
                    />

                    {/* Optional Advertisement Sticker (Reference Image 5) */}
                    {(offer.promoLabel || offer.festival) && (
                      <SpecialOfferSticker
                        label={offer.promoLabel || offer.festival}
                      />
                    )}

                    {/* Validity Date on Bottom of Image */}
                    {dateDisplay && (
                      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[11px] font-nav uppercase tracking-wider text-[#FAF6EE] bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-[#D8B77A]" />
                        <span>{dateDisplay}</span>
                      </div>
                    )}
                  </div>

                  {/* ── Card Body (Clean & Focused: Tagline, Title, Description) ── */}
                  <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Prominent Editable Promotional Tagline */}
                      {offer.tagline && (
                        <div className="text-caption uppercase tracking-[0.16em] text-[#B9975B] font-nav font-semibold mb-2.5 leading-snug">
                          {offer.tagline}
                        </div>
                      )}

                      {/* Campaign Title */}
                      <h3 className="font-serif text-2xl sm:text-[1.65rem] font-medium text-[#292522] leading-snug mb-3.5 group-hover:text-[#9E7D42] transition-colors duration-300">
                        {offer.title}
                      </h3>

                      {/* Short Description */}
                      {offer.description && (
                        <p className="text-[#51443A]/90 text-sm sm:text-base leading-relaxed font-light mb-6">
                          {offer.description}
                        </p>
                      )}
                    </div>

                    {/* ── Card Footer: Booking CTA ── */}
                    <div className="pt-5 border-t border-[#D8B77A]/30">
                      <Link
                        to={bookingLink}
                        className="w-full py-3.5 px-6 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#D8B77A]/40 inline-flex items-center justify-center gap-2 group/btn rounded-sm"
                      >
                        <span>Check Availability</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* ── Empty State ── */
          <div className="max-w-xl mx-auto py-16 px-8 text-center bg-[#FAF6EE] border border-[#D8B77A]/60 shadow-luxury rounded-sm">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#F5EEE3] flex items-center justify-center text-[#B9975B] border border-[#D8B77A]/40">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#292522] mb-3">
              No Active Promotional Offers at this Moment
            </h3>
            <p className="text-[#51443A]/80 text-sm sm:text-base font-light mb-8 leading-relaxed">
              Our seasonal promotions are refreshed throughout the year for weddings, birthdays, Christmas, and milestone events. Contact us directly for bespoke package quotes.
            </p>
            <Link
              to="/check-availability"
              className="px-7 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all"
            >
              Request Custom Quote
            </Link>
          </div>
        )}
      </section>

      {/* ── 3. Bottom Booking Call-To-Action Banner (Matching Wedding Page) ── */}
      <section className="py-16 bg-[#FAF6EE] border-t border-[#D8B77A]/35 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-3">
            COMMISSION YOUR DATE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] font-light mb-4">
            Are We Available For Your Date?
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D8B77A] mx-auto mb-5" />
          <p className="text-[#51443A]/85 text-sm sm:text-base font-light mb-8 leading-relaxed">
            Special promotional calendar dates are limited per season to maintain our uncompromising devotion to each celebration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability"
              className="px-8 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#D8B77A] transition-all duration-300 shadow-sm"
            >
              Check Availability
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3.5 border border-[#292522] text-[#292522] font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#292522] hover:text-[#FAF6EE] transition-all duration-300"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
