import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, ArrowUpRight, Heart
} from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../common/Icons'
import { siteConfig } from '../../data/siteConfig'
import { eventCategories } from '../../data/events'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Photography', path: '/portfolio' },
    { label: 'Weddings', path: '/weddings' },
    { label: 'Client Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
    { label: 'Check Availability', path: '/check-availability' },
  ]

  const categories = eventCategories.slice(0, 6)

  return (
    <footer className="bg-deep-charcoal text-ivory/70 border-t border-[#D8B77A]/20">
      {/* Main Footer */}
      <div className="section-padding-sm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-5 group">
                <img
                  src="/logo.png"
                  alt={siteConfig.studioName}
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]"
                />
              </Link>
              <p className="text-body-sm text-ivory/50 leading-relaxed mb-6">
                {siteConfig.shortDescription}. We preserve the emotions, the laughter,
                and the quiet moments that make your celebrations unforgettable.
              </p>
              <div className="flex items-center gap-4">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-ivory/20 flex items-center justify-center transition-all duration-400 hover:border-gold hover:text-gold"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-ivory/20 flex items-center justify-center transition-all duration-400 hover:border-gold hover:text-gold"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.social.youtube && (
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-ivory/20 flex items-center justify-center transition-all duration-400 hover:border-gold hover:text-gold"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-caption uppercase tracking-[0.2em] text-gold mb-6 font-sans font-medium">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-body-sm text-ivory/50 hover:text-ivory transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-gold transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photography */}
            <div>
              <h4 className="text-caption uppercase tracking-[0.2em] text-gold mb-6 font-sans font-medium">
                Photography
              </h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={cat.path}
                      className="text-body-sm text-ivory/50 hover:text-ivory transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-gold transition-all duration-300" />
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-caption uppercase tracking-[0.2em] text-gold mb-6 font-sans font-medium">
                Get in Touch
              </h4>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-start gap-3 text-body-sm text-ivory/50 hover:text-ivory transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-body-sm text-ivory/50 hover:text-ivory transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" />
                  {siteConfig.email}
                </a>
                <div className="flex items-start gap-3 text-body-sm text-ivory/50">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" />
                  {siteConfig.address}
                </div>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    'Hi, I would like to enquire about photography services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#25D366] text-white text-body-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#22c55e] hover:shadow-lg"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10 py-6 px-6 lg:px-10">
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.7rem] text-ivory/30 tracking-wider uppercase">
            © {currentYear} {siteConfig.studioName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-[0.7rem] text-ivory/30 hover:text-ivory/60 tracking-wider uppercase transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-[0.7rem] text-ivory/30 hover:text-ivory/60 tracking-wider uppercase transition-colors">
              Terms
            </Link>
            <span className="text-[0.7rem] text-ivory/40 tracking-wider flex items-center gap-1">
              Greater London & Across the UK
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
