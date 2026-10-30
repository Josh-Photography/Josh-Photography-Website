// ============================================================
// CATEGORY UTILITIES & CANONICAL NORMALIZATION — JOSH PHOTOGRAPHY
// Provides bidirectional normalization for all 17 categories
// ============================================================

export const PHOTOGRAPHY_CATEGORIES = [
  { id: 'weddings', label: 'Wedding Photography', canonical: 'weddings' },
  { id: 'birthdays', label: 'Birthday Celebrations', canonical: 'birthdays' },
  { id: 'engagement', label: 'Engagement Photography', canonical: 'engagement' },
  { id: 'anniversary', label: 'Anniversary Photography', canonical: 'anniversary' },
  { id: 'baby-family', label: 'Baby & Newborn Photography', canonical: 'baby-family' },
  { id: 'festivals', label: 'Festival & Cultural Celebrations', canonical: 'festivals' },
  { id: 'mothers-day', label: "Mother's Day Photography", canonical: 'mothers-day' },
  { id: 'fathers-day', label: "Father's Day Photography", canonical: 'fathers-day' },
  { id: 'corporate-events', label: 'Corporate Event Photography', canonical: 'corporate-events' },
  { id: 'family', label: 'Family Photography', canonical: 'family' },
  { id: 'maternity', label: 'Maternity Photography', canonical: 'maternity' },
  { id: 'graduations', label: 'Graduation Photography', canonical: 'graduations' },
  { id: 'sports-photography', label: 'Sports Photography', canonical: 'sports-photography' },
  { id: 'product-photography', label: 'Product Photography', canonical: 'product-photography' },
  { id: 'car-photography', label: 'Car & Vehicle Photography', canonical: 'car-photography' },
  { id: 'reels-shoots', label: 'Reels & Creative Video Shoots', canonical: 'reels-shoots' },
  { id: 'model-photography', label: 'Model & Fashion Photography', canonical: 'model-photography' },
]

export function normalizeCategoryKey(raw) {
  const s = String(raw || '').toLowerCase().trim()
  if (!s) return 'weddings'
  if (['car-shoot', 'car-photography', 'cars', 'cars-shoot', 'car'].includes(s)) return 'car-photography'
  if (['model-shoot', 'model-photography', 'models', 'fashion', 'model'].includes(s)) return 'model-photography'
  if (['product-shoot', 'product-photography', 'products', 'product'].includes(s)) return 'product-photography'
  if (['reels-shoot', 'reels-shoots', 'reels', 'creative-video', 'reel', 'reels-video'].includes(s)) return 'reels-shoots'
  if (['sports-shoot', 'sports-photography', 'sports', 'sport'].includes(s)) return 'sports-photography'
  if (['birthdays', 'birthday-photography', 'birthday', 'birthdays-shoot'].includes(s)) return 'birthdays'
  if (['engagement', 'pre-wedding', 'engagement-shoot'].includes(s)) return 'engagement'
  if (['anniversary', 'anniversary-shoot'].includes(s)) return 'anniversary'
  if (['baby-family', 'baby-and-family', 'baby-newborn-maternity'].includes(s)) return 'baby-family'
  if (['festivals', 'cultural-celebrations', 'christmas'].includes(s)) return 'festivals'
  if (['mothers-day', "mother's-day", 'mothersday'].includes(s)) return 'mothers-day'
  if (['fathers-day', "father's-day", 'fathersday'].includes(s)) return 'fathers-day'
  if (['corporate-events', 'portraits', 'portrait', 'corporate'].includes(s)) return 'corporate-events'
  if (['family', 'family-shoot'].includes(s)) return 'family'
  if (['maternity', 'maternity-shoot'].includes(s)) return 'maternity'
  if (['graduations', 'graduation', 'graduation-photography'].includes(s)) return 'graduations'
  if (['weddings', 'wedding', 'wedding-photography'].includes(s)) return 'weddings'
  return s
}

export function getCategoryLabel(raw) {
  if (!raw) return 'General Photography'
  const norm = normalizeCategoryKey(raw)
  const found = PHOTOGRAPHY_CATEGORIES.find((c) => c.canonical === norm || c.id === norm)
  return found ? found.label : raw
}

export function isCategoryMatch(itemCategory, filterCategory) {
  if (!filterCategory || filterCategory === 'all') return true
  const normItem = normalizeCategoryKey(itemCategory)
  const normFilter = normalizeCategoryKey(filterCategory)
  return normItem === normFilter
}

