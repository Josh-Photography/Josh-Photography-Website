import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { photographyCategories } from '../src/data/categoriesData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Photos
const allPhotos = []
let orderCounter = 1

photographyCategories.forEach((cat) => {
  ;(cat.cards || []).forEach((card, idx) => {
    allPhotos.push({
      id: `photo-${cat.id}-${idx + 1}`,
      title: card.title || `Photograph ${idx + 1}`,
      desc: card.desc || '',
      alt: card.alt || card.title || '',
      category: cat.id,
      image: card.image,
      src: card.image,
      srcLarge: card.image,
      num: card.num || String(idx + 1).padStart(2, '0'),
      order: orderCounter++,
      published: true,
      createdAt: new Date().toISOString(),
    })
  })
})

const photosData = {
  categories: photographyCategories.map((c) => ({
    id: c.id,
    label: c.name,
    slug: c.slug,
  })),
  photos: allPhotos,
}

fs.writeFileSync(
  path.join(__dirname, 'data/photos.json'),
  JSON.stringify(photosData, null, 2)
)

// 2. Content
const contentData = {
  studio: {
    name: 'Josh Photography',
    tagline: 'Stories Worth Remembering',
    description:
      'Crafting visual stories that transcend time. Every frame, a masterpiece.',
    location: 'Greater London, United Kingdom',
    address: 'Greater London, United Kingdom',
    email: 'hello@joshphotography.co.uk',
    phone: '+44 7988 827057',
    whatsapp: '+447988827057',
    openingHours:
      'Monday – Saturday: 9:00 AM – 6:00 PM | Sunday: By Private Appointment',
    announcement: {
      badge: '04 — COMING SOON',
      title: 'Our New Studio Space',
      description:
        'We are delighted to announce that we are preparing to open our dedicated photography studio space next month!',
      disclaimer:
        'Studio Preview Notice: The imagery below represents an illustrative visual concept of our upcoming studio facilities, specialized lighting configurations, and consultation spaces. Actual studio premises photographs will be released upon our grand opening next month. Consultations and commissions are currently available on-location and by private appointment.',
      ctaText: 'Join Studio Opening Guestlist',
      ctaLink: '/contact',
      published: true,
    },
    previewImages: [
      {
        id: 'studio-interior',
        title: 'Natural Light Studio Space',
        subtitle: 'Studio Concept · Opening Next Month',
        desc: 'Spacious, high-ceiling studio area designed for gentle natural light and family comfort.',
        src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80',
        alt: 'Illustrative concept of an elegant natural light photography studio interior',
        order: 1,
        published: true,
      },
      {
        id: 'studio-equipment',
        title: 'Professional Optics & Equipment',
        subtitle: 'Precision Gear Setup',
        desc: 'Dual-card full-frame cinema bodies, high-speed prime lenses, and color-calibrated tethering.',
        src: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1000&q=80',
        alt: 'Illustrative photography gear setup with professional cameras and prime lenses',
        order: 2,
        published: true,
      },
      {
        id: 'studio-lighting',
        title: 'Dedicated Portrait Lighting Area',
        subtitle: 'Sculptural Light Setup',
        desc: 'Large parabolic softboxes and diffused light modifiers configured for soft, flattering skin tones.',
        src: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1000&q=80',
        alt: 'Illustrative studio portrait lighting equipment and softbox setup',
        order: 3,
        published: true,
      },
      {
        id: 'studio-consultation',
        title: 'Client Consultation & Lounge',
        subtitle: 'Welcoming Meeting Space',
        desc: 'A calm, relaxed space to review heirloom album swatches, screen films, and plan your celebration.',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80',
        alt: 'Illustrative client consultation and album review lounge space',
        order: 4,
        published: true,
      },
    ],
    facilities: [
      'Natural light shooting bay with high ceilings',
      'Parabolic portrait lighting suite',
      'Client consultation and album design lounge',
      'High-speed color-calibrated tethering station',
    ],
    equipment: [
      'Dual-card full-frame cinema bodies',
      'High-speed prime lenses (35mm, 50mm, 85mm f/1.2)',
      'Color-calibrated proofing monitors',
      'Silent electronic shutter optics for church ceremonies',
    ],
  },
  about: {
    heroBadge: 'BEHIND THE LENS · JOSH PHOTOGRAPHY',
    heroTitle: 'Preserving the Moments That Make Us Human',
    heroDescription:
      'We believe that photography is an art of quiet observation. It is about being present in the sacred, the joyful, and the tender moments that define a lifetime.',
    storyBadge: '01 — OUR STORY',
    storyTitle: 'Capturing What Cannot Be Replaced',
    storyParagraph1:
      'Josh Photography was founded with a singular conviction: that life’s most precious feelings should never fade with memory. The quiet reverence before wedding vows, the spontaneous burst of laughter during a first birthday cake cutting, the tear on a father’s cheek, and the warmth of hands held over decades.',
    storyParagraph2:
      'We believe that great photography is not about perfection or artificial performance; it is about presence. We observe with quiet reverence and gentle direction, giving couples and families the freedom to be wholly themselves while we capture heirloom imagery they will treasure for a lifetime.',
    storyImage:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80',
    storyQuote: 'Light is fleeting. Emotion is forever.',
    stats: [
      { value: '450+', label: 'Weddings Captured' },
      { value: '1,200+', label: 'Happy Families' },
      { value: '1,800+', label: 'Celebrations Covered' },
      { value: '20+', label: 'Features & Awards' },
    ],
    photographerBadge: '02 — MEET THE PHOTOGRAPHER',
    photographerHeadline: 'A Passion for Authentic Storytelling',
    photographerName: 'Josh',
    photographerRole: 'Lead Photographer & Founder',
    photographerImage:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900&q=80',
    photographerBio1:
      'Hello, I am Josh. As a photographer, my goal is simple: to document your most meaningful milestones so faithfully that every time you revisit your photographs, you are instantly transported back to how the moment truly felt.',
    photographerBio2:
      'My approach combines quiet photojournalism with refined, editorial portraiture. Whether documenting a sacred church ceremony in the English countryside, a historic countryside manor celebration, or a joyful family garden gathering, I bring patience, warmth, and keen observation to every commission.',
    photographerQuote:
      "I don't just photograph what things look like — I photograph what they feel like. Your family's unique laughter, sacred vows, and candid joys deserve to be captured with dignity and timeless care.",
    pillars: [
      {
        title: 'Emotional Authenticity',
        desc: 'We never force artificial poses or stiff smiles. The truest beauty lives in honest tears, spontaneous laughter, and quiet glances between loved ones.',
      },
      {
        title: 'Unobtrusive Documentary Approach',
        desc: 'We blend seamlessly into your wedding or family celebration, capturing the natural rhythm of your day without interrupting sacred rituals.',
      },
      {
        title: 'Timeless Warmth & Elegant Composition',
        desc: 'Every image is individually color-graded with rich, organic tones that honor true skin tones and fabric textures without fading trends.',
      },
      {
        title: 'Archival Heirloom Longevity',
        desc: 'We design our photographs and handcrafted albums to outlive generations. Fifty years from now, your family will look at these frames with awe.',
      },
    ],
    faqs: [
      {
        q: 'How far in advance should we inquire for dates?',
        a: 'We recommend inquiring 6 to 12 months in advance for peak UK wedding dates and weekend celebrations. For newborn, family, and birthday sessions, 3 to 6 weeks notice is ideal.',
      },
      {
        q: 'Which areas do you cover for commissions?',
        a: 'We regularly photograph weddings and celebrations across regional venues, private countryside estates, and select destination commissions.',
      },
      {
        q: 'When will our photography gallery be delivered?',
        a: 'You will receive a curated preview of 25–30 hand-graded highlight frames within 48 to 72 hours of your celebration. Your full, high-resolution digital gallery is delivered within 3 to 4 weeks.',
      },
      {
        q: 'Can we visit your studio for an in-person consultation?',
        a: 'Our new dedicated studio premises will be officially opening next month! In the meantime, we are delighted to meet with couples and families virtually or by private appointment to review portfolio collections and discuss your plans.',
      },
    ],
  },
  heroSlides: [
    {
      id: 1,
      shortName: 'Weddings',
      category: 'Wedding Photography',
      badge: '01 / 12 — THE SACRED COVENANT',
      image: '/images/hero-church-wedding.jpg',
      title: 'Sacred Church Vows',
      subtitle:
        'Timeless British Weddings Chronicled with Quiet Reverence & Artistry',
      alt: 'Traditional British church wedding ceremony with bride and groom at the altar',
      explorePath: '/weddings',
      exploreText: 'Explore Wedding Photography',
      order: 1,
      published: true,
    },
    {
      id: 2,
      shortName: 'Birthdays',
      category: 'Birthday Celebrations',
      badge: '02 / 12 — JOYFUL MILESTONES',
      image: '/images/birthday_01.png',
      title: 'Unscripted Laughter & Cake',
      subtitle:
        'From First Milestones to Grand Jubilees, Every Wonder Documented',
      alt: 'Joyful birthday celebration with children, glowing candles, balloons, and cake',
      explorePath: '/birthday-photography',
      exploreText: 'Explore Birthday Celebrations',
      order: 2,
      published: true,
    },
    {
      id: 3,
      shortName: 'Pre-Wedding',
      category: 'Pre-Wedding Photography',
      badge: '03 / 12 — INTIMATE PRELUDES',
      image: '/images/pre-wedding-img-1.jpg',
      title: 'Cinematic Love Stories',
      subtitle:
        'Editorial Newlywed Preludes Captured Across English Countryside Estates',
      alt: 'Couple enjoying intimate romantic golden hour moments across country estate',
      explorePath: '/pre-wedding',
      exploreText: 'Explore Pre-Wedding',
      order: 3,
      published: true,
    },
    {
      id: 4,
      shortName: 'Family',
      category: 'Family Photography',
      badge: '04 / 12 — GENERATIONS TOGETHER',
      image: '/images/family-photography-img-5.jpg',
      title: 'Authentic Family Bonds',
      subtitle:
        'Documenting Heartfelt Connections & Quiet Joy Across Generations',
      alt: 'Happy family gathered outdoors in golden evening light',
      explorePath: '/family',
      exploreText: 'Explore Family Photography',
      order: 4,
      published: true,
    },
  ],
  services: [
    {
      id: 1,
      num: '01',
      title: 'Wedding Photography',
      quote: 'Every ritual, every glance, every unrepeatable emotion.',
      desc: 'Full-day documentary coverage of sacred wedding celebrations. From historic British church ceremonies and cathedral aisles to countryside manor receptions, intimate couple portraits, and authentic family tears of joy.',
      image: '/images/hero-church-wedding.jpg',
      alt: 'Traditional British church wedding ceremony with floral arch at altar',
      path: '/weddings',
      ctaText: 'EXPLORE WEDDING STORIES',
      order: 1,
      published: true,
    },
    {
      id: 2,
      num: '02',
      title: 'Birthday Celebrations',
      quote: 'Every birthday has a story — far beyond the cake cutting.',
      desc: 'From milestone first birthdays to energetic themed parties, we document the anticipation, bespoke stage decor, joyous games, family embraces, and the quiet moments in between.',
      image: '/images/birthday_01.png',
      alt: 'Joyful birthday celebration with children, glowing candles, balloons, and cake',
      path: '/birthday-photography',
      ctaText: 'EXPLORE BIRTHDAY STORIES',
      order: 2,
      published: true,
    },
    {
      id: 3,
      num: '03',
      title: 'Maternity Photography',
      quote: 'Carrying life, radiating grace, embracing tomorrow.',
      desc: 'Gentle, empowering fine-art maternity sessions celebrating the profound beauty of motherhood. Conducted either on-location in tranquil natural light or in private comfort.',
      image: '/images/maternity-img-3.jpg',
      alt: 'Serene expectant mother in flowing ivory gown bathed in warm afternoon sunlight',
      path: '/maternity',
      ctaText: 'EXPLORE MATERNITY STORIES',
      order: 3,
      published: true,
    },
    {
      id: 4,
      num: '04',
      title: 'Family & Heirloom Portraits',
      quote: 'A legacy of connection, preserved across generations.',
      desc: 'Thoughtful, unscripted family portraiture capturing genuine interaction, warm laughter, and the distinctive personalities of children and parents alike.',
      image: '/images/family-photography-img-5.jpg',
      alt: 'Happy family embracing outdoors in gentle natural lighting',
      path: '/family',
      ctaText: 'EXPLORE FAMILY STORIES',
      order: 4,
      published: true,
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Eleanor & James',
      event: 'Church Wedding',
      location: 'Church & Countryside Manor',
      rating: 5,
      review:
        'Josh documented our church ceremony and manor reception with such breathtaking sensitivity. Looking through the gallery feels like reliving every vow, every tear, and every burst of laughter with our family.',
      image: '/images/church-wedding-ceremony.jpg',
      order: 1,
      published: true,
    },
    {
      id: 2,
      name: 'Eleanor & Oliver',
      event: 'Church Wedding & Countryside Reception',
      location: 'Cathedral & Country Estate',
      rating: 5,
      review:
        'Finding a photographer who understands both fine-art aesthetics and the quiet reverence of a traditional church ceremony was essential. Josh and his team captured every holy moment and candid glance flawlessly.',
      image: '/images/church-wedding-ceremony.jpg',
      order: 2,
      published: true,
    },
    {
      id: 3,
      name: 'Charlotte & Family',
      event: 'First Birthday & Cake Smash',
      location: 'First Milestone Celebration',
      rating: 5,
      review:
        'They captured our son’s first birthday with such patience. Not just the cake cutting, but the grandparents laughing, cousins playing on the lawn, and the little expressions we never want to forget.',
      image: '/images/birthday_01.png',
      order: 3,
      published: true,
    },
    {
      id: 4,
      name: 'David & Margaret',
      event: '30th Pearl Anniversary',
      location: 'Anniversary Gathering',
      rating: 5,
      review:
        'Our children organized a surprise anniversary lunch and booked Josh to photograph it. The multi-generational family portraits and candid moments now hold pride of place in our home.',
      image: '/images/Anniversary-img-2.jpg',
      order: 4,
      published: true,
    },
    {
      id: 5,
      name: 'Harrison & Victoria',
      event: 'Countryside Manor Wedding',
      location: 'Cotswolds Estate, UK',
      rating: 5,
      review:
        'From our morning preparations to the candlelight sparkler exit, Josh captured every fleeting glance and emotion with sheer editorial mastery. The gallery brought our entire family to tears.',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      order: 5,
      published: true,
    },
  ],
  collaborators: [
    {
      id: 1,
      name: 'Josh',
      role: 'Lead Photographer & Founder',
      bio: 'Over a decade documenting luxury weddings, candid celebrations, and multi-generational heirloom portraits across the United Kingdom.',
      image:
        'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900&q=80',
      social: {
        instagram: 'https://instagram.com/joshphotography.uk',
        whatsapp: '+447988827057',
      },
      order: 1,
      published: true,
    },
    {
      id: 2,
      name: 'Elena Vance',
      role: 'Associate Photographer & Lighting Specialist',
      bio: 'Specialist in candid photojournalism, multi-angle ceremony coverage, and soft ambient light portraits.',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85',
      social: {
        instagram: 'https://instagram.com/joshphotography.uk',
      },
      order: 2,
      published: true,
    },
  ],
  social: {
    instagram: {
      url: 'https://instagram.com/joshphotography.uk',
      name: 'Instagram',
      enabled: true,
    },
    facebook: {
      url: 'https://facebook.com/joshphotography.uk',
      name: 'Facebook',
      enabled: true,
    },
    whatsapp: {
      url: 'https://wa.me/447988827057',
      name: 'WhatsApp',
      enabled: true,
    },
  },
  settings: {
    siteName: 'Josh Photography',
    tagline: 'Luxury Wedding & Celebration Photography',
    logo: '/logo.png',
    logoBlack: '/logo-black.png',
    ctaButtonText: 'Check Availability',
    ctaButtonLink: '/check-availability',
    copyrightText: '© 2026 Josh Photography. All rights reserved.',
    footerDescription:
      'Josh Photography is an editorial wedding, celebration, and family photography studio serving London and the United Kingdom. We preserve the emotions, the laughter, and the quiet moments that make your celebrations unforgettable.',
    seoDefaultTitle:
      'Josh Photography | Luxury Wedding & Celebration Photography',
    seoDescription:
      'Josh Photography — Elegant, warm, and cinematic wedding and celebration photography in the United Kingdom.',
  },
}

fs.writeFileSync(
  path.join(__dirname, 'data/content.json'),
  JSON.stringify(contentData, null, 2)
)

// 3. Activity Log
const initialActivity = [
  {
    id: 'act-1',
    action: 'System initialized: Dynamic Josh Photography CMS',
    user: 'Admin',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'act-2',
    action:
      'Seeded 72 portfolio photographs across all 12 photography collections',
    user: 'Admin',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'act-3',
    action: 'Studio announcement and preview spaces configured',
    user: 'Admin',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
]
fs.writeFileSync(
  path.join(__dirname, 'data/activity.json'),
  JSON.stringify(initialActivity, null, 2)
)

console.log('Database seeded successfully!')
