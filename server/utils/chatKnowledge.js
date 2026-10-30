import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contentPath = join(__dirname, '../data/content.json')
const photosPath = join(__dirname, '../data/photos.json')

// Official Packages and Pricing for Josh Photography
export const OFFICIAL_PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Package',
    subtitle: 'For intimate celebrations and personal milestones',
    price: 'Starting From £495',
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

/**
 * Reads live data from content.json safely
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
 * Reads live data from photos.json safely
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
 * Compiles a rich, structured knowledge snapshot of Josh Photography
 */
export function getKnowledgeBase() {
  const content = getLiveContent()
  const photos = getLivePhotos()

  const studio = content.studio || {
    name: 'Josh Photography',
    tagline: 'Stories Worth Remembering',
    location: 'Greater London, United Kingdom',
    phone: '+44 7988 827057',
    whatsapp: '+447988827057',
    email: 'hello@joshphotography.co.uk',
    openingHours: 'Monday – Saturday: 9:00 AM – 6:00 PM | Sunday: By Private Appointment',
  }

  const about = content.about || {}
  const announcement = studio.announcement || {}
  const services = content.services || []
  const testimonials = content.testimonials || []
  const faqs = about.faqs || []
  const categories = photos.categories || []

  return {
    studio: {
      name: studio.name || 'Josh Photography',
      tagline: studio.tagline || 'Stories Worth Remembering',
      description: studio.description || 'Crafting visual stories that transcend time. Every frame, a masterpiece.',
      location: studio.location || 'Greater London, United Kingdom',
      address: studio.address || 'Greater London, United Kingdom (By appointment)',
      phone: studio.phone || '+44 7988 827057',
      whatsapp: studio.whatsapp || '+447988827057',
      whatsappUrl: `https://wa.me/${(studio.whatsapp || '447988827057').replace(/[^0-9]/g, '')}`,
      email: studio.email || 'hello@joshphotography.co.uk',
      openingHours: studio.openingHours || 'Monday – Saturday: 9:00 AM – 6:00 PM | Sunday: By Private Appointment',
      region: 'Greater London, Surrey, Hertfordshire, Cotswolds, and nationwide commissions across the United Kingdom',
    },
    announcement: {
      title: announcement.title || 'Our New Studio Space',
      badge: announcement.badge || '04 — COMING SOON',
      description: announcement.description || 'We are preparing to open our dedicated photography studio space next month in Greater London!',
      status: 'Opening next month',
      facilities: studio.facilities || [
        'Natural light shooting bay with high ceilings',
        'Parabolic portrait lighting suite',
        'Client consultation and album design lounge',
        'High-speed color-calibrated tethering station',
      ],
      gear: studio.equipment || [
        'Dual-card full-frame cinema bodies',
        'High-speed prime lenses (35mm, 50mm, 85mm f/1.2)',
        'Color-calibrated proofing monitors',
        'Silent electronic shutter optics for church ceremonies',
      ],
    },
    photographer: {
      lead: 'Josh — Lead Photographer & Founder (10+ years capturing luxury weddings and celebrations)',
      associate: 'Elena Vance — Associate Photographer & Lighting Specialist',
      philosophy: 'Light is fleeting. Emotion is forever. We focus on unhurried presence, emotional authenticity, and archival longevity.',
      stats: about.stats || [
        { value: '450+', label: 'Weddings Captured' },
        { value: '1,200+', label: 'Happy Families' },
        { value: '1,800+', label: 'Celebrations Covered' },
        { value: '20+', label: 'Features & Awards' },
      ],
    },
    packages: OFFICIAL_PACKAGES,
    addons: OFFICIAL_ADDONS,
    delivery: {
      previewTime: '25–30 hand-graded highlight frames delivered within 48 to 72 hours',
      fullGalleryTime: 'Complete high-resolution digital gallery delivered within 3 to 4 weeks',
      format: 'Password-protected online gallery with instant downloads, high-res & web formats, optional USB gift box and handcrafted heirloom albums',
    },
    bookingAdvice: {
      weddingAdvance: '6 to 12 months in advance for peak UK wedding season and weekend dates',
      celebrationAdvance: '3 to 6 weeks in advance for birthdays, newborns, maternity, and family sessions',
      howToBook: 'Submit an inquiry via /contact or /check-availability, message on WhatsApp (+44 7988 827057), or call directly. A consultation and retainer secure your date.',
    },
    services: services.map((s) => ({
      id: s.id,
      title: s.title,
      desc: s.desc || s.description,
      quote: s.quote,
      path: s.path,
    })),
    categories: categories.map((c) => ({
      id: c.id,
      label: c.label,
      slug: c.slug,
    })),
    faqs,
    testimonials: testimonials.slice(0, 5),
  }
}
