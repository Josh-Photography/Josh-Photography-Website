import { validateQueryTopic, OFF_TOPIC_RESPONSE } from './topicFilter.js'
import { getKnowledgeBase } from './chatKnowledge.js'

/**
 * Normalizes user text for robust keyword and intent matching
 */
function normalizeText(str = '') {
  return str
    .toLowerCase()
    .replace(/[^\w\s£$€%-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Precise word & phrase matching (prevents substring false matches)
 */
function hasWord(text = '', keywords = []) {
  if (!text) return false
  return keywords.some((kw) => {
    if (kw.includes(' ')) {
      return text.includes(kw)
    }
    return new RegExp(`(^|\\s)${kw}(\\s|$)`, 'i').test(text)
  })
}

/**
 * Resolves context from recent conversation turns
 */
function resolveContext(history = []) {
  let recentTopic = null
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i]
    if (!msg || !msg.content) continue
    const c = msg.content.toLowerCase()
    if (c.includes('wedding')) recentTopic = 'weddings'
    else if (c.includes('birthday')) recentTopic = 'birthdays'
    else if (c.includes('maternity')) recentTopic = 'maternity'
    else if (c.includes('family')) recentTopic = 'family'
    else if (c.includes('anniversary')) recentTopic = 'anniversary'
    else if (c.includes('newborn') || c.includes('baby')) recentTopic = 'baby-family'
    else if (c.includes('car') || c.includes('vehicle')) recentTopic = 'car-shoot'
    else if (c.includes('sport')) recentTopic = 'sports-shoot'
    else if (c.includes('product')) recentTopic = 'product-shoot'
    else if (c.includes('reel') || c.includes('video')) recentTopic = 'reels-shoot'
    else if (c.includes('model') || c.includes('fashion')) recentTopic = 'model-shoot'
    else if (c.includes('offer') || c.includes('discount')) recentTopic = 'offers'
    else if (c.includes('package') || c.includes('price')) recentTopic = 'pricing'
    else if (c.includes('studio') || c.includes('location')) recentTopic = 'studio'
    if (recentTopic) break
  }
  return recentTopic
}

/**
 * Matches category in user query from the 17 photography categories
 */
  function matchCategory(norm, kb) {
    const categories = kb.categories || []

    // Check specific identifiers and aliases
    if (hasWord(norm, ['car', 'cars', 'vehicle', 'vehicles', 'automotive', 'supercar', 'aston martin'])) {
      return categories.find((c) => c.id === 'car-shoot')
    }
    if (hasWord(norm, ['sport', 'sports', 'athlete', 'athletic', 'tournament', 'football', 'tennis'])) {
      return categories.find((c) => c.id === 'sports-shoot')
    }
    if (hasWord(norm, ['product', 'products', 'e-commerce', 'packshot', 'bottles', 'macro product', 'commercial product'])) {
      return categories.find((c) => c.id === 'product-shoot')
    }
    if (hasWord(norm, ['reel', 'reels', 'vertical video', 'tiktok', 'short-form', 'social video'])) {
      return categories.find((c) => c.id === 'reels-shoot')
    }
    if (hasWord(norm, ['model', 'models', 'modeling', 'modelling', 'fashion', 'couture', 'z-card', 'comp card', 'lookbook'])) {
      return categories.find((c) => c.id === 'model-shoot')
    }
    if (hasWord(norm, ['wedding', 'weddings', 'church wedding', 'bride', 'groom', 'nuptial', 'nuptials', 'altar', 'vows'])) {
      return categories.find((c) => c.id === 'weddings')
    }
    if (hasWord(norm, ['birthday', 'birthdays', 'bday', 'cake smash', 'jubilees'])) {
      return categories.find((c) => c.id === 'birthdays')
    }
    if (hasWord(norm, ['engagement', 'engagements', 'proposal', 'propose', 'pre-wedding', 'prewedding'])) {
      return categories.find((c) => c.id === 'engagement')
    }
    if (hasWord(norm, ['anniversary', 'anniversaries', 'silver jubilee', 'golden jubilee', 'vow renewal'])) {
      return categories.find((c) => c.id === 'anniversary')
    }
    if (hasWord(norm, ['baby', 'babies', 'newborn', 'infant', 'toddler'])) {
      return categories.find((c) => c.id === 'baby-family')
    }
    if (hasWord(norm, ['festival', 'festivals', 'cultural', 'christmas', 'diwali', 'eid', 'cultural celebrations'])) {
      return categories.find((c) => c.id === 'festivals')
    }
    if (hasWord(norm, ["mother's day", 'mothers day', 'mother day', 'mom day'])) {
      return categories.find((c) => c.id === 'mothers-day')
    }
    if (hasWord(norm, ["father's day", 'fathers day', 'father day', 'dad day'])) {
      return categories.find((c) => c.id === 'fathers-day')
    }
    if (hasWord(norm, ['corporate', 'conference', 'summit', 'business event', 'headshot', 'headshots', 'corporate event'])) {
      return categories.find((c) => c.id === 'corporate-events')
    }
    if (hasWord(norm, ['family', 'families', 'parents', 'grandparents', 'multi-generational'])) {
      return categories.find((c) => c.id === 'family')
    }
    if (hasWord(norm, ['maternity', 'pregnancy', 'pregnant', 'baby bump', 'expecting'])) {
      return categories.find((c) => c.id === 'maternity')
    }
    if (hasWord(norm, ['graduation', 'graduations', 'degree', 'convocation', 'university celebration', 'regalia'])) {
      return categories.find((c) => c.id === 'graduations')
    }

    return null
  }

  /**
   * Matches an active promotional campaign based on user query
   */
  function matchOffer(norm, kb) {
    const offers = kb.offers || []

    // Check specific festival or occasion keywords
    const holidayKeywords = [
      { key: 'christmas', label: 'Christmas' },
      { key: 'holiday', label: 'Christmas & Holiday Season' },
      { key: 'xmas', label: 'Christmas' },
      { key: 'festive', label: 'Festive Season' },
      { key: 'diwali', label: 'Diwali' },
      { key: 'eid', label: 'Eid' },
      { key: 'easter', label: 'Easter' },
      { key: 'new year', label: 'New Year' },
      { key: 'halloween', label: 'Halloween' },
      { key: 'valentine', label: "Valentine's Day" },
    ]

    for (const h of holidayKeywords) {
      if (hasWord(norm, [h.key])) {
        const found = offers.find(
          (o) =>
            o.festival?.toLowerCase().includes(h.key) ||
            o.title?.toLowerCase().includes(h.key) ||
            (h.key === 'christmas' && Array.isArray(o.categories) && o.categories.includes('festivals'))
        )
        return { offer: found || null, specific: h.label }
      }
    }

    // Check categories for category-specific offers
    const categoryOfferMappings = [
      { keys: ['wedding', 'weddings', 'nuptial'], catId: 'weddings', label: 'Wedding' },
      { keys: ['birthday', 'birthdays', 'cake smash'], catId: 'birthdays', label: 'Birthday' },
      { keys: ['engagement', 'proposal', 'pre-wedding'], catId: 'engagement', label: 'Engagement' },
      { keys: ['anniversary', 'jubilee'], catId: 'anniversary', label: 'Anniversary' },
      { keys: ['baby', 'babies', 'newborn', 'infant'], catId: 'baby-family', label: 'Baby & Newborn' },
      { keys: ["mother's day", 'mothers day', 'mom'], catId: 'mothers-day', label: "Mother's Day" },
      { keys: ["father's day", 'fathers day', 'dad'], catId: 'fathers-day', label: "Father's Day" },
      { keys: ['corporate', 'conference', 'summit'], catId: 'corporate-events', label: 'Corporate Event' },
      { keys: ['family', 'families'], catId: 'family', label: 'Family' },
      { keys: ['maternity', 'pregnancy'], catId: 'maternity', label: 'Maternity' },
      { keys: ['graduation', 'graduations', 'degree'], catId: 'graduations', label: 'Graduation' },
      { keys: ['car', 'cars', 'vehicle', 'automotive'], catId: 'car-shoot', label: 'Car & Vehicle' },
      { keys: ['sport', 'sports', 'athletic'], catId: 'sports-shoot', label: 'Sports' },
      { keys: ['product', 'products', 'commercial'], catId: 'product-shoot', label: 'Product' },
      { keys: ['reel', 'reels', 'vertical video'], catId: 'reels-shoot', label: 'Reels & Video' },
      { keys: ['model', 'models', 'fashion'], catId: 'model-shoot', label: 'Model & Fashion' },
    ]

    for (const m of categoryOfferMappings) {
      if (hasWord(norm, m.keys)) {
        const found = offers.find(
          (o) =>
            o.category === m.catId ||
            (Array.isArray(o.categories) && o.categories.includes(m.catId)) ||
            o.title?.toLowerCase().includes(m.keys[0])
        )
        return { offer: found || null, specific: m.label }
      }
    }

    return null
  }

  /**
   * Generates an intelligent, database-synchronized answer based on live website content
   */
  function generateDynamicAnswer(query, history = [], kb) {
    const norm = normalizeText(query)
    const recentTopic = resolveContext(history)

    const studio = kb.studio
    const about = kb.about
    const studioPhone = studio.phone || '+44 7988 827057'
    const studioWhatsapp = studio.whatsapp || '+44 7988 827057'
    const studioEmail = studio.email || 'joshyjose282@gmail.com'
    const studioAddress =
      studio.address || 'Unit H5/J, KG House, Northampton, Northamptonshire, NN5 7QS, United Kingdom'

    const cleanWhatsappDigits = String(studioWhatsapp).replace(/[^0-9]/g, '') || '447988827057'
    const baseWhatsAppUrl = `https://wa.me/${cleanWhatsappDigits}`

    const stats = about.stats || []
    const statWeddings = stats[0]?.value || '250+'
    const statFamilies = stats[1]?.value || '250+'
    const statCelebrations = stats[2]?.value || '200+'
    const statAwards = stats[3]?.value || '20+'

    // 1. Warm Greeting & Bot Identity
    if (
      hasWord(norm, ['hi', 'hello', 'hey', 'hiya', 'good morning', 'good afternoon', 'good evening', 'greetings']) &&
      norm.split(' ').length <= 4
    ) {
      return {
        reply: `Warm greetings! Welcome to **${studio.name}**. ✨\n\nI’m **Hello Chatbot**, your personal photography assistant. I can help you with:\n- 💍 **All 17 Photography Categories** (Weddings, Birthdays, Maternity, Car, Sports, Product, Reels, Model & more)\n- 🎁 **Current Promotional Offers & Discounts**\n- 💰 **Packages & Pricing** (Starting from £495)\n- 🏛️ **Studio Information, Northampton & De Fab Studio**\n- ⭐ **Real Client Reviews & Testimonials**\n- 📅 **Checking Date Availability & How to Book**\n\nWhat celebration or photography service can I assist you with today?`,
        suggestions: ['Wedding Packages & Pricing', 'Special Offers & Discounts', 'Check Availability', 'Where is your studio?'],
        actions: [
          { label: 'Explore Weddings', url: '/weddings', type: 'internal' },
          { label: 'Special Offers', url: '/special-offers', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
        ],
      }
    }

    // 2. Booking Process & Date Availability Intent (High Priority)
    if (
      hasWord(norm, [
        'how to book',
        'how do i book',
        'how can i book',
        'can i book',
        'want to book',
        'ready to book',
        'booking process',
        'how do we book',
        'steps to book',
        'reserve a date',
        'book a photographer',
        'book photographer',
        'booking',
      ])
    ) {
      return {
        reply: `### How to Book with Josh Photography 📅\n\nBooking your celebration is clear and straightforward:\n\n1. **Check Dates / Inquire:** Visit our [Check Availability](/check-availability) page or submit your details on our [Contact page](/contact).\n2. **Consultation:** We’ll arrange an unhurried consultation (video call, phone, or in person) to review your itinerary, aesthetic preferences, and package options.\n3. **Reservation:** To officially secure your date on our calendar, a service agreement and date retainer are completed.\n\n**Advance Booking Guidelines:**\n- **Weddings & Peak Weekend Dates:** We recommend inquiring **6 to 12 months in advance** as peak British summer and autumn dates fill quickly.\n- **Birthdays, Newborns, Family & Commercial Sessions:** **3 to 6 weeks notice** is ideal.\n\n*Please note: Calendar dates are only officially reserved once your consultation is held and the retainer is received.*`,
        suggestions: ['Check Date Availability', 'WhatsApp Josh Directly', 'View Packages & Pricing'],
        actions: [
          { label: 'Check Availability Now', url: '/check-availability', type: 'internal' },
          { label: 'Submit Contact Form', url: '/contact', type: 'internal' },
          {
            label: 'Chat on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh Photography! I would like to check availability for my celebration date.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 3. Client Testimonials & Reviews Intent
    if (
      hasWord(norm, [
      'review',
        'reviews',
        'testimonial',
        'testimonials',
        'feedback',
        'what clients say',
        'what customers say',
        'customer reviews',
        'client feedback',
        'ratings',
        'rating',
    ]) ||
      (norm.includes('say') && (norm.includes('client') || norm.includes('customer') || norm.includes('couples')))
  ) {
        const testimonials = kb.testimonials || []

    let matchedTestimonial = null
    if(hasWord(norm, ['wedding', 'weddings', 'bride', 'groom'])) {
        matchedTestimonial = testimonials.find((t) => (t.event || t.role || '').toLowerCase().includes('wedding'))
      } else if (hasWord(norm, ['birthday', 'birthdays', 'cake smash'])) {
        matchedTestimonial = testimonials.find((t) => (t.event || t.role || '').toLowerCase().includes('birthday'))
      } else if (hasWord(norm, ['anniversary'])) {
        matchedTestimonial = testimonials.find((t) => (t.event || t.role || '').toLowerCase().includes('anniversary'))
      } else if (hasWord(norm, ['engagement', 'proposal'])) {
        matchedTestimonial = testimonials.find((t) => (t.event || t.role || '').toLowerCase().includes('proposal') || (t.event || '').toLowerCase().includes('engagement'))
      }

      if (matchedTestimonial) {
        return {
          reply: `### Published Client Testimonial — ${matchedTestimonial.event} ⭐⭐⭐⭐⭐\n\nHere is what our client **${matchedTestimonial.name}** shared regarding their **${matchedTestimonial.event}** (${matchedTestimonial.location}):\n\n> *“${matchedTestimonial.review}”*\n\n— **${matchedTestimonial.name}**\n\nAll our reviews reflect genuine couples and families whose cherished milestones we have documented across the UK.`,
          suggestions: ['Read More Client Reviews', 'View Packages & Pricing', 'Check Availability'],
          actions: [
            { label: 'View All Reviews', url: '/testimonials', type: 'internal' },
            { label: 'Check Availability', url: '/check-availability', type: 'internal' },
            { label: 'Inquire on WhatsApp', url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I read your client reviews and would like to discuss our celebration.')}`, type: 'external' },
          ],
        }
      }

      const previewList = testimonials.slice(0, 3).map(
        (t) => `• **${t.name}** (${t.event}): *“${t.review?.slice(0, 140)}...”*`
      ).join('\n\n')

      return {
        reply: `### Published Client Reviews — Josh Photography ⭐⭐⭐⭐⭐\n\nHere are genuine testimonials from families and couples we’ve had the privilege of documenting:\n\n${previewList}\n\nYou can read all verified reviews on our [Client Testimonials](/testimonials) page!`,
        suggestions: ['Wedding Reviews', 'Birthday Reviews', 'View Packages', 'Check Availability'],
        actions: [
          { label: 'Read All Reviews', url: '/testimonials', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'WhatsApp Josh', url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to enquire about your photography services.')}`, type: 'external' },
        ],
      }
    }

    // 4. Packages & Pricing Inquiries (Customized by Category if specified)
    if (
      hasWord(norm, [
        'package price',
        'package prices',
        'packages price',
        'package cost',
        'package costs',
        'how much does it cost',
        'how much is',
        'pricing',
        'prices',
        'packages',
        'package',
        'rates',
        'fees',
        'quote',
        'budget',
        '£495',
        '£1150',
        'starting price',
        'starting from',
      ]) ||
        ((norm.includes('cost') || norm.includes('how much') || norm.includes('price')) && recentTopic)
    ) {
      let focusNote = ''
        if (norm.includes('wedding') || recentTopic === 'weddings') {
          focusNote = 'For weddings, couples most frequently choose our **Premium Package** (£1,150) for comprehensive 8-hour dual-photographer coverage and a handcrafted photo album, or our bespoke **Signature Package** for full-day cinema & photo.\n\n'
        } else if (norm.includes('birthday') || recentTopic === 'birthdays') {
          focusNote = 'For birthdays, our **Essential Package** (£495) covers up to 4 hours of celebration action, or **Premium** (£1,150) for complete day coverage with an heirloom album.\n\n'
        }

        return {
          reply: `### Official Photography Packages & Transparent Pricing 💰\n\n${focusNote}At **Josh Photography**, our transparent starting prices are:\n\n1. **Essential Package — Starting From £495**\n   - Up to 4 hours of continuous photographic coverage\n   - 1 professional photographer\n   - 200+ hand-edited high-resolution photographs\n   - Private online viewing & download gallery with full print release\n   - Fine-art color grading and individual retouching\n   - *Best for:* Intimate celebrations, first birthdays, civil ceremonies, maternity and newborn portraits.\n\n2. **Premium Package — Starting From £1,150 (Our Most Popular Choice)**\n   - Up to 8 hours of complete coverage\n   - 2 professional photographers (multi-angle perspectives simultaneously)\n   - 500+ hand-edited high-resolution master photographs\n   - Pre-event consultation & timeline planning\n   - Curated highlight slideshow set to music\n   - Handcrafted 30-page premium photo album\n   - *Best for:* Full-day weddings, grand milestone jubilees, and full-scale celebrations.\n\n3. **Signature Package — Request Pricing (Custom Luxury Commission)**\n   - Full-day unlimited coverage (12+ hours)\n   - 2 photographers + 1 dedicated cinematic videographer\n   - 800+ artistically edited photographs + 4K cinematic highlight film (5–8 min)\n   - Drone aerial coverage + 50-page signature heirloom album + 2 parent albums\n\n**Optional Add-ons:** Additional hours, extra photographer, aerial drone, same-day edit preview, album upgrades, fine-art canvas prints.`,
          suggestions: ['How do I book a package?', 'What is the delivery timeline?', 'Do you provide photo albums?', 'Check Availability'],
          actions: [
            { label: 'Check Availability', url: '/check-availability', type: 'internal' },
            { label: 'Special Offers', url: '/special-offers', type: 'internal' },
            {
              label: 'Inquire on WhatsApp',
              url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh Photography! I would like to inquire about package pricing and options.')}`,
              type: 'external',
            },
          ],
        }
      }

      // 5. Special Offers & Discounts Inquiries (Dynamic Admin Synchronization)
      const explicitPromoTerms = [
        'discount',
        'discounts',
        'deal',
        'deals',
        'promo',
        'promotions',
        'promotion',
        'promotional',
        'campaign',
        'campaigns',
        'sale',
        'sales',
        'special offer',
        'special offers',
        'seasonal offer',
        'seasonal offers',
        'percent off',
        'coupon',
        'coupons',
        'voucher',
        'vouchers',
        'validity',
        'expire',
        'expires',
      ]
      const hasExplicitPromo = hasWord(norm, explicitPromoTerms) || /% off/i.test(norm)
      const isGeneralOfferAsk =
        (norm === 'offer' ||
          norm === 'offers' ||
          /\b(any|current|latest|special|seasonal)\s+offers?\b/i.test(norm) ||
          /\boffers?\s+available\b/i.test(norm) ||
          /\bhave\s+an?\s+offer\b/i.test(norm) ||
          /\bwhat\s+(are\s+the\s+)?offers\b/i.test(norm) ||
          /\boffers?\s+and\s+discounts?\b/i.test(norm)) &&
        !hasWord(norm, ['do you offer', 'what do you offer', 'services you offer', 'can you offer'])

      const isOfferQuery = hasExplicitPromo || isGeneralOfferAsk

      if (isOfferQuery) {
        const matchedOfferData = matchOffer(norm, kb)
        const activeOffers = kb.offers || []

        // Specific category / holiday offer requested and IS active
        if (matchedOfferData && matchedOfferData.offer) {
          const o = matchedOfferData.offer
          const discountText = o.discountPercent ? `${o.discountPercent}% OFF` : 'Special Promotional Savings'
          const validityInfo = o.endDate
            ? `\n- ⏳ **Valid Until:** ${o.endDate}`
            : '\n- ⏳ **Validity:** Limited celebration seasonal window (subject to calendar availability)'
          const termsInfo = o.terms ? `\n- 📋 **Terms:** ${o.terms}` : ''

              return {
                reply: `### ${o.title} — ${discountText} 🎁\n\nYes! We currently have an active promotion for **${o.festival || matchedOfferData.specific}**:\n\n- 🏷️ **Promotional Discount:** **${o.discountPercent}% OFF**\n- 📢 **Campaign Highlight:** ${o.tagline || 'Bespoke savings on full celebration collections'}\n- 📖 **Details:** ${o.description}${validityInfo}${termsInfo}\n\nWould you like to lock in this promotional rate for your celebration?`,
                suggestions: ['How do I book this offer?', 'View All Special Offers', 'Check Date Availability'],
                actions: [
                  { label: 'View Special Offers', url: '/special-offers', type: 'internal' },
                  { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                  {
                    label: 'Claim via WhatsApp',
                    url: `${baseWhatsAppUrl}?text=${encodeURIComponent(`Hello Josh Photography! I would like to inquire about the ${o.title} (${o.discountPercent}% OFF).`)}`,
                    type: 'external',
                  },
                ],
              }
            }

              // Specific category / holiday asked for, but NOT currently active / unpublished
              if(matchedOfferData && !matchedOfferData.offer && matchedOfferData.specific) {
              return {
                reply: `### ${matchedOfferData.specific} Promotional Offers 🎁\n\nWe do not currently have an active promotional discount campaign published for **${matchedOfferData.specific}**.\n\nHowever, all our seasonal campaigns are updated regularly in our studio calendar. You can view all currently active promotions on our [Special Offers](/special-offers) page, or message Josh on WhatsApp to discuss bespoke celebration arrangements!`,
                suggestions: ['View All Special Offers', 'Check Availability', 'Packages & Pricing'],
                actions: [
                  { label: 'View Special Offers', url: '/special-offers', type: 'internal' },
                  { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                  {
                    label: 'Inquire on WhatsApp',
                    url: `${baseWhatsAppUrl}?text=${encodeURIComponent(`Hello Josh! Are there any upcoming promotions for ${matchedOfferData.specific}?`)}`,
                    type: 'external',
                  },
                ],
              }
            }

              // General offers inquiry: "What offers are available now?"
              if(activeOffers.length > 0) {
              const topOffers = activeOffers.slice(0, 4)
              const offersList = topOffers
                .map(
                  (o, idx) =>
                    `${idx + 1}. **${o.title}** — **${o.discountPercent}% OFF**\n   *${o.tagline || o.description}*`
                )
                .join('\n\n')

              return {
                reply: `### Current Promotional Campaigns & Special Offers 🎁\n\nWe currently have **${activeOffers.length} active promotional campaigns** configured:\n\n${offersList}\n\n*All promotional discounts apply automatically to our handcrafted collections and are subject to peak date availability.*`,
                suggestions: ['Christmas Offer', 'Birthday Discount', 'Wedding Offer', 'Check Availability'],
                actions: [
                  { label: 'View All Special Offers', url: '/special-offers', type: 'internal' },
                  { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                  {
                    label: 'Inquire via WhatsApp',
                    url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh Photography! I would like to inquire about your current special offers.')}`,
                    type: 'external',
                  },
                ],
              }
            }

            return {
              reply: `### Special Offers & Promotions 🎁\n\nWe do not currently have any active seasonal discount promotions published right now. However, all our photography collections feature transparent, competitive pricing starting from **£495** (Essential) and **£1,150** (Premium).\n\nPlease check back soon or visit our [Special Offers](/special-offers) page for upcoming seasonal announcements!`,
              suggestions: ['View Packages & Pricing', 'Check Availability', 'Contact Us'],
              actions: [
                { label: 'View Packages', url: '/packages', type: 'internal' },
                { label: 'Check Availability', url: '/check-availability', type: 'internal' },
              ],
            }
          }

          // 6. Category Inquiries across ALL 17 Photography Categories
          const matchedCat = matchCategory(norm, kb)
          if (matchedCat) {
            const waText = encodeURIComponent(
              `Hello ${studio.name}! I would like to inquire about your ${matchedCat.name} services.`
            )
            const specialtiesList = (matchedCat.specialties || [])
              .map((s) => `• ${s}`)
              .join('\n')

              return {
                reply: `### ${matchedCat.name} — Josh Photography 📷\n\n**${matchedCat.headline}**\n\n${matchedCat.description}\n\n**Our Key Specialties & Features:**\n${specialtiesList}\n\n- 💰 **Package Guide:** ${matchedCat.pricingGuide || 'Essential (£495) or Premium (£1,150)'}\n- 🖼️ **Portfolio Gallery:** Explore curated frames on our dedicated [${matchedCat.name}](${matchedCat.route}) page.\n\nWould you like to check date availability or discuss tailored coverage with Josh?`,
                suggestions: [`View ${matchedCat.name} Page`, 'Check Date Availability', 'Packages & Pricing', 'Client Reviews'],
                actions: [
                  { label: `Explore ${matchedCat.name}`, url: matchedCat.route, type: 'internal' },
                  { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                  { label: 'Inquire on WhatsApp', url: `${baseWhatsAppUrl}?text=${waText}`, type: 'external' },
                ],
              }
            }

              // 7. Founder, Lead Photographer, Experience Statistics & About Josh Photography
              if (
                hasWord(norm, [
                  'founder',
                  'who founded',
                  'who is the founder',
                  'who is founder',
                  'owner',
                  'who is owner',
                  'who owns',
                  'who is josh',
                  'about josh',
                  'lead photographer',
                  'experience',
                  'stats',
                  'statistics',
                  'how many weddings',
                  'how many families',
                  'awards',
                  'about us',
                  'about the studio',
                  'story',
                  'philosophy',
                  'what makes your photography different',
                  'what makes you different',
                ])
              ) {
                return {
                  reply: `### Meet Lead Photographer & Founder Josh 📷\n\n**${about.photographerName}** is the founder and lead photographer of **${studio.name}**!\n\n**Our Documented Milestones (Published Experience):**\n- 💍 **${statWeddings}** Weddings Captured\n- 👨‍👩‍👧‍👦 **${statFamilies}** Happy Families\n- 🥂 **${statCelebrations}** Celebrations Covered\n- 🏆 **${statAwards}** Industry Features & Awards\n\n**Our Professional Approach & Philosophy:**\n*“${about.photographerQuote}”*\n\n${about.photographerBio1}\n\n${about.photographerBio2}\n\n**Our Core Creative Pillars:**\n1. **Emotional Authenticity:** We never force artificial poses or stiff smiles.\n2. **Unobtrusive Documentary Approach:** We blend seamlessly into your wedding or family celebration.\n3. **Timeless Warmth & Elegant Composition:** Rich, organic tones that honor true skin tones.\n4. **Archival Heirloom Longevity:** Handcrafted albums and digital master files created to outlive generations.`,
                  suggestions: ['View Packages & Pricing', 'Read Client Testimonials', 'Where is your studio?', 'Check Availability'],
                  actions: [
                    { label: 'About Josh Photography', url: '/about', type: 'internal' },
                    { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
                    { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                  ],
                }
              }

                  // 8. Studio Locations, Northampton & De Fab Studio (Another Studio in the UK)
                  if(
                    hasWord(norm, [
                      'location',
                      'located',
                      'where is your photography studio',
                      'where is your studio',
                      'where are you located',
                      'where are you based',
                      'where is the studio',
                      'studio address',
                      'address',
                      'premises',
                      'northampton',
                      'kg house',
                      'de fab',
                      'de fab studio',
                      'defab',
                      'another studio',
                      'second studio',
                      'other studio',
                      'studio opening',
                      'studio space',
                      'visit',
                    ])
  ) {
                  const anotherStudio = kb.anotherStudio || {}

                  let anotherStudioBlock = ''
                  if (anotherStudio.enabled) {
                    anotherStudioBlock = `\n\n**🏛️ Introducing De Fab Studio — Our Additional UK Studio:**\nWe are delighted to introduce **De Fab Studio**, our additional photography studio in the United Kingdom! Expanding our commitment to capturing weddings, engagement sessions, birthdays, anniversaries, maternity shoots, newborn portraits, and commercial sessions with extraordinary artistry.`
                  }

                  return {
                    reply: `### Studio Information & Locations — Josh Photography 📍\n\n- 📍 **Primary Studio Address:** ${studioAddress}\n- 🏢 **Facility:** ${studio.location}\n- 🕒 **Opening Hours:** ${studio.openingHours}\n- 🗺️ **Commissions Region:** Available across Northamptonshire, Greater London, Surrey, Hertfordshire, the Cotswolds, and nationwide UK & destination events.\n\n**🏛️ Upcoming Dedicated Studio Space (Opening Next Month):**\nOur new dedicated studio premises in Northampton is opening next month, featuring 3 specialized concept areas:\n1. **Professional Studio Lighting & Modifiers:** Multi-point Godox strobes, parabolic umbrellas & softbox modifiers.\n2. **Client Consultation & Lounge:** Calm meeting space to review heirloom album swatches and screen cinematic films.\n3. **Dedicated Portrait & Editorial Stage:** Overhead lighting grid and seamless backdrops.${anotherStudioBlock}`,
                    suggestions: ['Check Availability', 'De Fab Studio', 'Contact Us', 'WhatsApp Josh'],
                    actions: [
                      { label: 'Contact Us', url: '/contact', type: 'internal' },
                      { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                      { label: 'Chat on WhatsApp', url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh Photography! I would like to ask about your studio location and appointments.')}`, type: 'external' },
                    ],
                  }
                }

                  // 9. Contact Details, Phone, Email & WhatsApp
                  if (
                    hasWord(norm, [
                      'contact',
                      'phone',
                      'telephone',
                      'call',
                      'number',
                      'whatsapp',
                      'email',
                      'reach',
                      'how to contact',
                      'get in touch',
                    ])
                  ) {
                    return {
                      reply: `### Official Contact Information — Josh Photography 📞\n\nWe would love to hear all about your upcoming celebration!\n\n- 📞 **Phone:** [${studioPhone}](tel:${studioPhone.replace(/\s+/g, '')})\n- 💬 **WhatsApp:** [Message us on WhatsApp](${baseWhatsAppUrl}) (${studioPhone})\n- ✉️ **Email:** [${studioEmail}](mailto:${studioEmail})\n- 📍 **Studio Address:** ${studioAddress}\n- 🕒 **Hours:** ${studio.openingHours}\n\nOur team is available Monday through Saturday, with private Sunday consultations by appointment.`,
                      suggestions: ['Check Availability', 'View Packages', 'Special Offers'],
                      actions: [
                        {
                          label: 'Start WhatsApp Chat',
                          url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh Photography! I would like to inquire about your photography services.')}`,
                          type: 'external',
                        },
                        { label: 'Contact Page', url: '/contact', type: 'internal' },
                        { label: 'Call Studio', url: `tel:${studioPhone.replace(/\s+/g, '')}`, type: 'external' },
                      ],
                    }
                  }

                  // 10. Photo Delivery, Turnaround Times & Albums
                  if (
    hasWord(norm, [
                      'turnaround',
                      'delivery',
                      'how long',
                      'when will i get',
                      'when will we get',
                      'preview',
                      'highlight frames',
                      'album',
                      'albums',
                      'prints',
                      'usb',
                      'edited photos',
                    ])
  ) {
                    return {
                      reply: `### Photo Delivery & Heirloom Album Quality ⏱️\n\n- ⚡ **Sneak Peek Highlights:** You will receive **25–30 hand-graded highlight frames within 48 to 72 hours** of your celebration for instant sharing with family.\n- 📦 **Complete Digital Gallery:** Your full high-resolution digital gallery (every photograph individually retouched and color-graded) is delivered within **3 to 4 weeks** via a private, password-protected online viewing suite.\n- 📖 **Handcrafted Photo Albums:** Our albums are handcrafted in Italy using archival fine-art paper and genuine leather/linen covers, engineered to endure across generations.\n- 💾 **Print Release:** Every package includes full personal printing rights and digital downloads in both web and print resolutions.`,
                      suggestions: ['View Packages & Pricing', 'Check Availability', 'Contact Us'],
                      actions: [
                        { label: 'View Packages', url: '/packages', type: 'internal' },
                        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                      ],
                    }
                  }

                  // 11. Polite Fallback — Honest & helpful, guides customer to direct channels
                  return {
                    reply: `I want to make sure you receive the most accurate and personalized details for your celebration! ✨\n\nWhile I can assist with our **17 photography categories**, **packages (starting from £495)**, **promotional offers**, and **studio information**, bespoke inquiries or custom itineraries are best discussed directly with Josh.\n\nPlease feel free to message Josh on WhatsApp at **${studioPhone}** or submit your inquiry on our [Contact page](/contact).`,
                    suggestions: ['Explore All Categories', 'Special Offers & Discounts', 'Packages & Pricing', 'Contact Team'],
                    actions: [
                      {
                        label: 'Chat on WhatsApp',
                        url: `${baseWhatsAppUrl}?text=${encodeURIComponent(`Hello Josh Photography! I have a question regarding: "${query}"`)}`,
                        type: 'external',
                      },
                      { label: 'Contact Us', url: '/contact', type: 'internal' },
                      { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                    ],
                  }
                }

                /**
                 * Main chat handler orchestrating topic filtering and dynamic retrieval
                 */
                  export async function handleChatMessage({ message, history = [] }) {
                    // 1. Topic validation
                    const validation = validateQueryTopic(message, history)
                    if (!validation.isAllowed) {
                      return {
                        reply: validation.fallbackResponse || OFF_TOPIC_RESPONSE,
                        suggestions: [
                          '💍 Wedding Packages & Pricing',
                          '🎂 Birthday Photography',
                          '🎁 Special Offers & Discounts',
                          '📅 Check Availability',
                        ],
                        actions: [
                          { label: 'Explore Weddings', url: '/weddings', type: 'internal' },
                          { label: 'Special Offers', url: '/special-offers', type: 'internal' },
                          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                        ],
                      }
                    }

                    // 2. Load live knowledge base (reads latest database state on demand)
                    const kb = getKnowledgeBase()

                    // 3. Generate dynamic response
                    const answer = generateDynamicAnswer(message, history, kb)
                    return answer
                  }
