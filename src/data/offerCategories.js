// ============================================================
// OFFER CATEGORIES & DEFAULT HERO IMAGES — JOSH PHOTOGRAPHY
// All 12 primary photography categories + 5 additional shoot types
// ============================================================

export const OFFER_CATEGORIES = [
  // ── 12 Primary Photography Categories (Matching Dropdown & Photography Pages) ──
  {
    id: 'weddings',
    label: 'Wedding Photography',
    defaultPath: '/weddings',
    defaultHeroImage: '/images/hero-church-wedding.jpg',
    icon: '💍',
    isPrimaryCategory: true,
  },
  {
    id: 'birthdays',
    label: 'Birthday Celebrations',
    defaultPath: '/birthday-photography',
    defaultHeroImage: '/images/birthday_01.png',
    icon: '🎂',
    isPrimaryCategory: true,
  },
  {
    id: 'engagement',
    label: 'Engagement Photography',
    defaultPath: '/engagement',
    defaultHeroImage: '/images/engagement-img-1.jpg',
    icon: '💎',
    isPrimaryCategory: true,
  },
  {
    id: 'anniversary',
    label: 'Anniversary Photography',
    defaultPath: '/anniversary',
    defaultHeroImage: '/images/Anniversary-img-2.jpg',
    icon: '🥂',
    isPrimaryCategory: true,
  },
  {
    id: 'baby-family',
    label: 'Baby & Newborn Photography',
    defaultPath: '/baby-family',
    defaultHeroImage: '/images/baby-family-img-3.jpg',
    icon: '👶',
    isPrimaryCategory: true,
  },
  {
    id: 'festivals',
    label: 'Festival & Cultural Celebrations',
    defaultPath: '/festivals',
    defaultHeroImage: '/images/christmas-festival.jpg',
    icon: '✨',
    isPrimaryCategory: true,
  },
  {
    id: 'mothers-day',
    label: "Mother's Day Photography",
    defaultPath: '/mothers-day',
    defaultHeroImage: '/images/mothersday-img-2.jpg',
    icon: '🌸',
    isPrimaryCategory: true,
  },
  {
    id: 'fathers-day',
    label: "Father's Day Photography",
    defaultPath: '/fathers-day',
    defaultHeroImage: '/images/fatherday-img-3.jpg',
    icon: '👔',
    isPrimaryCategory: true,
  },
  {
    id: 'corporate-events',
    label: 'Corporate Event Photography',
    defaultPath: '/corporate-events',
    defaultHeroImage: '/images/corporate-img-1.jpg',
    icon: '🏢',
    isPrimaryCategory: true,
  },
  {
    id: 'family',
    label: 'Family Photography',
    defaultPath: '/family',
    defaultHeroImage: '/images/family-photography-img-5.jpg',
    icon: '👨‍👩‍👧‍👦',
    isPrimaryCategory: true,
  },
  {
    id: 'maternity',
    label: 'Maternity Photography',
    defaultPath: '/maternity',
    defaultHeroImage: '/images/maternity-editorial-portrait.jpg',
    icon: '🤰',
    isPrimaryCategory: true,
  },
  {
    id: 'graduations',
    label: 'Graduation Photography',
    defaultPath: '/graduations',
    defaultHeroImage: '/images/Graduation-Photography-img-1.jpg',
    icon: '🎓',
    isPrimaryCategory: true,
  },

  // ── 5 Additional Categories (Now Full Photography Categories) ──
  {
    id: 'sports-shoot',
    label: 'Sports Photography',
    defaultPath: '/sports-photography',
    defaultHeroImage: '/images/sports_shoot_1.jpg',
    icon: '⚽',
    isPrimaryCategory: true,
  },
  {
    id: 'product-shoot',
    label: 'Product Photography',
    defaultPath: '/product-photography',
    defaultHeroImage: '/images/product_shoot_1.jpg',
    icon: '📦',
    isPrimaryCategory: true,
  },
  {
    id: 'car-shoot',
    label: 'Car & Vehicle Photography',
    defaultPath: '/car-photography',
    defaultHeroImage: '/images/car_shoot_1.jpg',
    icon: '🏎️',
    isPrimaryCategory: true,
  },
  {
    id: 'reels-shoot',
    label: 'Reels & Creative Video Shoots',
    defaultPath: '/reels-shoots',
    defaultHeroImage: '/images/reel_shoot_1.jpg',
    icon: '🎬',
    isPrimaryCategory: true,
  },
  {
    id: 'model-shoot',
    label: 'Model & Fashion Photography',
    defaultPath: '/model-photography',
    defaultHeroImage: '/images/model_shoot_1.jpg',
    icon: '📸',
    isPrimaryCategory: true,
  },
]

// Fast lookup map for categories and aliases
const CATEGORY_MAP = OFFER_CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat
  return acc
}, {})

// Aliases for backward compatibility and alternate slugs
CATEGORY_MAP['baby-newborn-maternity'] = CATEGORY_MAP['baby-family']
CATEGORY_MAP['baby-and-family'] = CATEGORY_MAP['baby-family']
CATEGORY_MAP['christmas'] = CATEGORY_MAP['festivals']
CATEGORY_MAP['cultural-celebrations'] = CATEGORY_MAP['festivals']
CATEGORY_MAP['birthday-photography'] = CATEGORY_MAP['birthdays']
CATEGORY_MAP['birthdays-shoot'] = CATEGORY_MAP['birthdays']
CATEGORY_MAP['pre-wedding'] = CATEGORY_MAP['engagement']
CATEGORY_MAP['engagement-shoot'] = CATEGORY_MAP['engagement']
CATEGORY_MAP['anniversary-shoot'] = CATEGORY_MAP['anniversary']
CATEGORY_MAP['portraits'] = CATEGORY_MAP['corporate-events']
CATEGORY_MAP['corporate'] = CATEGORY_MAP['corporate-events']
CATEGORY_MAP['graduation'] = CATEGORY_MAP['graduations']
CATEGORY_MAP['graduation-photography'] = CATEGORY_MAP['graduations']
CATEGORY_MAP['sports-photography'] = CATEGORY_MAP['sports-shoot']
CATEGORY_MAP['product-photography'] = CATEGORY_MAP['product-shoot']
CATEGORY_MAP['car-photography'] = CATEGORY_MAP['car-shoot']
CATEGORY_MAP['cars-shoot'] = CATEGORY_MAP['car-shoot']
CATEGORY_MAP['reels-shoots'] = CATEGORY_MAP['reels-shoot']
CATEGORY_MAP['model-photography'] = CATEGORY_MAP['model-shoot']

export const getCategoryHeroImage = (id) => {
  if (!id) return ''
  return CATEGORY_MAP[id]?.defaultHeroImage || ''
}

export const getCategoryLabel = (id) => {
  if (!id) return ''
  return CATEGORY_MAP[id]?.label || id
}

export const getCategoryPath = (id) => {
  if (!id) return '/check-availability'
  return CATEGORY_MAP[id]?.defaultPath || '/check-availability'
}
