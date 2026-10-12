// ============================================================
// SITE CONFIGURATION — JOSHY PHOTOGRAPHY (UNITED KINGDOM)
// ============================================================

export const siteConfig = {
  studioName: 'Joshy Photography',
  tagline: 'Timeless Artistry & Unforgettable Celebrations',
  shortDescription: 'Luxury Wedding & Celebration Photography',
  fullDescription:
    'We preserve the laughter before the cake is cut, the silence before the vows, the tears of a parent, the excitement of a child, and the little moments nobody planned.',
  phone: '+44 7700 900123',
  whatsapp: '+447700900123',
  email: 'hello@joshyphotography.co.uk',
  address: 'By appointment (Studio opening soon)',
  operatingRegion: 'Available for commissions & destination events across the United Kingdom',
  mapUrl: '#',
  foundedYear: 2018,
  photographerName: 'Joshy',
  social: {
    instagram: 'https://instagram.com/joshyphotography.uk',
    facebook: 'https://facebook.com/joshyphotography.uk',
    youtube: 'https://youtube.com/@joshyphotography',
    pinterest: 'https://pinterest.com/joshyphotography',
  },
  seo: {
    defaultTitle: 'Joshy Photography | Luxury Wedding & Celebration Photography',
    titleTemplate: '%s | Joshy Photography',
    defaultDescription:
      'Premium wedding, celebration, family, and event photography. Warm cream aesthetics, elegant typography, and authentic storytelling.',
    siteUrl: 'https://joshyphotography.co.uk',
    ogImage: '/images/hero-church-wedding.jpg',
  },
}

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Photography',
    path: '/portfolio',
    children: [
      { label: 'Wedding Photography', path: '/weddings' },
      { label: 'Birthday Celebrations', path: '/birthday-photography' },
      { label: 'Engagement Photography', path: '/engagement' },
      { label: 'Anniversary Photography', path: '/anniversary' },
      { label: 'Baby & Newborn Photography', path: '/baby-family' },
      { label: 'Festival & Cultural Celebrations', path: '/festivals' },
      { label: "Mother's Day Photography", path: '/mothers-day' },
      { label: "Father's Day Photography", path: '/fathers-day' },
      { label: 'Corporate Event Photography', path: '/corporate-events' },
      { label: 'Family Photography', path: '/family' },
      { label: 'Maternity Photography', path: '/maternity' },
      { label: 'Graduation Photography', path: '/graduations' },
    ],
  },
  { label: 'Client Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
]
