import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2,
  Calendar, Users, Sparkles, MessageSquare
} from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { WhatsAppIcon } from '../components/common/Icons'

const eventOptions = [
  'Wedding Ceremony & Reception',
  'Pre-Wedding Couple Session',
  'Engagement Ceremony',
  'Birthday Celebration',
  'Baby & Family Portraits',
  'Anniversary Milestone',
  'Personal / Executive Portrait',
  'Corporate Event / Conference',
  'Cultural Festival / Special Occasion',
  'Other Celebration',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Ceremony & Reception',
    date: '',
    location: '',
    guestCount: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  const whatsappMessage = encodeURIComponent(
    `Hello ${siteConfig.studioName}! My name is ${formData.name || '[Name]'}. I would like to inquire about ${formData.eventType} on ${formData.date || '[Date]'} at ${formData.location || '[Location]'}.`
  )

  return (
    <div className="bg-ivory">
      {/* Contact Hero */}
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
            <span>GET IN TOUCH · JOSH PHOTOGRAPHY</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#FAF4EA] font-light tracking-wide mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] leading-[1.14]"
          >
            Let's Tell Your Story
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
            We would be honored to preserve your most meaningful memories. Share your plans with us below.
          </motion.p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left: Studio Info Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 bg-cream/40 border border-[#D8B77A]/50 shadow-sm rounded-sm">
              <div className="space-y-6">
                <div>
                  <span className="text-caption uppercase tracking-[0.2em] text-[#B9975B] font-sans font-medium block mb-2 text-xs">
                    Studio Concierge
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-3">
                    Visit Us or Connect
                  </h2>
                  <p className="text-warm-brown/80 text-body-sm font-light leading-relaxed">
                    We welcome couples and families by appointment to review handcrafted album samples, screen 4K cinema showreels, and chat over coffee.
                  </p>
                </div>

                {/* Contact Details List */}
                <div className="space-y-5 pt-4 border-t border-[#D8B77A]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-charcoal font-medium mb-0.5">Studio Address</h4>
                      <p className="text-warm-brown/80 text-xs sm:text-sm font-light">{siteConfig.address}</p>
                      <a
                        href={siteConfig.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-gold hover:underline uppercase tracking-wider font-sans mt-1 inline-block"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-charcoal font-medium mb-0.5">Direct Call</h4>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                        className="text-warm-brown/80 text-xs sm:text-sm font-light hover:text-gold transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                      <p className="text-[11px] text-warm-brown/60 font-sans mt-0.5">Mon – Sun, 9:00 AM – 8:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-charcoal font-medium mb-0.5">Email Inquiries</h4>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-warm-brown/80 text-xs sm:text-sm font-light hover:text-gold transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Card */}
              <div className="mt-8 p-6 bg-[#2B170E] text-ivory border border-[#D8B77A]/30 rounded-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  <h3 className="font-serif text-lg text-ivory">Need An Immediate Answer?</h3>
                </div>
                <p className="text-ivory/70 text-xs font-light mb-4 leading-relaxed">
                  For last-minute date checks or urgent inquiries, message our lead team directly on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-[#1A1715] text-xs uppercase tracking-widest font-sans font-semibold hover:bg-[#20ba5a] transition-all rounded-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right: Booking Inquiry Form */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="h-full p-8 md:p-10 bg-cream/40 border border-[#D8B77A]/50 shadow-sm rounded-sm flex flex-col justify-between">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-2">
                      Inquiry Received
                    </span>
                    <h3 className="font-serif text-3xl text-charcoal mb-4">
                      Thank You, {formData.name || 'Friend'}!
                    </h3>
                    <p className="text-warm-brown/80 text-body-md font-light max-w-md mx-auto mb-8">
                      We have received your celebration details. Our creative director will review your dates and connect with you within 24 hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gold text-deep-black text-xs uppercase tracking-wider font-sans font-medium hover:bg-gold-light"
                      >
                        Follow Up On WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 border border-charcoal/30 text-charcoal text-xs uppercase tracking-wider font-sans hover:border-gold"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-2">
                        Event Details
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-light">
                        Tell Us About Your Celebration
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Eleanor & James"
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 7988 827057"
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="eleanor@example.co.uk"
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Event Type *
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        >
                          {eventOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Event Date(s) *
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Venue / City *
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Grand Manor Estate / Botanical Gardens / Historic Chapel"
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Est. Guest Count
                        </label>
                        <input
                          type="text"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleChange}
                          placeholder="e.g. 250 Guests"
                          className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                        Tell Us About Your Vision & Special Requests
                      </label>
                      <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what moments matter most to you, any multi-day ceremony schedule, or aesthetic preferences..."
                        className="w-full bg-ivory border border-champagne p-4 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-deep-black text-ivory font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-deep-black transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Booking Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
