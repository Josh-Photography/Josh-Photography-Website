import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, Star } from 'lucide-react'
import { packages } from '../../data/packages'

export default function PackagesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-cream" aria-label="Packages">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-section-label"
          >
            Investment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-section-title mb-4"
          >
            Our Packages
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '4rem' } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="gold-line-center mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-section-subtitle mx-auto"
          >
            Tailored packages designed for every kind of celebration.
            Every package is customizable to suit your unique needs.
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * index + 0.3, duration: 0.7 }}
              className={`relative p-8 lg:p-10 transition-all duration-600 ease-luxury ${
                pkg.popular
                  ? 'bg-charcoal text-ivory shadow-luxury-lg scale-[1.02]'
                  : 'bg-ivory border border-champagne/40 hover:shadow-luxury'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-gold text-deep-black text-[0.6rem] uppercase tracking-[0.2em] font-sans font-bold px-4 py-1.5">
                  Most Popular
                </div>
              )}

              {/* Package Name */}
              <h3 className={`font-serif text-heading-lg mb-1 ${
                pkg.popular ? 'text-ivory' : 'text-charcoal'
              }`}>
                {pkg.name}
              </h3>
              <p className={`text-body-sm font-light mb-6 ${
                pkg.popular ? 'text-ivory/60' : 'text-warm-brown/60'
              }`}>
                {pkg.subtitle}
              </p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-current/10">
                <span className={`font-serif text-heading-md ${
                  pkg.popular ? 'text-gold-light' : 'text-gold'
                }`}>
                  {pkg.price}
                </span>
              </div>

              {/* Description */}
              <p className={`text-body-sm font-light leading-relaxed mb-6 ${
                pkg.popular ? 'text-ivory/70' : 'text-warm-brown/60'
              }`}>
                {pkg.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      pkg.popular ? 'text-gold-light' : 'text-gold'
                    }`} />
                    <span className={`text-body-sm font-light ${
                      pkg.popular ? 'text-ivory/70' : 'text-warm-brown/70'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={`/check-availability?package=${pkg.id}`}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 font-nav text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-muted-gold text-deep-black hover:bg-gold-light shadow-sm border border-champagne/40'
                    : 'border border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-ivory'
                }`}
              >
                <span>{pkg.cta || 'Request Pricing'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-body-sm text-warm-brown/70 mb-4 font-light">
            Need something tailored? Every celebration is distinct.
          </p>
          <Link
            to="/check-availability"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light transition-all shadow-sm border border-champagne/40"
          >
            <span>Request Custom Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
