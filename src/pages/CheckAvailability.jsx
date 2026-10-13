import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Send, Clock, MapPin, Sparkles, AlertCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { WhatsAppIcon } from '../components/common/Icons'
import dataService from '../services/dataService'
import { useWebsiteData } from '../hooks/useWebsiteData'

const eventTypeOptions = [
  'Wedding',
  'Pre-Wedding',
  'Engagement',
  'Birthday',
  'Baby Celebration',
  'Anniversary',
  'Family',
  'Festival',
  "Mother's Day",
  "Father's Day",
  'Corporate',
  'Portrait',
  'Other',
]

const packageOptions = [
  'Essential Collection (Intimate Celebrations)',
  'Premium Collection (Most Popular — Full Day)',
  'Signature Cinema & Photo (Heirloom)',
  'Custom Bespoke Proposal',
]

const requirementOptions = [
  'Candid & Traditional Photography',
  'Cinematic 4K Wedding / Event Film',
  'Drone Aerial Cinematography',
  'Handcrafted Italian Photo Album',
  'Pre-Event Teaser Reel (48hr Delivery)',
]

export default function CheckAvailability() {
  const { studio = {}, settings = {} } = useWebsiteData()
  const studioName = settings.siteName || studio.name || siteConfig.studioName
  const studioWhatsapp = studio.whatsapp || siteConfig.whatsapp
  const cleanWhatsapp = String(studioWhatsapp).replace(/[^0-9]/g, '')
  const [searchParams] = useSearchParams()
  const todayDateString = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    date: '',
    location: '',
    guestCount: '',
    packagePreference: 'Premium Collection (Most Popular — Full Day)',
    requirements: ['Candid & Traditional Photography'],
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam) {
      const matched = eventTypeOptions.find(
        (opt) => opt.toLowerCase().includes(typeParam.toLowerCase())
      )
      if (matched) {
        setFormData((prev) => ({ ...prev, eventType: matched }))
      }
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrorMsg('')
  }

  const handleRequirementToggle = (req) => {
    setFormData((prev) => {
      const exists = prev.requirements.includes(req)
      return {
        ...prev,
        requirements: exists
          ? prev.requirements.filter((r) => r !== req)
          : [...prev.requirements, req],
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.date) {
      setErrorMsg('Please select an event date.')
      return
    }
    if (formData.date < todayDateString) {
      setErrorMsg('Please choose an upcoming date.')
      return
    }

    setLoading(true)

    // Store in localStorage for client persistence
    try {
      const existing = JSON.parse(localStorage.getItem('studio_inquiries') || '[]')
      existing.push({ ...formData, timestamp: new Date().toISOString() })
      localStorage.setItem('studio_inquiries', JSON.stringify(existing))
    } catch {
      // ignore storage error
    }

    try {
      await dataService.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.eventType,
        date: formData.date,
        location: formData.location,
        guestCount: formData.guestCount,
        subject: `Date Availability Check: ${formData.eventType} (${formData.date})`,
        message: `Package: ${formData.packagePreference}\nRequirements: ${formData.requirements.join(', ')}\nMessage: ${formData.message || 'None'}`
      })
    } catch (err) {
      console.warn('Backend availability submit error:', err)
    }

    setLoading(false)
    setSubmitted(true)
  }

  const whatsappMessage = encodeURIComponent(
    `Hello ${studioName}! I would like to check date availability:\n` +
      `• Name: ${formData.name || 'Inquirer'}\n` +
      `• Event: ${formData.eventType}\n` +
      `• Date: ${formData.date || 'TBD'}\n` +
      `• Location: ${formData.location || 'To be confirmed'}\n` +
      `• Guests: ${formData.guestCount || 'Not specified'}\n` +
      `• Package: ${formData.packagePreference}`
  )

  return (
    <div className="bg-ivory pt-24 min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-[#F5EEE3]/90 border-b border-[#D8B77A]/25 text-center">
        <div className="container-luxury max-w-3xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-caption uppercase tracking-[0.25em] text-muted-gold font-nav font-semibold block mb-3"
          >
            DATE AVAILABILITY & CONSULTATION
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal tracking-wide mb-6"
          >
            Let's Plan Your Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-warm-brown/85 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            Tell us about your celebration and we'll help you create the right photography experience.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury max-w-4xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#F5EEE3]/70 border border-champagne p-10 md:p-16 text-center shadow-luxury"
            >
              <div className="w-16 h-16 rounded-full bg-champagne/30 text-muted-gold flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-caption uppercase tracking-[0.2em] text-muted-gold font-nav font-semibold block mb-2">
                INQUIRY LOGGED
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                Thank You, {formData.name || 'Friend'}!
              </h2>
              <p className="text-warm-brown/85 text-body-md font-light max-w-md mx-auto mb-8 leading-relaxed">
                We have received your dates for <strong>{formData.eventType}</strong> on{' '}
                <strong>{formData.date}</strong>. Our creative director will review date availability and connect with you shortly.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-deep-black font-nav text-xs uppercase tracking-wider font-semibold hover:bg-[#20ba5a] transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Follow-Up</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3.5 border border-charcoal/40 text-charcoal font-nav text-xs uppercase tracking-wider hover:border-muted-gold hover:text-muted-gold transition-colors"
                >
                  Edit Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#F5EEE3]/50 border border-champagne/70 p-8 sm:p-12 md:p-16 shadow-luxury">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 bg-rose-100/80 border border-rose-300 text-rose-900 rounded-sm flex items-center gap-3 text-sm font-nav">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Personal Information */}
                <div>
                  <h3 className="font-serif text-2xl text-charcoal mb-4 border-b border-champagne/40 pb-2">
                    01. Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ananya Sundar"
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ananya@example.com"
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-serif text-2xl text-charcoal mb-4 border-b border-champagne/40 pb-2">
                    02. Celebration Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Event Type *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      >
                        {eventTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        min={todayDateString}
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Event Location / Venue *
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Country Manor Estate / Botanical Gardens / Historic Chapel"
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                        Expected Guests
                      </label>
                      <input
                        type="text"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        placeholder="e.g. 150–250"
                        className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Package & Requirements */}
                <div>
                  <h3 className="font-serif text-2xl text-charcoal mb-4 border-b border-champagne/40 pb-2">
                    03. Coverage Scope & Preferences
                  </h3>

                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                      Preferred Package Tier
                    </label>
                    <select
                      name="packagePreference"
                      value={formData.packagePreference}
                      onChange={handleChange}
                      className="w-full bg-ivory border border-champagne px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors font-sans"
                    >
                      {packageOptions.map((pkg) => (
                        <option key={pkg} value={pkg}>
                          {pkg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-3">
                      Photography Requirements (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {requirementOptions.map((req) => {
                        const checked = formData.requirements.includes(req)
                        return (
                          <div
                            key={req}
                            onClick={() => handleRequirementToggle(req)}
                            className={`p-3.5 border cursor-pointer flex items-center gap-3 transition-colors text-xs font-nav ${
                              checked
                                ? 'bg-ivory border-muted-gold text-charcoal font-semibold'
                                : 'bg-transparent border-champagne/60 text-charcoal/75 hover:bg-ivory/50'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                                checked ? 'bg-muted-gold border-muted-gold text-deep-black' : 'border-champagne'
                              }`}
                            >
                              {checked && <span className="text-[10px] leading-none font-bold">✓</span>}
                            </div>
                            <span>{req}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Message / Vision */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-nav font-medium mb-2">
                    Additional Message / Personal Vision
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what moments matter most to you, any multi-day ceremony schedule, or special requests..."
                    className="w-full bg-ivory border border-champagne p-4 text-charcoal text-sm focus:outline-none focus:border-muted-gold transition-colors resize-none font-sans"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 py-4 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.18em] font-semibold hover:bg-gold-light transition-all shadow-sm flex items-center justify-center gap-2 border border-champagne/40"
                  >
                    {loading ? (
                      <span>Checking Availability...</span>
                    ) : (
                      <>
                        <span>Check Availability</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-deep-black font-nav text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Send Enquiry via WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
