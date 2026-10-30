import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Calendar, Sparkles } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
import { useWebsiteData } from '../../hooks/useWebsiteData'

/**
 * PhotographyCard component
 * Exact luxury layout inspired by the reference image:
 * - High-resolution photograph with 16:10 aspect ratio and subtle hover zoom
 * - Numbered label (01, 02, etc.) in champagne gold
 * - Elegant serif title in charcoal
 * - Editorial description (~15-25 words)
 * - Subtle champagne-gold border and cream background
 */
export function PhotographyCard({
  num,
  title,
  desc,
  image,
  alt,
  onImageClick,
  className = '',
  objectPosition,
  aspectRatio = 'aspect-[16/10]',
}) {
  // Intelligent focal alignment so portraits, models, athletes, and products are never cropped awkwardly
  const getFocalPosition = (src, explicitPos) => {
    if (explicitPos) return explicitPos
    if (!src) return 'center center'
    const s = String(src).toLowerCase()
    if (s.includes('model_shoot_1')) return 'center 12%'
    if (s.includes('model_shoot_2')) return 'center 10%'
    if (s.includes('model_shoot_3')) return 'center 20%'
    if (s.includes('model_shoot_4')) return 'center 10%'
    if (s.includes('model_shoot_5')) return 'center 10%'
    if (s.includes('model_shoot_6')) return 'center 12%'
    if (s.includes('model_shoot_')) return 'center 12%'
    if (s.includes('sports_shoot_1')) return 'center 12%'
    if (s.includes('sports_shoot_4')) return 'center 12%'
    if (s.includes('product_shoot_1')) return 'center center'
    if (s.includes('product_shoot_6')) return 'center 20%'
    if (s.includes('car_shoot_1')) return 'center 60%'
    if (s.includes('reel_shoot_1')) return 'center 15%'
    if (s.includes('reel_shoot_2')) return 'center 30%'
    if (s.includes('reel_shoot_3')) return 'center 35%'
    return 'center center'
  }

  const focalPosition = getFocalPosition(image, objectPosition)

  return (
    <article
      className={`group bg-[#FAF6EE] border border-[#D8B77A]/50 hover:border-[#B9975B] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-[0_2px_12px_rgba(41,37,34,0.04)] hover:shadow-[0_8px_24px_rgba(185,151,91,0.15)] ${className}`}
    >
      {/* Image container */}
      <div
        className={`relative ${aspectRatio} overflow-hidden bg-[#EADECF] cursor-pointer`}
        onClick={onImageClick}
      >
        <img
          src={image}
          alt={alt || title}
          loading="lazy"
          style={{ objectPosition: focalPosition }}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Content Area - Exactly matches reference typography and spacing */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-start">
        {/* Number label */}
        <span className="font-serif text-3xl sm:text-4xl text-[#B9975B]/70 group-hover:text-[#B9975B] transition-colors duration-300 block mb-2.5 tracking-wide select-none font-light">
          {num}
        </span>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-[1.55rem] font-medium text-[#292522] leading-snug mb-3.5 group-hover:text-[#9E7D42] transition-colors duration-300">
          {title}
        </h3>

        {/* Description (15-25 words) */}
        <p className="text-[#51443A]/90 text-base sm:text-[1.05rem] leading-relaxed font-light">
          {desc}
        </p>
      </div>
    </article>
  )
}

/**
 * EditorialCollectionSection component
 * Complete informative photography collection section featuring:
 * - Numbered eyebrow label (e.g. "01 — THE SACRED COVENANT")
 * - Category heading and rich introductory editorial narrative
 * - Featured photograph paired with an informative "Moments & Services Included" card
 * - 3-Column Photography Cards Grid (4-6 cards matching reference layout)
 * - Dual functional CTAs: "Explore [Category] Photography" and "Enquire About [Category] Photography"
 */
export function EditorialCollectionSection({
  category = {},
  cards: propCards,
  index = 0,
  showCards = false,
}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const isEven = index % 2 === 0
  const { getCategoryCards, data } = useWebsiteData()
  const catKey = category?.id || category?.slug || ''
  const dynamicCards = (getCategoryCards && catKey) ? getCategoryCards(catKey) : []
  const hasLoadedData = Boolean(data && Array.isArray(data.photos) && data.photos.length > 0)
  const cards = (dynamicCards && (dynamicCards.length > 0 || hasLoadedData))
    ? dynamicCards
    : (Array.isArray(propCards) && propCards.length > 0 ? propCards : (Array.isArray(category?.cards) ? category.cards : []))
  const lightboxImages = cards.map((c, i) => ({
    id: `${category.id}-${c.id || i}`,
    src: c.image || c.src,
    srcLarge: c.srcLarge || c.image || c.src,
    title: `${c.num || String(i + 1).padStart(2, '0')} — ${c.title}`,
    alt: c.alt || c.title,
    event: c.desc || '',
  }))

  const enquiryLink = `/check-availability?type=${category.enquiryType || category.id}`
  const serviceLink = category.serviceRoute || `/${category.slug}`

  return (
    <section
      id={category.id}
      className={`py-20 lg:py-28 scroll-mt-28 transition-colors ${isEven ? 'bg-[#F8F3EA]' : 'bg-[#FAF6EE]/80'
        }`}
      aria-labelledby={`heading-${category.id}`}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── 1. Category Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="text-caption uppercase tracking-[0.25em] text-[#B9975B] font-sans font-semibold block mb-3 text-xs sm:text-sm">
            {category.heroBadge || `${category.categoryNumber} — THE COMPLETE JOURNEY`}
          </span>
          <Link to={serviceLink} className="inline-block group/title">
            <h2
              id={`heading-${category.id}`}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#292522] font-light leading-[1.12] group-hover/title:text-[#9E7D42] transition-colors"
            >
              {category.headline || category.name}
            </h2>
          </Link>
          <div className="w-20 h-[1.5px] bg-[#D8B77A] mx-auto mt-4 mb-5" />
          <p className="text-[#51443A]/85 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {category.subheadline}
          </p>
        </div>

        {/* ── 2. Editorial Overview: Featured Photo + What We Capture (Consistent 2-Column Desktop Layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Featured Image Column (approx 55% / 7 cols) */}
          <div className="lg:col-span-7">
            <Link
              to={serviceLink}
              className="block relative group overflow-hidden border-2 border-[#D8B77A]/50 bg-[#EADECF] shadow-[0_12px_36px_rgba(41,37,34,0.08)] cursor-pointer"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={category.heroImage || cards[0]?.image}
                  alt={`${category.name} featured photograph`}
                  loading="lazy"
                  style={{
                    objectPosition:
                      category.heroPosition ||
                      (String(category.heroImage || '').includes('model_shoot_') ? 'center 20%' :
                       String(category.heroImage || '').includes('sports_shoot_1') ? 'center 18%' :
                       String(category.heroImage || '').includes('reel_shoot_1') ? 'center 20%' :
                       'center center')
                  }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F08]/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between pointer-events-none text-white">
                <div>
                  <span className="text-[11px] font-nav uppercase tracking-[0.2em] text-[#E5BA78] block mb-1">
                    Signature Collection
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-light text-[#FAF4EA] group-hover:text-[#D8B77A] transition-colors">
                    {category.name}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-[0.15em] text-[#D8B77A]">
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Narrative & Moments Included Column (approx 45% / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-nav font-semibold block mb-2 text-xs">
              What Josh Photography Captures
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#292522] font-normal leading-snug mb-4">
              Artistic Vision & Thoughtful Narrative
            </h3>
            <p className="text-[#51443A]/85 text-base leading-relaxed font-light mb-6">
              {category.introduction || category.description}
            </p>

            {/* Moments Included Checklist */}
            {category.momentsIncluded && category.momentsIncluded.length > 0 && (
              <div className="bg-[#FAF6EE] border border-[#D8B77A]/40 p-5 sm:p-6 mb-7 rounded-sm">
                <h4 className="font-nav text-xs uppercase tracking-[0.16em] font-bold text-[#B9975B] mb-3.5">
                  Moments & Services Included:
                </h4>
                <ul className="grid grid-cols-1 gap-2 text-sm text-[#292522]/90 font-light">
                  {category.momentsIncluded.slice(0, 6).map((moment, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#D8B77A]/30 flex items-center justify-center mt-0.5 text-[#B9975B] flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{moment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Action Links */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                to={serviceLink}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm rounded-sm whitespace-nowrap text-center"
              >
                <span>{category.ctaText || `Explore ${category.name}`}</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              </Link>
              <Link
                to={enquiryLink}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B9975B] text-[#1A1715] font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#D8B77A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm rounded-sm whitespace-nowrap text-center"
              >
                <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[#1A1715]" />
                <span>Check Availability</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 3. Photography Cards Grid (Only rendered if showCards is true) ── */}
        {showCards && cards && cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 mt-12 md:mt-16">
            {cards.map((card, cardIdx) => (
              <PhotographyCard
                key={card.id || card.num || cardIdx}
                num={card.num || String(cardIdx + 1).padStart(2, '0')}
                title={card.title}
                desc={card.desc || card.description}
                image={card.image || card.src}
                alt={card.alt || card.title}
                objectPosition={card.objectPosition || card.imagePosition}
                aspectRatio={card.aspectRatio || category?.cardAspectRatio}
                onImageClick={() => setSelectedImage(lightboxImages[cardIdx])}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          images={lightboxImages}
          onClose={() => setSelectedImage(null)}
          onNavigate={(img) => setSelectedImage(img)}
        />
      )}
    </section>
  )
}

export const PhotographyCategorySection = EditorialCollectionSection

export default PhotographyCard
