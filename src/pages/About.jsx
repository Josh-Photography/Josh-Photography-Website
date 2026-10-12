import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Camera, Heart, Shield, Award, Sparkles, MapPin,
  Calendar, Check, ArrowRight, Eye, Info
} from 'lucide-react'
import { stats as fallbackStats } from '../data/stories'
import { siteConfig } from '../data/siteConfig'
import { useWebsiteData } from '../hooks/useWebsiteData'

// Fallback studio visual placeholders (Opening next month in Greater London)
const fallbackStudioPreviewImages = [
  {
    id: 'studio-interior',
    title: 'Natural Light Studio Space',
    subtitle: 'Studio Concept · Opening Next Month',
    desc: 'Spacious, high-ceiling studio area designed for gentle natural light and family comfort.',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80',
    alt: 'Illustrative concept of an elegant natural light photography studio interior',
    isConceptPlaceholder: true,
  },
  {
    id: 'studio-equipment',
    title: 'Professional Optics & Equipment',
    subtitle: 'Precision Gear Setup',
    desc: 'Dual-card full-frame cinema bodies, high-speed prime lenses, and color-calibrated tethering.',
    src: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1000&q=80',
    alt: 'Illustrative photography gear setup with professional cameras and prime lenses',
    isConceptPlaceholder: true,
  },
  {
    id: 'studio-lighting',
    title: 'Dedicated Portrait Lighting Area',
    subtitle: 'Sculptural Light Setup',
    desc: 'Large parabolic softboxes and diffused light modifiers configured for soft, flattering skin tones.',
    src: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1000&q=80',
    alt: 'Illustrative studio portrait lighting equipment and softbox setup',
    isConceptPlaceholder: true,
  },
  {
    id: 'studio-consultation',
    title: 'Client Consultation & Lounge',
    subtitle: 'Welcoming Meeting Space',
    desc: 'A calm, relaxed space to review heirloom album swatches, screen films, and plan your celebration.',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80',
    alt: 'Illustrative client consultation and album review lounge space',
    isConceptPlaceholder: true,
  },
]

const fallbackPhotographyPillars = [
  {
    icon: Heart,
    title: 'Emotional Authenticity',
    desc: 'We never force artificial poses or stiff smiles. The truest beauty lives in honest tears, spontaneous laughter, and quiet glances between loved ones.',
  },
  {
    icon: Shield,
    title: 'Unobtrusive Documentary Approach',
    desc: 'We blend seamlessly into your wedding or family celebration, capturing the natural rhythm of your day without interrupting sacred rituals.',
  },
  {
    icon: Camera,
    title: 'Timeless Warmth & Elegant Composition',
    desc: 'Every image is individually color-graded with rich, organic tones that honor true skin tones and fabric textures without fading trends.',
  },
  {
    icon: Award,
    title: 'Archival Heirloom Longevity',
    desc: 'We design our photographs and handcrafted albums to outlive generations. Fifty years from now, your family will look at these frames with awe.',
  },
]

const fallbackFaqs = [
  {
    q: 'How far in advance should we inquire for dates?',
    a: 'We recommend inquiring 6 to 12 months in advance for peak UK wedding dates and weekend celebrations. For newborn, family, and birthday sessions, 3 to 6 weeks notice is ideal.',
  },
  {
    q: 'Which areas do you cover for commissions?',
    a: 'We regularly photograph weddings and celebrations across regional venues, private countryside estates, and select destination commissions.',
  },
  {
    q: 'When will our photography gallery be delivered?',
    a: 'You will receive a curated preview of 25–30 hand-graded highlight frames within 48 to 72 hours of your celebration. Your full, high-resolution digital gallery is delivered within 3 to 4 weeks.',
  },
  {
    q: 'Can we visit your studio for an in-person consultation?',
    a: 'Our new dedicated studio premises will be officially opening next month! In the meantime, we are delighted to meet with couples and families virtually or by private appointment to review portfolio collections and discuss your plans.',
  },
]

export default function About() {
  const { about = {}, studio = {} } = useWebsiteData()

  const studioPreviewImages = (studio.previewImages && studio.previewImages.length > 0)
    ? studio.previewImages.filter(p => p.published !== false)
    : fallbackStudioPreviewImages

  const stats = (about.stats && about.stats.length > 0) ? about.stats : fallbackStats
  const pillars = (about.pillars && about.pillars.length > 0) ? about.pillars : fallbackPhotographyPillars
  const faqs = (about.faqs && about.faqs.length > 0) ? about.faqs : fallbackFaqs

  const announcement = studio.announcement || {
    badge: '04 — COMING SOON',
    title: 'Our New Studio Space',
    description: 'We are delighted to announce that we are preparing to open our dedicated photography studio space next month!',
    disclaimer: 'Studio Preview Notice: The imagery below represents an illustrative visual concept of our upcoming studio facilities, specialized lighting configurations, and consultation spaces. Actual studio premises photographs will be released upon our grand opening next month. Consultations and commissions are currently available on-location and by private appointment.',
    ctaText: 'Join Studio Opening Guestlist',
    ctaLink: '/contact',
    published: true,
  }

  const heroBadge = about.heroBadge || 'BEHIND THE LENS · JOSH PHOTOGRAPHY'
  const heroTitle = about.heroTitle || 'Preserving the Moments That Make Us Human'
  const heroDescription = about.heroDescription || 'Dedicated to chronicling weddings, milestone celebrations, and family connections with timeless artistry.'

  const storyBadge = about.storyBadge || '01 — OUR STORY'
  const storyTitle = about.storyTitle || 'Capturing What Cannot Be Replaced'
  const storyP1 = about.storyParagraph1 || `${studio.name || siteConfig.studioName} was founded with a singular conviction: that life’s most precious feelings should never fade with memory. The quiet reverence before wedding vows, the spontaneous burst of laughter during a first birthday cake cutting, the tear on a father’s cheek, and the warmth of hands held over decades.`
  const storyP2 = about.storyParagraph2 || 'We believe that great photography is not about perfection or artificial performance; it is about presence. We observe with quiet reverence and gentle direction, giving couples and families the freedom to be wholly themselves while we capture heirloom imagery they will treasure for a lifetime.'
  const storyImage = about.storyImage || 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80'
  const storyQuote = about.storyQuote || 'Light is fleeting. Emotion is forever.'

  const photographerBadge = about.photographerBadge || '02 — MEET THE PHOTOGRAPHER'
  const photographerHeadline = about.photographerHeadline || 'A Passion for Authentic Storytelling'
  const photographerName = about.photographerName || 'Josh'
  const photographerRole = about.photographerRole || 'Lead Photographer & Founder'
  const photographerImage = about.photographerImage || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900&q=80'
  const photographerBio1 = about.photographerBio1 || 'Hello, I am Josh. As a photographer, my goal is simple: to document your most meaningful milestones so faithfully that every time you revisit your photographs, you are instantly transported back to how the moment truly felt.'
  const photographerBio2 = about.photographerBio2 || 'My approach combines quiet photojournalism with refined, editorial portraiture. Whether documenting a sacred church ceremony in the English countryside, a historic countryside manor celebration, or a joyful family garden gathering, I bring patience, warmth, and keen observation to every commission.'
  const photographerQuote = about.photographerQuote || "I don't just photograph what things look like — I photograph what they feel like. Your family's unique laughter, sacred vows, and candid joys deserve to be captured with dignity and timeless care."
  return (
    <div className="bg-ivory">
      {/* About Hero */}
      <section
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden text-center border-b border-[#D8B77A]/35"
        style={{
          background: `
            radial-gradient(ellipse 95% 65% at 50% -10%, rgba(220, 160, 90, 0.32) 0%, transparent 65%),
            radial-gradient(ellipse 75% 55% at 92% 35%, rgba(195, 130, 65, 0.24) 0%, transparent 60%),
            radial-gradient(ellipse 75% 55% at 8% 70%, rgba(175, 110, 50, 0.22) 0%, transparent 60%),
            linear-gradient(175deg, #1C0F08 0%, #2B170E 20%, #3E2416 45%, #4A2B1A 55%, #351C11 82%, #1A0D07 100%)
          `,
        }}
      >
        <div className="container-luxury px-6 max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-[#E5BA78] font-sans font-semibold mb-3.5 drop-shadow-[0_1px_8px_rgba(229,186,120,0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA78]" />
            <span>{heroBadge}</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#FAF4EA] font-light tracking-wide mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] leading-[1.14]"
          >
            {heroTitle}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4.5rem' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#E5BA78] to-transparent mx-auto mb-5"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#FAF4EA]/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          >
            {heroDescription}
          </motion.p>
        </div>
      </section>

      {/* 01: Our Story */}
      <section className="section-padding bg-ivory border-b border-champagne/40">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-caption uppercase tracking-[0.2em] text-muted-gold font-nav font-semibold block mb-3">
                {storyBadge}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal font-light leading-tight mb-6">
                {storyTitle}
              </h2>
              <p className="text-warm-brown/85 text-body-md leading-relaxed mb-5 font-light">
                {storyP1}
              </p>
              <p className="text-warm-brown/85 text-body-md leading-relaxed mb-8 font-light">
                {storyP2}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-champagne/60">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <span className="font-serif text-3xl md:text-4xl text-charcoal font-medium block">
                      {stat.value}
                    </span>
                    <span className="text-xs text-warm-brown/60 uppercase tracking-wider font-nav mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 overflow-hidden shadow-luxury border-4 border-ivory">
                <img
                  src={storyImage}
                  alt={storyTitle}
                  className="w-full h-[520px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-ivory p-6 shadow-luxury max-w-xs border border-champagne/60 hidden sm:block">
                <p className="font-serif italic text-lg text-charcoal mb-2">
                  "{storyQuote}"
                </p>
                <p className="text-caption text-muted-gold uppercase tracking-widest font-nav font-semibold">
                  {studio.name || siteConfig.studioName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: Meet the Photographer */}
      <section className="section-padding bg-[#F5EEE3]/60 border-b border-[#D8B77A]/20">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative z-10 overflow-hidden shadow-luxury border-4 border-ivory">
                <img
                  src={photographerImage}
                  alt={photographerName}
                  className="w-full h-[520px] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 bg-deep-charcoal text-ivory p-6 shadow-luxury max-w-xs border border-ivory/10 hidden sm:block">
                <p className="font-serif text-lg text-champagne mb-1">
                  {photographerName}
                </p>
                <p className="text-caption text-ivory/60 uppercase tracking-widest font-nav">
                  {photographerRole}
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-caption uppercase tracking-[0.2em] text-muted-gold font-nav font-semibold block mb-3">
                {photographerBadge}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal font-light leading-tight mb-6">
                {photographerHeadline}
              </h2>
              <p className="text-warm-brown/85 text-body-md leading-relaxed mb-4 font-light">
                {photographerBio1}
              </p>
              <p className="text-warm-brown/85 text-body-md leading-relaxed mb-4 font-light">
                {photographerBio2}
              </p>
              <div className="p-4 bg-ivory border-l-2 border-muted-gold mb-6">
                <p className="text-charcoal/80 text-body-sm italic font-serif">
                  "{photographerQuote}"
                </p>
                <span className="text-caption text-muted-gold uppercase tracking-wider font-nav font-semibold block mt-2">
                  — {photographerName}, {photographerRole}
                </span>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light transition-all duration-300 shadow-sm"
              >
                <span>Get In Touch With {photographerName}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03: Our Photography Style */}
      <section className="section-padding bg-ivory border-b border-champagne/40">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-muted-gold font-nav font-semibold block mb-3">
              03 — OUR VISUAL APPROACH
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
              Our Photography Style
            </h2>
            <div className="w-16 h-[1px] bg-champagne mx-auto mt-4 mb-4" />
            <p className="text-warm-brown/75 text-body-sm font-light">
              Rooted in natural light, genuine emotional connection, and timeless cinematic color grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon || Heart
              return (
                <div
                  key={i}
                  className="bg-[#F5EEE3]/40 p-8 border border-champagne/70 hover:border-muted-gold transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-champagne/30 text-muted-gold flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal mb-3">{pillar.title}</h3>
                    <p className="text-warm-brown/80 text-body-sm font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 04: Our Studio (Opening Next Month) */}
      {announcement.published !== false && (
        <section className="section-padding bg-[#F5EEE3]/80 border-b border-[#D8B77A]/30">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-caption uppercase tracking-[0.25em] text-muted-gold font-nav font-semibold block mb-3">
                {announcement.badge || '04 — COMING SOON'}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light mb-4">
                {announcement.title || 'Our New Studio Space'}
              </h2>
              <div className="w-16 h-[1px] bg-champagne mx-auto mb-6" />
              <p className="text-warm-brown/90 text-body-md font-light leading-relaxed">
                {announcement.description}
              </p>

              {/* Clear illustrative disclaimer box as requested */}
              {announcement.disclaimer && (
                <div className="mt-6 p-4 bg-ivory border border-champagne/80 rounded flex items-start gap-3 text-left">
                  <Info className="w-5 h-5 text-muted-gold flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-warm-brown/80 font-light leading-relaxed">
                    <strong className="font-medium text-charcoal">Studio Preview Notice: </strong>
                    {announcement.disclaimer}
                  </div>
                </div>
              )}
            </div>

            {/* 3-4 Studio Concept Photographs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studioPreviewImages.map((img) => (
                <div
                  key={img.id || img.title}
                  className="bg-ivory border border-champagne/70 overflow-hidden shadow-sm group hover:border-muted-gold transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-beige relative">
                    <img
                      src={img.src}
                      alt={img.alt || img.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-champagne uppercase tracking-wider font-nav">
                      Concept Preview
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider text-muted-gold font-nav font-semibold block mb-1">
                        {img.subtitle}
                      </span>
                      <h3 className="font-serif text-lg text-charcoal mb-1.5">{img.title}</h3>
                      <p className="text-warm-brown/75 text-xs font-light leading-relaxed">
                        {img.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to={announcement.ctaLink || '/contact'}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-muted-gold text-deep-black font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-gold-light transition-all duration-300 shadow-sm"
              >
                <span>{announcement.ctaText || 'Join Studio Opening Guestlist'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      <section className="section-padding bg-ivory border-b border-champagne/40">
        <div className="container-luxury max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-muted-gold font-nav font-semibold block mb-3">
              FREQUENTLY ASKED
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
              Common Questions
            </h2>
            <div className="w-16 h-[1px] bg-champagne mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-8 bg-[#F5EEE3]/40 border border-champagne/70 rounded-none hover:border-muted-gold transition-all duration-300"
              >
                <h3 className="font-serif text-xl text-charcoal mb-2">{faq.q}</h3>
                <p className="text-warm-brown/80 text-body-sm font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-deep-charcoal text-ivory text-center">
        <div className="container-luxury max-w-3xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.25em] text-champagne font-nav font-semibold block mb-3">
            START A CONVERSATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory mb-6">
            We Would Love To Hear Your Story
          </h2>
          <p className="text-ivory/80 text-body-md font-light mb-10 leading-relaxed max-w-xl mx-auto">
            Whether planning an English church wedding, an intimate family milestone, or a joyful cultural celebration, we would be honored to be your visual chroniclers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/check-availability"
              className="inline-flex items-center justify-center px-9 py-4 bg-muted-gold text-deep-black font-nav font-semibold text-xs tracking-[0.16em] uppercase transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 shadow-sm"
            >
              Check Availability
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-9 py-4 border border-ivory/50 text-ivory font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:border-champagne hover:text-champagne transition-all duration-300"
            >
              Explore Photography
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
