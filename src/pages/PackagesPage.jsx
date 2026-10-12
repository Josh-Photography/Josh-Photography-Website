import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight, Plus } from 'lucide-react'
import { packages, packageAddons } from '../data/packages'
import { siteConfig } from '../data/siteConfig'

export default function PackagesPage() {
  return (
    <div className="bg-ivory pt-24">
      {/* Packages Hero */}
      <section className="relative py-24 md:py-32 bg-cream/70 border-b border-champagne text-center overflow-hidden">
        <div className="container-luxury px-6 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-caption uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-4"
          >
            Collections & Investment
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal tracking-wide mb-6"
          >
            Invest In Timeless Art
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-warm-brown/80 text-lg md:text-xl font-light leading-relaxed"
          >
            Every tier includes our signature artistic direction, full-resolution digital deliverables, and meticulous fine-art post-production.
          </motion.p>
        </div>
      </section>

      {/* Packages Cards */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {packages.map((pkg) => {
              const isPopular = pkg.popular
              return (
                <div
                  key={pkg.id}
                  className={`relative p-8 md:p-10 flex flex-col justify-between transition-all duration-400 ${
                    isPopular
                      ? 'bg-deep-black text-ivory border-2 border-gold shadow-2xl scale-[1.02] z-10'
                      : 'bg-cream/40 text-charcoal border border-champagne hover:border-gold/60 shadow-sm'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gold text-deep-black text-[11px] font-sans font-semibold uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div>
                    <div className="mb-6">
                      <span
                        className={`text-caption uppercase tracking-[0.2em] font-sans block mb-1 ${
                          isPopular ? 'text-gold' : 'text-warm-brown/70'
                        }`}
                      >
                        {pkg.subtitle}
                      </span>
                      <h3
                        className={`font-serif text-3xl font-light ${
                          isPopular ? 'text-ivory' : 'text-charcoal'
                        }`}
                      >
                        {pkg.name}
                      </h3>
                    </div>

                    <p
                      className={`text-body-sm font-light leading-relaxed mb-6 ${
                        isPopular ? 'text-ivory/70' : 'text-warm-brown/75'
                      }`}
                    >
                      {pkg.description}
                    </p>

                    <div className="py-5 border-y border-champagne/30 mb-8">
                      <span
                        className={`font-serif text-2xl font-light ${
                          isPopular ? 'text-gold' : 'text-charcoal'
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span
                        className={`block text-[11px] uppercase tracking-wider font-sans mt-0.5 ${
                          isPopular ? 'text-ivory/50' : 'text-warm-brown/60'
                        }`}
                      >
                        Custom estimates upon request
                      </span>
                    </div>

                    <div className="space-y-3.5 mb-10">
                      {pkg.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isPopular ? 'text-gold' : 'text-gold-dark'
                            }`}
                          />
                          <span
                            className={`text-body-sm font-light ${
                              isPopular ? 'text-ivory/85' : 'text-charcoal/80'
                            }`}
                          >
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Link
                      to={`/check-availability?package=${encodeURIComponent(pkg.name)}`}
                      className={`w-full block text-center py-3.5 text-xs font-nav uppercase tracking-[0.14em] font-medium transition-all duration-300 ${
                        isPopular
                          ? 'bg-muted-gold text-ivory hover:bg-[#A8874D] shadow-luxury'
                          : 'bg-deep-charcoal text-ivory hover:bg-muted-gold hover:text-ivory'
                      }`}
                    >
                      {pkg.cta || 'Request Pricing'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="section-padding bg-cream/40 border-t border-champagne">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-3">
              Bespoke Additions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
              Tailor Your Experience
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageAddons.map((addon, idx) => (
              <div
                key={idx}
                className="bg-ivory p-6 border border-champagne/80 hover:border-gold transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal mb-1">{addon.name}</h4>
                  <p className="text-warm-brown/70 text-body-sm font-light">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Banner */}
      <section className="section-padding bg-deep-black text-ivory text-center">
        <div className="container-luxury max-w-3xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-3">
            Bespoke Requirements
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory mb-6">
            Need A Custom Curated Proposal?
          </h2>
          <p className="text-ivory/70 text-body-md font-light mb-10 leading-relaxed">
            Every celebration has its own scale, rhythm, and traditions. Share your dates and dreams with us, and we will build a custom package crafted around you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/check-availability"
              className="inline-flex items-center justify-center px-9 py-4 bg-muted-gold text-ivory font-nav font-medium text-sm tracking-[0.14em] uppercase transition-all duration-300 hover:bg-[#A8874D] hover:-translate-y-0.5 shadow-luxury"
            >
              Check Availability & Rates
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi, I would like to enquire about a custom photography package.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-9 py-4 border border-ivory/40 text-ivory font-nav font-medium text-sm tracking-[0.14em] uppercase hover:bg-ivory/10 hover:border-ivory transition-all duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
