import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const appDirPath = (typeof import.meta !== 'undefined' && import.meta?.url) ? dirname(fileURLToPath(import.meta.url)) : (typeof __dirname !== 'undefined' ? __dirname : process.cwd())

const contentPath = join(appDirPath, '../data/content.json')
const photosPath = join(appDirPath, '../data/photos.json')
const offersPath = join(appDirPath, '../data/offers.json')

// Official Packages and Pricing for Josh Photography
export const OFFICIAL_PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Package',
    subtitle: 'For intimate celebrations and personal milestones',
    price: 'Starting From £495',
    priceNumeric: 495,
    coverage: 'Up to 4 hours of coverage',
    photographers: '1 professional photographer',
    deliverables: [
      '200+ edited high-resolution photographs',
      'Private online viewing & download gallery',
      'High-resolution digital files with print release',
      'Fine-art color grading and individual retouching',
    ],
    bestFor: 'Smaller gatherings, intimate birthdays, civil ceremonies, maternity and newborn portraits',
    popular: false,
    ctaPath: '/check-availability',
  },
  {
    id: 'premium',
    name: 'Premium Package',
    subtitle: 'Comprehensive coverage for weddings & grand celebrations',
    price: 'Starting From £1,150',
    priceNumeric: 1150,
    coverage: 'Up to 8 hours of coverage',
    photographers: '2 professional photographers (multi-angle perspective)',
    deliverables: [
      '500+ hand-edited high-resolution photographs',
      'Private online gallery with instant family sharing',
      'High-resolution digital files with print release',
      'Professional color grading & fine retouching',
      'Pre-event consultation & timeline planning',
      'Curated highlight slideshow set to music',
      'Handcrafted premium photo album (30 pages)',
    ],
    bestFor: 'Full wedding days, grand milestone birthdays, and full-scale celebrations (Our Most Popular Choice)',
    popular: true,
    ctaPath: '/check-availability',
  },
  {
    id: 'signature',
    name: 'Signature Package',
    subtitle: 'The complete cinematic & luxury heirloom experience',
    price: 'Request Pricing (Custom Luxury Commission)',
    priceNumeric: null,
    coverage: 'Full-day unlimited coverage (12+ hours)',
    photographers: '2 photographers + 1 dedicated cinematic videographer',
    deliverables: [
      '800+ artistically edited photographs',
      'Cinematic 4K highlight film (5–8 minutes)',
      'Full multi-camera ceremony film with high-fidelity audio',
      'Drone aerial photography & videography (subject to venue permissions)',
      'Pre-event consultation and venue recce',
      'Same-day highlight preview for evening reception display',
      'Signature luxury heirloom photo album (50 pages)',
      'Two (2) handcrafted parent albums',
      'Archival USB gift box with keepsake prints',
    ],
    bestFor: 'Luxury weddings, estate celebrations, multi-day functions, and couples seeking the ultimate heirloom legacy',
    popular: false,
    ctaPath: '/check-availability',
  },
]

export const OFFICIAL_ADDONS = [
  { name: 'Additional Coverage Hour', description: 'Extended photographic coverage beyond scheduled hours' },
  { name: 'Extra Photographer', description: 'Second or third photographer for comprehensive multi-angle coverage' },
  { name: 'Drone Aerial Coverage', description: 'Licensed aerial drone photo & video over venue grounds' },
  { name: 'Same-Day Edit Preview', description: 'Curated 15–20 highlight gallery ready before the reception concludes' },
  { name: 'Photo Album Upgrade', description: 'Upgrade pages, Italian leather/linen finishes, and parent duplicates' },
  { name: 'Canvas & Fine-Art Prints', description: 'Archival museum-grade canvas and framed gallery wall prints' },
  { name: 'Destination & Travel Coverage', description: 'Available across the United Kingdom and international destinations' },
]

// All 17 Photography Categories — Comprehensive Domain Knowledge
export const ALL_17_CATEGORIES = [
  {
    id: 'weddings',
    slug: 'weddings',
    num: '01',
    name: 'Wedding Photography',
    route: '/weddings',
    badge: '01 — THE SACRED COVENANT',
    headline: 'From Sacred Vows to Timeless Portraits',
    tagline: 'Authentic emotion, historic church ceremonies, and countryside manors.',
    description:
      'Full-day documentary coverage of sacred wedding celebrations. From historic British church ceremonies and cathedral aisles to countryside manor receptions, intimate newlywed portraits, and authentic family tears of joy.',
    specialties: [
      'Traditional Church Ceremonies & Altar Vows',
      'Walking Down the Aisle & Confetti Recessional',
      'Romantic Golden-Hour Newlywed Portraits',
      'Historic Church & Countryside Manor Venues',
      'Handcrafted Italian Heirloom Leather Albums',
    ],
    pricingGuide: 'Premium Collection (£1,150) or Signature Cinema & Photo',
  },
  {
    id: 'birthdays',
    slug: 'birthday-photography',
    num: '02',
    name: 'Birthday Celebrations',
    route: '/birthday-photography',
    badge: '02 — JOYFUL MILESTONES',
    headline: 'Every Celebration Deserves Art',
    tagline: 'Dynamic documentary coverage from 1st birthdays to 50th/60th Jubilees.',
    description:
      'From milestone first birthday cake smashes and 21st celebrations to 50th and 60th Golden Jubilees, we document genuine laughter, bespoke stage decor, heartfelt toasts, and dance-floor moments in vibrant documentary perfection.',
    specialties: [
      'First Birthday Cake Smash & Sensory Play',
      'Themed Party Styling & Backdrop Decor',
      'Candle Lighting, Toasts & Grand Cake Cutting',
      'Energetic Dance Floors & Real-Time Teaser Gallery',
    ],
    pricingGuide: 'Essential Package (£495) or Premium Package (£1,150)',
  },
  {
    id: 'engagement',
    slug: 'engagement',
    num: '03',
    name: 'Engagement Photography',
    route: '/engagement',
    badge: '03 — THE PROMISE',
    headline: 'Romantic Engagement & Proposal Photography',
    tagline: 'Sunset golden-hour sessions, surprise proposal planning, and heartfelt portraits.',
    description:
      'Celebrate your romantic commitment with an intimate couple portrait session in countryside gardens, historic estates, or iconic London city landmarks.',
    specialties: [
      'Surprise Proposal Coordination & Discreet Documentation',
      'Golden-Hour Sunset Couple Sessions',
      'Engagement Party & Family Celebrations',
      'High-Resolution Guest-Book & Save-the-Date Imagery',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'anniversary',
    slug: 'anniversary',
    num: '04',
    name: 'Anniversary Photography',
    route: '/anniversary',
    badge: '04 — ENDURING DEVOTION',
    headline: 'Honoring Years of Love and Growing Legacies',
    tagline: 'Silver (25th) & Golden (50th) Jubilees, private vow renewals, and heirloom albums.',
    description:
      'From first-year paper anniversaries to Silver (25th) and Golden (50th) Jubilees, we honor lasting companionships, private vow renewals, and multigenerational family reunions.',
    specialties: [
      'Milestone Silver & Golden Jubilee Banquets',
      'Intimate Countryside Vow Renewals',
      'Multigenerational Family Portraits',
      'Heirloom Keepsake Albums',
    ],
    pricingGuide: 'Essential Package (£495) or Premium Package (£1,150)',
  },
  {
    id: 'baby-family',
    slug: 'baby-family',
    num: '05',
    name: 'Baby & Newborn Photography',
    route: '/baby-family',
    badge: '05 — THE TENDER BEGINNINGS',
    headline: 'Gentle Portraits of New Life and Pure Wonder',
    tagline: 'Unhurried, warm natural-light studio and in-home baby sessions.',
    description:
      'Gentle, baby-led newborn sessions capturing tiny yawns, delicate fingers, serene sleeping poses, and tender bonds between new parents and their little ones in calm, warm surroundings.',
    specialties: [
      'Quiet, Patient Newborn Studio & In-Home Sessions',
      'Soft Natural Light & Organic Textile Props',
      'First Milestone Portraits (3, 6, 9 & 12 Months)',
      'Fine-Art Parent & Sibling Moments',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'festivals',
    slug: 'festivals',
    num: '06',
    name: 'Festival & Cultural Celebrations',
    route: '/festivals',
    badge: '06 — HERITAGE & TRADITION',
    headline: 'Vibrant Rituals, Sacred Lanterns & Festival Joy',
    tagline: 'Christmas, Diwali, Eid, and rich cultural traditions documented with reverence.',
    description:
      'Honoring sacred traditions, cultural heritage, festival banquets, traditional attire, and glowing candlelight across Christmas celebrations, Diwali, Eid, and multicultural festivities.',
    specialties: [
      'Christmas & Holiday Gatherings with Festive Lighting',
      'Traditional Cultural Ceremonies & Sacred Rituals',
      'Vibrant Festive Attire, Henna & Jewelry Macro Details',
      'Communal Feast & Celebration Documentary',
    ],
    pricingGuide: 'Essential Package (£495) or Premium Package (£1,150)',
  },
  {
    id: 'mothers-day',
    slug: 'mothers-day',
    num: '07',
    name: "Mother's Day Photography",
    route: '/mothers-day',
    badge: '07 — UNCONDITIONAL LOVE',
    headline: 'Honoring the Heart and Soul of Every Family',
    tagline: 'Emotional maternal portraits, three-generation sessions, and gentle garden light.',
    description:
      'Dedicated sessions celebrating maternal devotion, gentle guidance, and the deep emotional bond between mothers, grandmothers, and their children.',
    specialties: [
      'Three-Generation Family Legacy Portraits (Grandmother, Mother, Daughter)',
      'Gentle Garden & Countryside Natural Light Sessions',
      'Candid Mother-Child Embraces & Laughter',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'fathers-day',
    slug: 'fathers-day',
    num: '08',
    name: "Father's Day Photography",
    route: '/fathers-day',
    badge: '08 — STRENGTH & GUIDANCE',
    headline: 'Celebrating Camaraderie, Quiet Pride & Lifelong Bonds',
    tagline: 'Outdoor adventures, proud milestones, and genuine paternal warmth.',
    description:
      'Capturing the strength, patience, and humor of fatherhood. From playful outdoor adventures and sports to proud, candid family milestones.',
    specialties: [
      'Father-Son & Father-Daughter Outdoor Portraits',
      'Active Lifestyle & Shared Passion Photography',
      'Multigenerational Legacy Frames',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'corporate-events',
    slug: 'corporate-events',
    num: '09',
    name: 'Corporate Event Photography',
    route: '/corporate-events',
    badge: '09 — COMMERCIAL EXCELLENCE',
    headline: 'High-Impact Brand Gatherings, Summits & Galas',
    tagline: 'Executive headshots, conference keynotes, networking galas, and awards.',
    description:
      'Polished, professional coverage for business summits, annual galas, executive leadership headshots, panel conferences, and corporate celebrations across the UK.',
    specialties: [
      'Conference Keynotes, Panel Discussions & Stage Illumination',
      'Executive Leadership & Team Headshot Studios',
      'VIP Networking Receptions & Awards Galas',
      'Fast-Turnaround Digital Press & Media Packs',
    ],
    pricingGuide: 'Custom Corporate Rates or Premium (£1,150)',
  },
  {
    id: 'family',
    slug: 'family',
    num: '10',
    name: 'Family Photography',
    route: '/family',
    badge: '10 — GENERATIONS UNITED',
    headline: 'Timeless Family Legacies & Unscripted Laughter',
    tagline: 'Natural lifestyle portraits in parklands, private estates, and cozy homes.',
    description:
      'Thoughtful, unscripted family portraiture capturing genuine interaction, warm laughter, and the distinctive personalities of children and parents alike.',
    specialties: [
      'Scenic UK Parklands & Estate Outdoor Sessions',
      'Relaxed In-Home Lifestyle Storytelling',
      'Multigenerational Heirloom Group Frames',
      'Museum-Grade Canvas & Framed Wall Art',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'maternity',
    slug: 'maternity',
    num: '11',
    name: 'Maternity Photography',
    route: '/maternity',
    badge: '11 — THE MIRACLE OF LIFE',
    headline: 'Elegance & Expecting Wonder',
    tagline: 'Poetic fine-art portraits celebrating the sacred anticipation of new life.',
    description:
      'Gentle, empowering fine-art maternity sessions celebrating the profound beauty of motherhood. Conducted either on-location in tranquil natural golden light or in private studio comfort.',
    specialties: [
      'Fine-Art Flowing Couture Gown Portraits',
      'Golden-Hour Meadow & Parkland Backdrops',
      'Intimate Partner & Sibling Connection Shots',
      'Studio Silhouette & Sculptural Shadow Direction',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'graduations',
    slug: 'graduations',
    num: '12',
    name: 'Graduation Photography',
    route: '/graduations',
    badge: '12 — ACADEMIC TRIUMPH',
    headline: 'Honoring Dedication, Ambition & Academic Milestone',
    tagline: 'Regalia portraits, mortarboard tosses, and proud family campus celebrations.',
    description:
      'Commemorating years of scholarly commitment with proud academic regalia portraits, university campus architecture, and joyful family celebrations.',
    specialties: [
      'Campus Historic Architecture & University Grounds',
      'Individual Formal Regalia, Gown & Hood Portraits',
      'Iconic Mortarboard Toss & Diploma Poses',
      'Proud Family & Mentor Commemorative Photos',
    ],
    pricingGuide: 'Essential Package (£495)',
  },
  {
    id: 'sports-shoot',
    slug: 'sports-photography',
    num: '13',
    name: 'Sports Photography',
    route: '/sports-photography',
    badge: '13 — ATHLETIC ACTION & POWER',
    headline: 'High-Speed Action & Unstoppable Athletic Spirit',
    tagline: 'Precision motion, arena drama, athletic grit, and championship glory.',
    description:
      'From stadium floodlights and trackside sprints to competitive media days and intense training sessions, our sports photography captures peak performance with split-second precision using high-speed optical tracking.',
    specialties: [
      'Decisive Peak Action & High-Burst Motion Tracking',
      'Strobed Rim-Light Athlete & Competitor Portraits',
      'Team Camaraderie, Sideline Emotion & Victory Roars',
      'Commercial Sports Apparel, Sponsor & Fitness Visuals',
    ],
    pricingGuide: 'Essential (£495) or Bespoke Club/Commercial Commission',
  },
  {
    id: 'product-shoot',
    slug: 'product-photography',
    num: '14',
    name: 'Product Photography',
    route: '/product-photography',
    badge: '14 — COMMERCIAL CRAFTSMANSHIP',
    headline: 'Meticulous Optics That Elevate Premium Brands',
    tagline: 'Pristine reflections, studio precision, macro details, and commercial impact.',
    description:
      'Studio e-commerce imagery, macro texture details, and bespoke lifestyle scenes using color-calibrated lighting, precision focus stacking, and pristine reflections engineered for luxury brands, Shopify, and global campaigns.',
    specialties: [
      'Hero Packaging, Glass Bottles & Luxury Geometry',
      'Styled In-Context Lifestyle Backdrops & Prop Sourcing',
      'Macro Material Details (Droplets, Leather Grains, Fabrics)',
      'Flawless Pure White E-Commerce Cutouts & Clipping Paths',
    ],
    pricingGuide: 'Starting from £495 (Volume rates available)',
  },
  {
    id: 'car-shoot',
    slug: 'car-photography',
    num: '15',
    name: 'Car & Vehicle Photography',
    route: '/car-photography',
    badge: '15 — AUTOMOTIVE SCULPTURE & SPEED',
    headline: 'Sculpted Reflections & Pure Automotive Passion',
    tagline: 'Rolling shutter rigs, aerodynamic contours, cockpit art, and night light painting.',
    description:
      'Automotive photography mastering metallic reflections and velocity. Shot on winding countryside passes, private airstrips, and urban architectural backdrops with polarized optics, rolling rigs, and continuous handheld LED light sweeps.',
    specialties: [
      'Rolling Motion Tracking (Motion Blur Wheels, Razor-Sharp Body)',
      'Aggressive Stance & Low-Angle 3/4 Sculptural Profiles',
      'Cockpit, Dial, and Quilted Leather Craft Details',
      'Dramatic Night Light Painting & Reflections',
    ],
    pricingGuide: 'Starting from £495 (Track & runway packages available)',
  },
  {
    id: 'reels-shoot',
    slug: 'reels-shoots',
    num: '16',
    name: 'Reels & Creative Video Shoots',
    route: '/reels-shoots',
    badge: '16 — 9:16 VERTICAL CINEMA & TRENDS',
    headline: 'High-Impact Vertical Stories That Captivate & Go Viral',
    tagline: 'Cinematic match-cuts, trending audio, 4K gimbals, and viral social motion.',
    description:
      'We produce cinematic 9:16 vertical reels for luxury weddings, VIP milestone celebrations, creative personal branding, and product launches using 4K stabilized gimbals, licensed trending audio, and 24–48 hour delivery.',
    specialties: [
      'Wedding & VIP Event Teaser Reels (48hr Turnaround)',
      'High-Energy Entrances & Beat-Matched Dance Floors',
      'Creative Match-Cuts, Speed Ramping & Cinematic Transitions',
      'Optimized for Instagram Reels, TikTok & YouTube Shorts',
    ],
    pricingGuide: 'Add-on or standalone from £495',
  },
  {
    id: 'model-shoot',
    slug: 'model-photography',
    num: '17',
    name: 'Model & Fashion Photography',
    route: '/model-photography',
    badge: '17 — HAUTE COUTURE & EDITORIAL EXPRESSION',
    headline: 'High-Fashion Aesthetics & Striking Model Portfolios',
    tagline: 'Poetic lighting, agency Z-cards, avant-garde direction, and haute couture.',
    description:
      'Whether building your inaugural agency Z-card or updating your international book, we offer high-fashion creative direction, sculptural studio strobes, and location editorial setups across London historical and contemporary settings.',
    specialties: [
      'Haute Couture Studio Editorial & Silhouette Posing',
      'Clean Natural Beauty Headshots & Skin Texture Preservation',
      'Urban Architectural Street Style & Fashion Lookbooks',
      'Complete Agency Z-Card & Comp Sheet Digital Layouts',
    ],
    pricingGuide: 'Starting from £495',
  },
]

/**
 * Reads live data from content.json safely (always fresh from disk)
 */
export function getLiveContent() {
  try {
    if (existsSync(contentPath)) {
      return JSON.parse(readFileSync(contentPath, 'utf8'))
    }
  } catch (err) {
    console.error('Error reading content.json for knowledge base:', err)
  }
  return {}
}

/**
 * Reads live data from photos.json safely (always fresh from disk)
 */
export function getLivePhotos() {
  try {
    if (existsSync(photosPath)) {
      return JSON.parse(readFileSync(photosPath, 'utf8'))
    }
  } catch (err) {
    console.error('Error reading photos.json for knowledge base:', err)
  }
  return { categories: [], photos: [] }
}

/**
 * Reads live promotional offers from offers.json safely (always fresh from disk)
 * Filters ONLY published, active offers.
 */
export function getLiveOffers() {
  try {
    if (existsSync(offersPath)) {
      const data = JSON.parse(readFileSync(offersPath, 'utf8'))
      const allOffers = Array.isArray(data) ? data : data.offers || []

      // Filter only active, published offers
      const publishedOffers = allOffers.filter((o) => {
        if (!o) return false
        if (o.published === false) return false
        if (o.computedStatus === 'hidden') return false

        // Check date validity if configured
        const today = new Date().toISOString().split('T')[0]
        if (o.endDate && o.endDate < today) return false
        return true
      })

      return publishedOffers
    }
  } catch (err) {
    console.error('Error reading offers.json for knowledge base:', err)
  }
  return []
}

/**
 * Compiles a rich, live, unified knowledge snapshot of Josh Photography.
 * Automatically reflects every Admin Panel save without any cache staleness.
 */
export function getKnowledgeBase() {
  const content = getLiveContent()
  const photos = getLivePhotos()
  const activeOffers = getLiveOffers()

  const studio = content.studio || {}
  const about = content.about || {}
  const anotherStudio = content.anotherStudio || {}
  const announcement = studio.announcement || {}
  const services = content.services || []
  const testimonials = (content.testimonials || []).filter((t) => t.published !== false)
  const stats = about.stats || [
    { value: '250+', label: 'Weddings Captured' },
    { value: '250+', label: 'Happy Families' },
    { value: '200+', label: 'Celebrations Covered' },
    { value: '20+', label: 'Features & Awards' },
  ]

  const studioPhone = studio.phone || '+44 7988 827057'
  const studioWhatsapp = studio.whatsapp || '+44 7988 827057'
  const cleanWhatsapp = String(studioWhatsapp).replace(/[^0-9]/g, '') || '447988827057'
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}`

  return {
    studio: {
      name: studio.name || 'Josh Photography',
      tagline: studio.tagline || 'Timeless Stories Worth Remembering — Masterfully Preserved',
      description:
        studio.description ||
        'Fine-art documentary storytelling preserving authentic raw emotion and sacred heirlooms across the United Kingdom and Europe.',
      location: studio.location || 'KG House – Northampton, United Kingdom',
      address:
        studio.address ||
        'Unit H5/J, KG House, Northampton, Northamptonshire, NN5 7QS, United Kingdom',
      phone: studioPhone,
      whatsapp: studioWhatsapp,
      whatsappUrl,
      email: studio.email || 'joshyjose282@gmail.com',
      openingHours:
        studio.openingHours ||
        'Monday – Saturday: 9:00 AM – 6:00 PM | Sunday: By Private Appointment',
      region:
        'Northamptonshire, Greater London, Surrey, Hertfordshire, Cotswolds, and commissions across the United Kingdom and destination events',
    },
    anotherStudio: {
      enabled: anotherStudio.enabled !== false,
      studioName: anotherStudio.studioName || 'De Fab Studio',
      eyebrow: anotherStudio.eyebrow || 'OUR ANOTHER STUDIO — UNITED KINGDOM',
      heading: anotherStudio.heading || 'Introducing De Fab Studio',
      subheading: anotherStudio.subheading || 'A New Space for Extraordinary Stories.',
      tagline: anotherStudio.tagline || 'Every Moment Has a Story. Let Us Capture Yours.',
      paragraphs: anotherStudio.paragraphs || [
        "We are delighted to introduce De Fab Studio, our additional photography studio in the United Kingdom, expanding our commitment to capturing life's most meaningful moments with creativity, artistry, and professionalism.",
        'From beautiful weddings and engagement sessions to birthdays, anniversaries, maternity shoots, newborn portraits, and family celebrations, we create timeless photographs that preserve genuine emotions and unforgettable memories.',
      ],
      exploreRoute: anotherStudio.exploreButtonLink || '/portfolio',
      availabilityRoute: anotherStudio.availabilityButtonLink || '/check-availability',
    },
    announcement: {
      title: announcement.title || 'Our New Studio Space',
      badge: announcement.badge || '04 — COMING SOON',
      description:
        announcement.description ||
        'We are preparing to open our dedicated photography studio space next month!',
      status: 'Opening next month',
      previewImages: studio.previewImages || [],
      facilities: studio.facilities || [
        'Natural light shooting bay with high ceilings',
        'Parabolic portrait lighting suite',
        'Client consultation and album design lounge',
        'High-speed color-calibrated tethering station',
      ],
        equipment: studio.equipment || [
          'Dual-card full-frame cinema bodies',
          'High-speed prime lenses (35mm, 50mm, 85mm f/1.2)',
          'Color-calibrated proofing monitors',
          'Silent electronic shutter optics for church ceremonies',
        ],
    },
        about: {
          heroBadge: about.heroBadge || 'BEHIND THE LENS · JOSH PHOTOGRAPHY',
          heroTitle: about.heroTitle || 'Preserving the Moments That Make Us Human',
          heroDescription: about.heroDescription || 'Dedicated to chronicling weddings, milestone celebrations, and family connections with timeless artistry.',
          storyParagraph1: about.storyParagraph1 || 'Josh Photography was founded with a singular conviction: that life’s most precious feelings should never fade with memory.',
          storyParagraph2: about.storyParagraph2 || 'We believe that great photography is not about perfection or artificial performance; it is about presence.',
          photographerName: about.photographerName || 'Josh',
          photographerRole: about.photographerRole || 'Lead Photographer & Founder',
          photographerHeadline: about.photographerHeadline || 'Editorial Mastery & Quiet Presence',
          photographerBio1: about.photographerBio1 || 'Hello, I am Josh. As a photographer, my goal is simple: to document your most meaningful milestones so faithfully that every time you revisit your photographs, you are instantly transported back to how the moment truly felt.',
          photographerBio2: about.photographerBio2 || 'My approach combines quiet photojournalism with refined, editorial portraiture across church ceremonies, countryside manors, and family gatherings.',
          photographerQuote: about.photographerQuote || "I don't just photograph what things look like — I photograph what they feel like. Your family's unique laughter, sacred vows, and candid joys deserve to be captured with dignity and timeless care.",
          stats,
          pillars: about.pillars || [
            { title: 'Emotional Authenticity', desc: 'We never force artificial poses or stiff smiles. The truest beauty lives in honest tears and spontaneous laughter.' },
            { title: 'Unobtrusive Documentary Approach', desc: 'We blend seamlessly into your celebration without interrupting sacred rituals.' },
            { title: 'Timeless Warmth & Elegant Composition', desc: 'Individually color-graded with organic tones that honor true skin tones.' },
            { title: 'Archival Heirloom Longevity', desc: 'Handcrafted albums and high-res files engineered to outlive generations.' },
          ],
          faqs: about.faqs || [],
        },
        packages: OFFICIAL_PACKAGES,
        addons: OFFICIAL_ADDONS,
        categories: ALL_17_CATEGORIES,
        offers: activeOffers,
        testimonials,
        services: services.map((s) => ({
          id: s.id,
          title: s.title,
          desc: s.desc || s.description,
          quote: s.quote,
          path: s.path,
        })),
        delivery: {
          previewTime: '25–30 hand-graded highlight frames delivered within 48 to 72 hours',
          fullGalleryTime: 'Complete high-resolution digital gallery delivered within 3 to 4 weeks',
          format:
            'Password-protected online gallery with instant downloads, high-res & web formats, optional USB gift box and handcrafted heirloom albums',
        },
        bookingAdvice: {
          weddingAdvance: '6 to 12 months in advance for peak UK wedding season and weekend dates',
          celebrationAdvance: '3 to 6 weeks in advance for birthdays, newborns, maternity, and family sessions',
          howToBook:
            'Submit an inquiry via /contact or /check-availability, or message directly on WhatsApp (+44 7988 827057). A consultation and retainer secure your date.',
        },
  }
  }
