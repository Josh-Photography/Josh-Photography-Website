import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Film, Sparkles, Volume2, Video, Compass, ArrowRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { useWebsiteData } from '../hooks/useWebsiteData'

const filmShowcases = [
  {
    id: 1,
    title: 'The Eternal Vow: Eleanor & Oliver',
    category: 'Wedding Film',
    location: 'Countryside Estate & Historic Chapel',
    duration: '4:45 min',
    thumbnail: '/images/hero-church-wedding.jpg',
    synopsis: 'An intimate countryside wedding combining historic stone chapel vows, acoustic melodies, and a joyful twilight lantern celebration.',
  },
  {
    id: 2,
    title: 'Chasing the Sunset: Ananya & Rohan',
    category: 'Pre-Wedding Cinema',
    location: 'River Promenade & Classic Colonnades',
    duration: '3:15 min',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1000&q=80',
    synopsis: 'Windblown hair, golden river reflections, and historic architecture. An intimate visual poem exploring their love story.',
  },
  {
    id: 3,
    title: 'One Year of Wonder: Oliver',
    category: 'Celebration Film',
    location: 'Private Garden Estate',
    duration: '2:50 min',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80',
    synopsis: 'Laughter, clapping hands, grandparents wiping tears of joy, and a baby discovering the delight of smashing his first birthday cake.',
  },
  {
    id: 4,
    title: 'Silver Promises: 25 Years of Grace',
    category: 'Anniversary Film',
    location: 'Historic Private Residence',
    duration: '4:10 min',
    thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&q=80',
    synopsis: 'A tribute to a quarter century of unwavering partnership, told through vintage family photographs and heartfelt toasts from three generations.',
  },
]

const cinemaPillars = [
  {
    icon: Film,
    title: 'Cinematic Cinema Optics & Cameras',
    desc: 'Filmed on professional full-frame cinema cameras with anamorphic & prime lenses for dreamy depth of field and filmic motion blur.',
  },
  {
    icon: Volume2,
    title: 'Immersive Sound Design',
    desc: 'Crisp wireless lavalier audio recording sacred vows, parental toasts, and ambient laughter layered with licensed orchestral scores.',
  },
  {
    icon: Compass,
    title: 'Drone Aerial Perspectives',
    desc: 'Sweeping 4K drone cinematography capturing grand architectural estates, sea coastlines, and the scale of your celebration.',
  },
  {
    icon: Sparkles,
    title: 'Artisanal Color Grading',
    desc: 'Individually graded in DaVinci Resolve with warm organic film emulation matching the luxury aesthetic of our still photographs.',
  },
]

export default function Films() {
  const [activeFilm, setActiveFilm] = useState(null)
  const { studio = {} } = useWebsiteData()
  const rawNumber = studio.whatsapp || siteConfig.whatsapp
  const cleanWhatsapp = String(rawNumber).replace(/[^0-9]/g, '')

  return (
    <div className="bg-ivory">
      {/* Films Hero */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-deep-charcoal text-ivory">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=2000&q=85"
            alt="Cinematic Wedding Films"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(30, 20, 15, 0.25) 0%, rgba(30, 20, 15, 0.20) 45%, rgba(25, 18, 14, 0.65) 100%)',
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 text-center px-6 pt-32 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-1.5 border border-champagne/40 text-champagne font-nav text-xs uppercase tracking-[0.25em] mb-6 backdrop-blur-sm bg-black/25 rounded-full"
          >
            05 — MOVING PICTURES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light tracking-wide max-w-5xl mx-auto mb-6 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            Cinematic Films & Moving Memories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-ivory/90 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            Photographs freeze a moment in time; films allow you to relive the voices, the music, the laughter, and the trembling breath of a sacred vow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/check-availability?type=film"
              className="px-8 py-3.5 bg-muted-gold text-deep-black font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-champagne/40"
            >
              Inquire Cinema Package
            </Link>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hi, I want to inquire about cinematic film production.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-ivory/80 text-ivory font-nav font-semibold text-xs tracking-[0.16em] uppercase hover:bg-ivory/15 hover:border-ivory transition-all duration-300 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/70 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-nav">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-7 bg-gradient-to-b from-champagne to-transparent animate-pulse" />
        </div>
      </section>

      {/* Featured Films Showcase */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-3">
              Selected Cinema
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light">
              Featured Teasers & Stories
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filmShowcases.map((film) => (
              <div
                key={film.id}
                className="bg-cream/40 border border-champagne/70 overflow-hidden group hover:border-gold transition-all duration-400"
              >
                <div className="relative aspect-video overflow-hidden bg-deep-black">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-deep-black/30 group-hover:bg-deep-black/10 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <div
                    onClick={() => setActiveFilm(film)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/90 text-deep-black flex items-center justify-center pl-1 group-hover:scale-110 group-hover:bg-gold transition-all duration-300 shadow-xl">
                      <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 right-3 bg-deep-black/80 text-ivory text-xs px-2.5 py-1 rounded font-mono">
                    {film.duration}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption uppercase tracking-widest text-gold font-sans">
                      {film.category}
                    </span>
                    <span className="text-xs text-warm-brown/60 font-sans">{film.location}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">
                    {film.title}
                  </h3>
                  <p className="text-warm-brown/75 text-body-sm font-light leading-relaxed">
                    {film.synopsis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pillars of Our Filmmaking */}
      <section className="section-padding bg-cream/40 border-t border-champagne">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-3">
              The Production
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
              Why Our Films Feel Like Cinema
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cinemaPillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className="bg-ivory p-8 border border-champagne/80 hover:border-gold transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-3">{pillar.title}</h3>
                  <p className="text-warm-brown/75 text-body-sm font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Video Modal Preview */}
      {activeFilm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black/95 p-4 md:p-8"
          onClick={() => setActiveFilm(null)}
        >
          <div
            className="max-w-4xl w-full bg-deep-black border border-ivory/20 p-6 rounded relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl text-ivory mb-2">{activeFilm.title}</h3>
            <p className="text-caption text-gold uppercase tracking-widest mb-6">
              {activeFilm.category} — {activeFilm.location}
            </p>
            <div className="relative aspect-video bg-deep-black/80 flex flex-col items-center justify-center border border-ivory/10 mb-6">
              <img
                src={activeFilm.thumbnail}
                alt={activeFilm.title}
                className="w-full h-full object-cover opacity-40 absolute inset-0"
              />
              <div className="relative z-10 text-ivory px-6">
                <Film className="w-12 h-12 text-gold mx-auto mb-3 animate-pulse" />
                <p className="text-lg font-serif mb-2">Cinematic Teaser Reel Available Upon Request</p>
                <p className="text-xs text-ivory/60 max-w-md mx-auto">
                  For privacy of high-profile families, our full 4K documentary reels are presented during private consultations.
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-gold text-deep-black font-sans text-xs uppercase tracking-wider font-medium hover:bg-gold-light"
              >
                Request Private Screening
              </Link>
              <button
                onClick={() => setActiveFilm(null)}
                className="px-6 py-2.5 border border-ivory/40 text-ivory font-sans text-xs uppercase tracking-wider hover:border-gold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Films Booking CTA */}
      <section className="section-padding bg-deep-black text-ivory text-center">
        <div className="container-luxury max-w-3xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-3">
            Immortalize In Motion
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory mb-6">
            Let Us Tell Your Story on Film
          </h2>
          <p className="text-ivory/70 text-body-md font-light mb-10 leading-relaxed">
            From 60-second social highlights to full-length 45-minute documentary features, we produce cinema you will rewatch on every anniversary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-gold text-deep-black font-sans font-medium text-sm tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
            >
              Inquire Cinema Availability
            </Link>
            <Link
              to="/packages"
              className="px-8 py-3.5 border border-ivory/30 text-ivory font-sans font-medium text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-all duration-300"
            >
              View Film Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
