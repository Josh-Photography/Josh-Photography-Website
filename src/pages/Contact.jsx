import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2,
  Calendar, Users, Sparkles, MessageSquare, AlertCircle
} from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { WhatsAppIcon } from '../components/common/Icons'
import { useWebsiteData } from '../hooks/useWebsiteData'
import {
  getWhatsAppUrl,
  getCleanWhatsAppNumber,
  formatBookingInquiryMessage,
  openWhatsAppChat,
  DEFAULT_WHATSAPP_DISPLAY,
} from '../utils/whatsapp'

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
  const { studio = {}, settings = {}, submitContact } = useWebsiteData()
  const studioName = settings.siteName || studio.name || siteConfig.studioName
  const phone = studio.phone || siteConfig.phone
  const email = studio.email || siteConfig.email
  const address = studio.address || siteConfig.address
  const rawWhatsapp = studio.whatsapp || siteConfig.whatsapp
  const openingHours = studio.openingHours || 'Monday – Sunday, 9:00 AM – 8:00 PM'

  // Centralized WhatsApp link for "Start WhatsApp Chat" quick button
  const startWhatsAppChatUrl = getWhatsAppUrl(
    rawWhatsapp,
    `Hello ${studioName}! I would like to inquire about your photography services.`
  )

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
  const [validationErrors, setValidationErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear validation error when user begins typing in that field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
    if (generalError) {
      setGeneralError('')
    }
  }

  const validateBookingForm = () => {
    const errors = {}
    if (!formData.name?.trim()) {
      errors.name = 'Please enter your full name.'
    }
    if (!formData.phone?.trim()) {
      errors.phone = 'Please enter your phone or WhatsApp number.'
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      errors.phone = 'Please enter a valid phone number.'
    }
    if (!formData.email?.trim()) {
      errors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!formData.date?.trim()) {
      errors.date = 'Please select your celebration date.'
    }
    if (!formData.location?.trim()) {
      errors.location = 'Please specify your venue or city.'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validate required booking fields before redirecting (keeps data safe)
    const errors = validateBookingForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setGeneralError('Please complete all required fields marked with an asterisk (*) to proceed.')
      return
    }

    setValidationErrors({})
    setGeneralError('')
    setLoading(true)

    // 2. Format pre-filled message with all 8 customer-entered details
    const bookingMessage = formatBookingInquiryMessage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      date: formData.date,
      location: formData.location,
      guestCount: formData.guestCount,
      message: formData.message,
    })

    const bookingWhatsappUrl = getWhatsAppUrl(rawWhatsapp, bookingMessage)

    // 3. Immediately launch WhatsApp to configured number (desktop or mobile)
    openWhatsAppChat(bookingWhatsappUrl)

    // 4. Concurrently record inquiry in backend database
    try {
      if (submitContact) {
        await submitContact({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.eventType,
          date: formData.date,
          location: formData.location,
          guestCount: formData.guestCount,
          budget: formData.budget,
          message: formData.message,
          subject: `Booking Inquiry for ${formData.eventType} (${formData.date})`,
        })
      }
    } catch (err) {
      console.warn('Backend contact submission fallback:', err)
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const formattedBookingWhatsAppUrl = getWhatsAppUrl(
    rawWhatsapp,
    formatBookingInquiryMessage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      date: formData.date,
      location: formData.location,
      guestCount: formData.guestCount,
      message: formData.message,
    })
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
            Whether planning an intimate countryside ceremony or a grand milestone jubilee, we would love to hear your vision.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-28">
        <div className="container-luxury px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Studio Contact Details & Direct WhatsApp Quick Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-2">
                  Studio Contact
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-6">
                  {studioName}
                </h2>
                <p className="text-warm-brown/80 text-body-md font-light mb-8 leading-relaxed">
                  We look forward to connecting with you. Reach out through our direct studio channels or submit your celebration details via WhatsApp.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-charcoal font-medium mb-0.5">Studio Location</h4>
                      <p className="text-warm-brown/80 text-xs sm:text-sm font-light leading-relaxed">{address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-charcoal font-medium mb-0.5">Direct Call</h4>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="text-warm-brown/80 text-xs sm:text-sm font-light hover:text-gold transition-colors"
                      >
                        {phone}
                      </a>
                      <p className="text-[11px] text-warm-brown/60 font-sans mt-0.5">{openingHours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-charcoal font-medium mb-0.5">Email Inquiries</h4>
                      <a
                        href={`mailto:${email}`}
                        className="text-warm-brown/80 text-xs sm:text-sm font-light hover:text-gold transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. START WHATSAPP CHAT (Direct WhatsApp Quick Card) */}
              <div className="mt-8 p-6 bg-[#2B170E] text-ivory border border-[#D8B77A]/30 rounded-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  <h3 className="font-serif text-lg text-ivory">Need An Immediate Answer?</h3>
                </div>
                <p className="text-ivory/70 text-xs font-light mb-4 leading-relaxed">
                  For last-minute date checks or urgent inquiries, message our lead team directly on WhatsApp ({DEFAULT_WHATSAPP_DISPLAY}).
                </p>
                <a
                  href={startWhatsAppChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-[#1A1715] text-xs uppercase tracking-widest font-sans font-semibold hover:bg-[#20ba5a] transition-all rounded-sm shadow-sm"
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
                      Inquiry Prepared & Logged
                    </span>
                    <h3 className="font-serif text-3xl text-charcoal mb-4">
                      Thank You, {formData.name || 'Friend'}!
                    </h3>
                    <p className="text-warm-brown/80 text-body-md font-light max-w-md mx-auto mb-6">
                      We have prepared your celebration details for WhatsApp to <strong>{DEFAULT_WHATSAPP_DISPLAY}</strong>. If WhatsApp did not open automatically, tap below:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <a
                        href={formattedBookingWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-[#25D366] text-[#1A1715] text-xs uppercase tracking-wider font-sans font-semibold hover:bg-[#20ba5a] inline-flex items-center gap-2 rounded-sm shadow-sm transition-all"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>Continue on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3.5 border border-charcoal/30 text-charcoal text-xs uppercase tracking-wider font-sans hover:border-gold transition-colors"
                      >
                        Edit Details / Submit Another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                      <span className="text-caption uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-2">
                        Event Details
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-light">
                        Tell Us About Your Celebration
                      </h3>
                    </div>

                    {/* General Validation Error Alert */}
                    {generalError && (
                      <div className="p-3.5 bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2.5 rounded-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                        <span>{generalError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Eleanor & James"
                          className={`w-full bg-ivory border px-4 py-3 text-charcoal text-sm focus:outline-none transition-colors ${
                            validationErrors.name ? 'border-red-500 focus:border-red-600' : 'border-champagne focus:border-gold'
                          }`}
                        />
                        {validationErrors.name && (
                          <p className="text-[11px] text-red-600 font-sans mt-1">{validationErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 7988 827057"
                          className={`w-full bg-ivory border px-4 py-3 text-charcoal text-sm focus:outline-none transition-colors ${
                            validationErrors.phone ? 'border-red-500 focus:border-red-600' : 'border-champagne focus:border-gold'
                          }`}
                        />
                        {validationErrors.phone && (
                          <p className="text-[11px] text-red-600 font-sans mt-1">{validationErrors.phone}</p>
                        )}
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
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="eleanor@example.co.uk"
                          className={`w-full bg-ivory border px-4 py-3 text-charcoal text-sm focus:outline-none transition-colors ${
                            validationErrors.email ? 'border-red-500 focus:border-red-600' : 'border-champagne focus:border-gold'
                          }`}
                        />
                        {validationErrors.email && (
                          <p className="text-[11px] text-red-600 font-sans mt-1">{validationErrors.email}</p>
                        )}
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
                          value={formData.date}
                          onChange={handleChange}
                          className={`w-full bg-ivory border px-4 py-3 text-charcoal text-sm focus:outline-none transition-colors ${
                            validationErrors.date ? 'border-red-500 focus:border-red-600' : 'border-champagne focus:border-gold'
                          }`}
                        />
                        {validationErrors.date && (
                          <p className="text-[11px] text-red-600 font-sans mt-1">{validationErrors.date}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-charcoal font-sans font-medium mb-2">
                          Venue / City *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Grand Manor Estate / Historic Chapel"
                          className={`w-full bg-ivory border px-4 py-3 text-charcoal text-sm focus:outline-none transition-colors ${
                            validationErrors.location ? 'border-red-500 focus:border-red-600' : 'border-champagne focus:border-gold'
                          }`}
                        />
                        {validationErrors.location && (
                          <p className="text-[11px] text-red-600 font-sans mt-1">{validationErrors.location}</p>
                        )}
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

                    {/* 2. SUBMIT BOOKING INQUIRY BUTTON */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-deep-black text-ivory font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-deep-black transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Opening WhatsApp & Submitting...</span>
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
