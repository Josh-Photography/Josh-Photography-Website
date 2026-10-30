import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useWebsiteData } from '../../hooks/useWebsiteData'

const defaultContent = {
  enabled: true,
  studioName: 'De Fab Studio',
  eyebrow: 'OUR ANOTHER STUDIO — UNITED KINGDOM',
  heading: 'Introducing De Fab Studio',
  subheading: 'A New Space for Extraordinary Stories.',
  posterImage: '/another_studio.png',
  paragraphs: [
    "We are delighted to introduce De Fab Studio, our additional photography studio in the United Kingdom, expanding our commitment to capturing life's most meaningful moments with creativity, artistry, and professionalism.",
    "From beautiful weddings and engagement sessions to birthdays, anniversaries, maternity shoots, newborn portraits, and family celebrations, we create timeless photographs that preserve genuine emotions and unforgettable memories.",
    "We also capture graduations, corporate events, professional portraits, and special occasions, including Mother's Day and Father's Day. Every session is approached with thoughtful composition, beautiful lighting, creative direction, and meticulous editing to ensure every photograph tells a meaningful story.",
    "Whether it is an intimate family gathering or a grand celebration, our goal is to preserve the moments that matter most, creating photographs you and your loved ones will treasure for generations."
  ],
  tagline: 'Every Moment Has a Story. Let Us Capture Yours.',
  exploreButtonText: 'Explore Our Studio',
  exploreButtonLink: '/portfolio',
  availabilityButtonText: 'Check Availability',
  availabilityButtonLink: '/check-availability'
}

export default function DeFabStudioSection() {
  const { anotherStudio: dynamicContent } = useWebsiteData()
  const content = {
    ...defaultContent,
    ...(dynamicContent && typeof dynamicContent === 'object' ? dynamicContent : {})
  }

  // If disabled by administrator, do not render
  if (content.enabled === false) {
    return null
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Normalize paragraphs
  const paragraphs = Array.isArray(content.paragraphs)
    ? content.paragraphs
    : (typeof content.paragraphs === 'string'
      ? content.paragraphs.split('\n\n').filter(Boolean)
      : defaultContent.paragraphs)

  const posterSrc = content.posterImage || '/another_studio.png'

  return (
    <section
      ref={ref}
      id="de-fab-studio"
      className="relative py-24 md:py-32 bg-[#0c0b0a] text-ivory border-y border-[#D8B77A]/25 overflow-hidden"
      aria-label="De Fab Studio Introduction"
    >
      {/* Cinematic Ambient Background Glows */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(216,183,122,0.12),_transparent_70%)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-10 w-[550px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(216,183,122,0.08),_transparent_70%)] blur-3xl pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column: De Fab Studio Promotional Poster */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group w-full max-w-[440px] lg:max-w-none">
              {/* Outer Luxury Gold Glow Accent */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#D8B77A]/25 via-transparent to-[#E5BA78]/35 opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              
              {/* Poster Container */}
              <div className="relative rounded-xl overflow-hidden bg-[#141210] border border-[#D8B77A]/40 shadow-[0_24px_64px_rgba(0,0,0,0.85)]">
                <img
                  src={posterSrc}
                  alt="De Fab Studio United Kingdom - Luxury Photography Studio"
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Subtle Luxury Corner Accents overlay */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D8B77A] pointer-events-none opacity-80" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D8B77A] pointer-events-none opacity-80" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D8B77A] pointer-events-none opacity-80" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D8B77A] pointer-events-none opacity-80" />
              </div>

              {/* Caption pill below poster */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8B77A]/90 font-nav font-medium">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>De Fab Studio · United Kingdom</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Introduction Narrative & Action CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#D8B77A]/10 border border-[#D8B77A]/30 w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs uppercase tracking-[0.22em] text-[#E5BA78] font-nav font-semibold">
                {content.eyebrow}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.15] mb-3">
              {content.heading}
            </h2>

            {/* Subheading */}
            <p className="font-serif italic text-lg sm:text-xl text-[#E5BA78] font-normal mb-6">
              {content.subheading}
            </p>

            {/* Subtle Divider */}
            <div className="w-20 h-[2px] bg-gradient-to-r from-[#D8B77A] via-[#E5BA78]/70 to-transparent mb-8" />

            {/* Editorial Paragraphs */}
            <div className="space-y-4 text-ivory/80 text-[15px] sm:text-base leading-relaxed font-light">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Closing Tagline Highlight Box */}
            {content.tagline && (
              <div className="mt-8 p-4 sm:p-5 rounded-lg border-l-4 border-gold bg-[#181512]/90 border border-t-[#D8B77A]/20 border-r-[#D8B77A]/20 border-b-[#D8B77A]/20 shadow-inner">
                <p className="font-serif italic text-lg sm:text-xl text-ivory font-normal leading-snug">
                  "{content.tagline}"
                </p>
                <span className="block mt-1 text-xs uppercase tracking-[0.18em] text-[#D8B77A] font-nav">
                  — {content.studioName || 'De Fab Studio'}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
