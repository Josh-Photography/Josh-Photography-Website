import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Heart, Film, Camera, Cake, Building2, Users } from 'lucide-react'
import { services } from '../data/services'
import { siteConfig } from '../data/siteConfig'

const processSteps = [
  {
    num: '01',
    title: 'Consultation & Vision',
    desc: 'We meet over tea or a video call to understand your event timeline, personal style, must-have family portraits, and vision.',
  },
  {
    num: '02',
    title: 'The Experience',
    desc: 'On your celebration day, we bring a calm, unobtrusive presence. We guide when needed and step back to let genuine emotions unfold.',
  },
  {
    num: '03',
    title: 'Artful Curation & Grading',
    desc: 'Every image is individually color-corrected, cropped, and toned to our signature warm, luminous editorial aesthetic.',
  },
  {
    num: '04',
    title: 'Heirloom Delivery',
    desc: 'You receive a private online high-resolution gallery, digital archive download, and handcrafted leather album proofs.',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-ivory">
      {/* Services Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-deep-charcoal text-ivory overflow-hidden border-b border-[#D8B77A]/25">
        <div className="container-luxury text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-caption uppercase tracking-[0.25em] text-champagne font-nav font-semibold block mb-4"
          >
            02 — OUR SERVICES
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide mb-6"
          >
            Our Craft & Capabilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-ivory/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive photography and cinematic film solutions designed for discerning families and creative couples.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="relative overflow-hidden aspect-[4/3] bg-beige border border-champagne shadow-luxury group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-3">
                      Service {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-4">
                      {service.title}
                    </h2>
                    <p className="text-warm-brown/80 text-body-md font-light leading-relaxed mb-6">
                      {service.description || service.shortDescription}
                    </p>

                    {service.includes && (
                      <div className="mb-8">
                        <span className="text-xs uppercase tracking-wider text-charcoal font-sans font-semibold block mb-3">
                          What’s Included:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.includes.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-body-sm text-warm-brown/80">
                              <Check className="w-4 h-4 text-gold flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <Link
                        to={service.path}
                        className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wider text-gold hover:text-gold-dark transition-colors duration-300 font-medium group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <span className="text-champagne">|</span>
                      <Link
                        to="/contact"
                        className="text-sm font-sans uppercase tracking-wider text-charcoal/70 hover:text-charcoal transition-colors duration-300"
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="section-padding bg-cream/50 border-t border-champagne">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-3">
              Workflow
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
              How We Work With You
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="bg-ivory p-8 border border-champagne/80 hover:border-gold transition-all duration-300"
              >
                <span className="font-serif text-4xl text-gold/40 block mb-4">
                  {step.num}
                </span>
                <h3 className="font-serif text-xl text-charcoal mb-3">{step.title}</h3>
                <p className="text-warm-brown/75 text-body-sm font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="section-padding bg-deep-black text-ivory text-center">
        <div className="container-luxury max-w-3xl mx-auto px-6">
          <span className="text-caption uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-3">
            Custom Commissions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory mb-6">
            Have A Unique Event In Mind?
          </h2>
          <p className="text-ivory/70 text-body-md font-light mb-10 leading-relaxed">
            From multi-day destination celebrations to private studio portraits, we craft tailored coverage bespoke to your exact schedule and preferences.
          </p>
          <Link
            to="/check-availability"
            className="inline-flex items-center justify-center px-9 py-4 bg-muted-gold text-ivory font-nav font-medium text-sm tracking-[0.14em] uppercase transition-all duration-300 hover:bg-[#A8874D] hover:-translate-y-0.5 shadow-luxury"
          >
            Check Availability & Plan
          </Link>
        </div>
      </section>
    </div>
  )
}
