import { validateQueryTopic, OFF_TOPIC_RESPONSE } from './topicFilter.js'
import { getKnowledgeBase } from './chatKnowledge.js'

/**
 * Normalizes user text for robust keyword and intent matching
 */
function normalizeText(str = '') {
  return str
    .toLowerCase()
    .replace(/['’]/g, '')
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
    if (hasWord(norm, ['mothers day', 'mother day', 'mom day', 'mothers', 'mother'])) {
      return categories.find((c) => c.id === 'mothers-day')
    }
    if (hasWord(norm, ['fathers day', 'father day', 'dad day', 'fathers', 'father'])) {
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
        reply: `Warm greetings! Welcome to **${studio.name}**. ✨\n\nI’m **Hello Chatbot**, your personal photography assistant. I can help you with:\n- 💍 **All 17 Photography Categories** (Weddings, Birthdays, Maternity, Car, Sports, Product, Reels, Model & more)\n- 🎁 **Current Promotional Offers & Discounts**\n- 🏛️ **Studio Information, Northampton & De Fab Studio**\n- ⭐ **Real Client Reviews & Testimonials**\n- 📅 **Checking Date Availability & How to Book**\n\nWhat celebration or photography service can I assist you with today?`,
        suggestions: ['Wedding Photography', 'Special Offers & Discounts', 'Check Availability', 'Where is your studio?'],
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
      ]) || norm === 'booking'
    ) {
      return {
        reply: `### How to Book with Josh Photography 📅\n\nBooking your celebration is clear and straightforward:\n\n1. **Check Dates / Inquire:** Visit our [Check Availability](/check-availability) page or submit your details on our [Contact page](/contact).\n2. **Consultation:** We’ll arrange an unhurried consultation (video call, phone, or in person) to review your itinerary and aesthetic preferences.\n3. **Reservation:** To officially secure your date on our calendar, a service agreement and date retainer are completed.\n\n**Advance Booking Guidelines:**\n- **Weddings & Peak Weekend Dates:** We recommend inquiring **6 to 12 months in advance** as peak British summer and autumn dates fill quickly.\n- **Birthdays, Newborns, Family & Commercial Sessions:** **3 to 6 weeks notice** is ideal.\n\n*Please note: Calendar dates are only officially reserved once your consultation is held and the retainer is received.*`,
        suggestions: ['Check Date Availability', 'WhatsApp Josh Directly', 'Special Offers'],
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

    // 2B. How Far in Advance to Book & Timing Guidelines
    if (
      hasWord(norm, [
        'how far in advance',
        'how early should',
        'when should i book',
        'when should we book',
        'how much notice',
        'when to book',
        'advance booking',
        'months in advance',
        'weeks in advance',
        'advance notice',
      ])
    ) {
      return {
        reply: `### How Far in Advance Should You Book? 📅\n\nTo ensure dedicated calendar availability for your celebration, here are our recommended booking timelines:\n\n- 💍 **Weddings & Peak Weekend Dates:** We recommend inquiring **6 to 12 months in advance** as popular British spring, summer, and autumn Saturdays fill quickly.\n- 🎂 **Birthdays, Anniversaries & Private Events:** **3 to 6 weeks notice** is ideal.\n- 👶 **Newborn & Baby Portraits:** Best reserved during your second or third trimester based on your estimated due date, allowing us to photograph your little one in their calm first 7–14 days.\n- 🏎️ **Commercial, Product, Sports & Car Shoots:** **2 to 4 weeks notice** to coordinate venue access, track days, or studio staging.\n- ⚡ **Short-Notice Inquiries:** If your celebration is happening soon, don't hesitate to reach out! We accommodate last-minute bookings whenever our calendar permits.`,
        suggestions: ['Check Date Availability', 'How to Book', 'Special Offers', 'Chat on WhatsApp'],
        actions: [
          { label: 'Check Availability Now', url: '/check-availability', type: 'internal' },
          { label: 'Contact Us', url: '/contact', type: 'internal' },
          {
            label: 'Message Josh on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to check availability for our upcoming celebration date.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2C. Deposit, Retainer & Payment Terms Intent
    if (
      hasWord(norm, [
        'deposit',
        'retainer',
        'down payment',
        'how to pay',
        'payment process',
        'when is payment due',
        'balance due',
        'payment methods',
        'payment terms',
        'payment plan',
      ])
    ) {
      return {
        reply: `### Booking Deposit & Payment Information 💳\n\nOur reservation and payment process is designed to be completely transparent with zero hidden fees:\n\n1. **Securing Your Date:** A straightforward digital booking agreement and date retainer officially secure your date on our calendar.\n2. **Date Exclusivity:** Once your retainer is confirmed, your date is exclusively held for you—no other client inquiries will be accepted for that time.\n3. **Remaining Balance:** The remaining balance is conveniently settled prior to your celebration day.\n4. **Accepted Payment Methods:** Secure UK bank transfer (BACS) and major credit or debit cards.\n5. **Transparent Pricing:** All costs, travel guidelines, and deliverables are confirmed upfront with no surprise add-ons.`,
        suggestions: ['How to Book', 'Check Availability', 'Special Offers', 'Inquire on WhatsApp'],
        actions: [
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'Contact Us', url: '/contact', type: 'internal' },
          {
            label: 'Discuss with Josh on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to ask about booking and payment options.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2D. Weather & Rainy Day Policy / Rescheduling Intent
    if (
      hasWord(norm, [
        'rain',
        'raining',
        'rainy',
        'bad weather',
        'what happens if it rains',
        'what if it rains',
        'weather forecast',
        'umbrella',
        'weather policy',
        'reschedule',
        'rescheduling',
        'cancel',
        'cancellation',
      ])
    ) {
      return {
        reply: `### Weather & Rainy Day Policy 🌦️\n\nBritish weather is unpredictable, but we are always thoroughly prepared to create stunning photographs:\n\n- 🌿 **Outdoor Portrait Sessions (Family, Maternity, Engagement, Car):** If heavy rain, gales, or extreme weather are forecast, we happily reschedule your session to another mutually convenient date at **no extra fee**. Your comfort and relaxed smiles are our top priority!\n- 💒 **Weddings & Fixed Milestone Celebrations:** Rain never spoils a wedding day! We carry elegant, transparent umbrellas that look romantic and cinematic in portraits. We also scout your venue for beautiful indoor architecture, grand staircases, warm fireplace corners, and soft window light.\n- 💡 **Studio Alternative:** You also have the option to hold portraits in our dedicated Northampton studio space with controlled professional lighting.`,
        suggestions: ['View Client Reviews', 'Where is your studio?', 'Check Availability', 'WhatsApp Josh'],
        actions: [
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          {
            label: 'Ask Josh on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I had a question regarding shoot weather and locations.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2E. Wardrobe, Outfit & Styling Advice Intent
    if (
      hasWord(norm, [
        'what to wear',
        'what should we wear',
        'outfit',
        'outfits',
        'clothing',
        'clothes',
        'wardrobe',
        'dress code',
        'what colours',
        'what colors',
        'styling tips',
      ])
    ) {
      return {
        reply: `### What to Wear for Your Photoshoot 👗👔\n\nWhat you wear sets the tone for your photographs. Here are Josh’s top styling recommendations:\n\n- 🎨 **Timeless, Warm Neutral Palette:** Earthy tones photograph with natural elegance—think creams, ivory, oatmeal, warm beige, soft terracotta, olive green, slate blue, navy, and muted pastels.\n- 🤝 **Coordinate, Don't Match:** Rather than everyone wearing identical white shirts and jeans, choose 3 to 4 coordinating colors that complement each other naturally.\n- 🚫 **Patterns to Avoid:** Avoid bold commercial logos, high-contrast neon shades, or busy micro-stripes (which can create distorting moiré patterns on camera).\n- 👟 **Comfort & Layers:** Bring comfortable footwear for walking between scenic spots (you can switch into heels or formal shoes for the shot!). Textured layers (chunky knits, structured jackets, scarves) add wonderful depth.\n\n*We also provide tailored wardrobe guidance during your pre-shoot consultation!*`,
        suggestions: ['Our Photography Style', 'Client Reviews', 'Check Availability', 'Contact Team'],
        actions: [
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          {
            label: 'Consult Josh on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like some advice on wardrobe and styling for our shoot.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2F. Photography Style, Candid Approach & Camera Shyness / Feeling Awkward Intent
    if (
      hasWord(norm, [
        'photography style',
        'photo style',
        'your style',
        'candid',
        'documentary',
        'awkward',
        'camera shy',
        'unposed',
        'posing',
        'hate having photos',
        'not photogenic',
        'nervous',
        'feel uncomfortable',
      ]) ||
      (norm.includes('style') && (norm.includes('photo') || norm.includes('shoot') || norm.includes('work')))
    ) {
      return {
        reply: `### Our Photography Style & Gentle Direction 📷\n\n- ✨ **Emotional Documentary Storytelling:** Josh’s philosophy is rooted in capturing genuine emotion as it unfolds naturally—unscripted laughter, joyful tears, tender touches, and lively celebration energy rather than forced smiles.\n- 🤗 **Feeling Awkward or Camera-Shy?** Over 90% of our clients tell us they feel nervous in front of the camera! Josh’s calm, warm, and friendly demeanor puts everyone at ease within the first five minutes.\n- 💬 **Gentle Prompts, Never Stiff Poses:** Rather than freezing you into rigid poses, Josh gives fun, natural prompts and gentle guidance so you focus on each other and forget the camera is even there.\n- 🌿 **Timeless Color Harmony:** Every delivered image is graded with rich, organic tones that honor authentic skin tones and stand the test of time.`,
        suggestions: ['Client Reviews', 'Special Offers', 'Check Availability', 'About Josh'],
        actions: [
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          { label: 'About Josh', url: '/about', type: 'internal' },
          {
            label: 'Message Josh on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I wanted to chat about your photography style and approach.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2G. RAW Files & Unedited Photos Policy Intent
    if (
      hasWord(norm, [
        'raw',
        'raw files',
        'unedited',
        'unedited photos',
        'original files',
        'master files',
        'can i have raw',
        'unedited pictures',
      ])
    ) {
      return {
        reply: `### RAW & Unedited Files Policy 🎨\n\n- 🖼️ **Our Fine-Art Quality Standard:** We do not deliver RAW or unedited digital files.\n- 📖 **The Creative Process:** Just as a master chef presents a finished culinary creation rather than raw ingredients, RAW camera files are unfinished, flat digital negatives designed solely for professional editing software.\n- ✨ **What You Receive:** Every photograph delivered by Josh Photography is hand-selected and individually artistically graded—with exposure balance, shadow depth, color harmony, and fine retouching applied.\n- 💾 **Full Resolution & Print Release:** You receive all final, finished high-resolution master JPEG files with full personal printing and digital sharing rights.`,
        suggestions: ['Photo Delivery Times', 'Client Reviews', 'Check Availability', 'Special Offers'],
        actions: [
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          {
            label: 'Inquire on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I had a question regarding photo files and delivery.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2H. Camera Equipment, Lenses & Professional Lighting Gear Intent
    if (
      hasWord(norm, [
        'gear',
        'equipment',
        'cameras',
        'camera',
        'lens',
        'lenses',
        'lighting gear',
        'what cameras do you use',
        'what equipment',
        'backup camera',
      ])
    ) {
      return {
        reply: `### Professional Equipment & Redundancy Standards 📸\n\nWe invest in world-class imaging technology to guarantee flawless reliability for your once-in-a-lifetime moments:\n\n- 📷 **Dual-Card Full-Frame Cinema & Stills Bodies:** Every shot is written in real time to two separate high-speed memory cards simultaneously, ensuring instant in-camera redundancy.\n- 🔍 **Ultra-Fast Optical Prime Lenses:** Premium f/1.2 and f/1.4 lenses that produce creamy background bokeh and capture crisp, noise-free images in dim church cathedrals and evening ballrooms.\n- 💡 **Sculptural Lighting Technology:** Wireless Godox strobes, parabolic umbrellas, and soft diffused light modifiers for flattering, natural-looking skin tones.\n- 🛡️ **100% On-Site Backup Gear:** We bring duplicate professional camera bodies, spare lenses, backup flash units, and ample battery banks to every single commission for total peace of mind.`,
        suggestions: ['Drone Photography', 'Our Photography Style', 'Where is your studio?', 'Check Availability'],
        actions: [
          { label: 'About Josh Photography', url: '/about', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          {
            label: 'WhatsApp Josh',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I wanted to ask about your photography setup.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2I. Drone & Aerial Photography Intent
    if (
      hasWord(norm, [
        'drone',
        'aerial',
        'drone shots',
        'aerial footage',
        'drone photo',
        'drone photography',
        'sky shots',
        'aerial coverage',
      ])
    ) {
      return {
        reply: `### Drone Aerial Photography & Cinematography 🚁\n\n- 🏰 **Majestic Elevated Perspectives:** We provide high-definition aerial drone photography and 4K aerial cinema for countryside manors, historic estates, golf resorts, and large outdoor gatherings.\n- 📜 **Licensed & Regulatory Compliant:** All drone operations are conducted in strict compliance with UK Civil Aviation Authority (CAA) safety standards, subject to weather and venue airspace permissions.\n- 🎬 **Cinematic Establishing Visuals:** Aerial perspectives provide sweeping grandeur that captures the full beauty of your venue and surrounding landscapes.`,
        suggestions: ['Videography Services', 'Our Photography Style', 'Check Availability', 'Special Offers'],
        actions: [
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'Contact Us', url: '/contact', type: 'internal' },
          {
            label: 'Inquire About Drone on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to inquire about drone aerial coverage for our celebration.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2J. Videography & Cinematic Filmmaking Intent
    if (
      hasWord(norm, [
        'video',
        'videography',
        'videographer',
        'cinematic film',
        'wedding film',
        'ceremony film',
        'cinematography',
        'video shoots',
      ]) &&
      !norm.includes('car') &&
      !norm.includes('product') &&
      !hasWord(norm, ['reel', 'reels'])
    ) {
      return {
        reply: `### Videography & Cinematic Filmmaking 🎥\n\n- 🎬 **4K Cinematic Highlight Films:** In addition to stills photography, we craft artistic 4K wedding and celebration highlight films (5–8 minutes) set to licensed cinematic soundtracks.\n- 🎙️ **Full Ceremony & Speech Coverage:** Multi-camera ceremony and speech recordings with dedicated high-fidelity wireless audio capture.\n- 📱 **9:16 Vertical Social Reels (48hr Rush Delivery):** Dynamic, beat-matched vertical teaser reels optimized for Instagram Reels, TikTok, and YouTube Shorts.\n- 🤝 **Seamless Synchrony:** When photo and cinema are coordinated together by our team, there is zero friction or competing for angles—delivering a unified artistic vision.`,
        suggestions: ['Reels & Video Shoots', 'Check Availability', 'Special Offers', 'WhatsApp Josh'],
        actions: [
          { label: 'Explore Reels & Video', url: '/reels-shoots', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          {
            label: 'Chat on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to inquire about videography and cinematic film coverage.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2K. Handcrafted Photo Albums & Archival Keepsakes Intent
    if (
      hasWord(norm, [
        'photo album',
        'photo albums',
        'albums',
        'album',
        'parent album',
        'parent albums',
        'prints',
        'wall art',
        'canvas prints',
        'photobook',
      ])
    ) {
      return {
        reply: `### Handcrafted Heirloom Photo Albums & Prints 📖\n\n- 🇮🇹 **Handmade in Italy:** Our signature heirloom albums are handcrafted in Italy using archival museum-grade fine-art paper and genuine full-grain leather or organic linen covers.\n- 📐 **Lay-Flat Panoramic Spreads:** Engineered with flush-mount binding that opens completely flat, allowing panoramic landscape photographs to span across two full pages without central gutter distortion.\n- 🎁 **Parent & Keepsake Albums:** Beautiful duplicate parent albums are available in matching finishes—the ultimate sentimental gift for parents and grandparents.\n- ⏳ **Generational Durability:** Certified acid-free materials guaranteed to retain rich color depth and resist yellowing across generations.`,
        suggestions: ['Photo Delivery Times', 'Client Reviews', 'Where is your studio?', 'Check Availability'],
        actions: [
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          {
            label: 'Discuss Albums on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to see examples and learn more about your heirloom photo albums.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2L. Second Photographer & Team Coverage Intent
    if (
      hasWord(norm, [
        'second photographer',
        'second shooter',
        'two photographers',
        'second camera',
        'assistant photographer',
        'extra photographer',
        'dual photographer',
      ])
    ) {
      return {
        reply: `### Dual Photographer & Team Coverage 👥\n\n- 🌟 **Lead Photographer Josh:** Josh personally directs and captures every commission with dedicated artistic vision and unhurried focus.\n- 📸 **When a Second Photographer is Ideal:**\n  - **Dual Preparations:** Capturing both partners getting ready simultaneously at different hotels or venues.\n  - **Multi-Angle Ceremony:** Documenting the bride walking down the aisle while simultaneously capturing the groom's emotional first look.\n  - **Comprehensive Guest Reactions:** Capturing spontaneous laughter and tears during speeches from multiple viewpoints.\n  - **Large Guest Counts:** Recommended for celebrations with over 100 guests to ensure no fleeting moment goes unnoticed.`,
        suggestions: ['Our Photography Style', 'Client Reviews', 'Check Availability', 'Special Offers'],
        actions: [
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          {
            label: 'Inquire on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to inquire about dual photographer coverage for our celebration.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2M. Studio Consultations & In-Person Visits Intent
    if (
      hasWord(norm, [
        'visit the studio',
        'visit your studio',
        'come to the studio',
        'meet in person',
        'meet before booking',
        'in person meeting',
        'video call',
        'zoom call',
        'consultation meeting',
        'see the studio',
      ])
    ) {
      return {
        reply: `### Consultations & Studio Visits 🏛️\n\n- ☕ **Unhurried Meeting:** We would love to meet you before you make any decisions! We offer consultations via video call (Zoom/FaceTime), phone, or in person.\n- 📍 **Northampton Studio Location:** You are warmly invited to visit our studio at **Unit H5/J, KG House, Northampton, NN5 7QS**.\n- 📖 **What We Explore:** Review physical Italian album swatches, discuss your ceremony timeline and aesthetics, explore your vision, and answer any questions with zero pressure.`,
        suggestions: ['Where is your studio?', 'Check Availability', 'Special Offers', 'WhatsApp Josh'],
        actions: [
          { label: 'Contact Us', url: '/contact', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          {
            label: 'Book Consultation on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to arrange a consultation / studio visit.')}`,
            type: 'external',
          },
        ],
      }
    }

    // 2N. Travel, Nationwide UK & Destination Coverage Intent
    if (
      hasWord(norm, [
        'travel',
        'travel fee',
        'travel fees',
        'travel cost',
        'outside northampton',
        'destination wedding',
        'destination shoot',
        'travel to london',
        'cover london',
        'cotswolds',
        'surrey',
        'nationwide',
        'abroad',
      ])
    ) {
      return {
        reply: `### Travel & Nationwide UK Coverage 🗺️\n\n- 📍 **Based in Northampton, Working Across the UK:** Josh regularly travels across Northamptonshire, Greater London, Surrey, the Cotswolds, Oxfordshire, Hertfordshire, Buckinghamshire, and nationwide.\n- ✈️ **Destination Celebrations:** We also accept European and international destination commissions upon request.\n- 🚗 **Transparent Travel Policy:** Travel throughout Northamptonshire and surrounding counties is included. For distant UK or destination events, modest travel arrangements are agreed upon transparently upfront with zero hidden charges.`,
        suggestions: ['Where is your studio?', 'Check Availability', 'Client Reviews', 'WhatsApp Josh'],
        actions: [
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'Contact Us', url: '/contact', type: 'internal' },
          {
            label: 'Discuss Travel on WhatsApp',
            url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to inquire about coverage for an event outside Northampton.')}`,
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
          suggestions: ['Read More Client Reviews', 'Special Offers', 'Check Availability'],
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
        suggestions: ['Wedding Reviews', 'Birthday Reviews', 'Special Offers', 'Check Availability'],
        actions: [
          { label: 'Read All Reviews', url: '/testimonials', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
          { label: 'WhatsApp Josh', url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh! I would like to enquire about your photography services.')}`, type: 'external' },
        ],
      }
    }

    // 4. Pricing Inquiries (Customized by Category if specified)
    if (
      hasWord(norm, [
        'how much does it cost',
        'how much is',
        'pricing',
        'prices',
        'cost',
        'costs',
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
          focusNote = 'For weddings, couples most frequently choose our **Premium Collection** (£1,150) for comprehensive 8-hour dual-photographer coverage and a handcrafted photo album, or our bespoke **Signature Collection** for full-day cinema & photo.\n\n'
        } else if (norm.includes('birthday') || recentTopic === 'birthdays') {
          focusNote = 'For birthdays, our **Essential Collection** (£495) covers up to 4 hours of celebration action, or **Premium Collection** (£1,150) for complete day coverage with an heirloom album.\n\n'
        }

        return {
          reply: `### Official Photography Collections & Transparent Pricing 💰\n\n${focusNote}At **Josh Photography**, our transparent starting prices are:\n\n1. **Essential Collection — Starting From £495**\n   - Up to 4 hours of continuous photographic coverage\n   - 1 professional photographer\n   - 200+ hand-edited high-resolution photographs\n   - Private online viewing & download gallery with full print release\n   - Fine-art color grading and individual retouching\n   - *Best for:* Intimate celebrations, first birthdays, civil ceremonies, maternity and newborn portraits.\n\n2. **Premium Collection — Starting From £1,150 (Our Most Popular Choice)**\n   - Up to 8 hours of complete coverage\n   - 2 professional photographers (multi-angle perspectives simultaneously)\n   - 500+ hand-edited high-resolution master photographs\n   - Pre-event consultation & timeline planning\n   - Curated highlight slideshow set to music\n   - Handcrafted 30-page premium photo album\n   - *Best for:* Full-day weddings, grand milestone jubilees, and full-scale celebrations.\n\n3. **Signature Collection — Request Pricing (Custom Luxury Commission)**\n   - Full-day unlimited coverage (12+ hours)\n   - 2 photographers + 1 dedicated cinematic videographer\n   - 800+ artistically edited photographs + 4K cinematic highlight film (5–8 min)\n   - Drone aerial coverage + 50-page signature heirloom album + 2 parent albums\n\n**Optional Add-ons:** Additional hours, extra photographer, aerial drone, same-day edit preview, album upgrades, fine-art canvas prints.`,
          suggestions: ['How do I book?', 'What is the delivery timeline?', 'Do you provide photo albums?', 'Check Availability'],
          actions: [
            { label: 'Check Availability', url: '/check-availability', type: 'internal' },
            { label: 'Special Offers', url: '/special-offers', type: 'internal' },
            {
              label: 'Inquire on WhatsApp',
              url: `${baseWhatsAppUrl}?text=${encodeURIComponent('Hello Josh Photography! I would like to inquire about pricing and options.')}`,
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
              reply: `### Special Offers & Promotions 🎁\n\nWe do not currently have any active seasonal discount promotions published right now.\n\nPlease check back soon or visit our [Special Offers](/special-offers) page for upcoming seasonal announcements!`,
              suggestions: ['Special Offers', 'Check Availability', 'Contact Us'],
              actions: [
                { label: 'Special Offers', url: '/special-offers', type: 'internal' },
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
                reply: `### ${matchedCat.name} — Josh Photography 📷\n\n**${matchedCat.headline}**\n\n${matchedCat.description}\n\n**Our Key Specialties & Features:**\n${specialtiesList}\n\n- 🖼️ **Portfolio Gallery:** Explore curated frames on our dedicated [${matchedCat.name}](${matchedCat.route}) page.\n\nWould you like to check date availability or discuss tailored celebration coverage with Josh?`,
                suggestions: [`View ${matchedCat.name} Page`, 'Check Date Availability', 'Special Offers', 'Client Reviews'],
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
                  suggestions: ['Special Offers & Discounts', 'Read Client Testimonials', 'Where is your studio?', 'Check Availability'],
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
                      suggestions: ['Check Availability', 'Special Offers', 'Client Reviews'],
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
                      reply: `### Photo Delivery & Heirloom Album Quality ⏱️\n\n- ⚡ **Sneak Peek Highlights:** You will receive **25–30 hand-graded highlight frames within 48 to 72 hours** of your celebration for instant sharing with family.\n- 📦 **Complete Digital Gallery:** Your full high-resolution digital gallery (every photograph individually retouched and color-graded) is delivered within **3 to 4 weeks** via a private, password-protected online viewing suite.\n- 📖 **Handcrafted Photo Albums:** Our albums are handcrafted in Italy using archival fine-art paper and genuine leather/linen covers, engineered to endure across generations.\n- 💾 **Print Release:** Every commission includes full personal printing rights and digital downloads in both web and print resolutions.`,
                      suggestions: ['Special Offers', 'Check Availability', 'Contact Us'],
                      actions: [
                        { label: 'Special Offers', url: '/special-offers', type: 'internal' },
                        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
                      ],
                    }
                  }

                  // 11. Polite Fallback — Honest & helpful, guides customer to direct channels
                  return {
                    reply: `I want to make sure you receive the most accurate and personalized details for your celebration! ✨\n\nWhile I can assist with our **17 photography categories**, **promotional offers**, and **studio information**, bespoke inquiries or custom itineraries are best discussed directly with Josh.\n\nPlease feel free to message Josh on WhatsApp at **${studioPhone}** or submit your inquiry on our [Contact page](/contact).`,
                    suggestions: ['Explore All Categories', 'Special Offers & Discounts', 'Client Reviews', 'Contact Team'],
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
                          '💍 Wedding Photography',
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
