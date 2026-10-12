// ============================================================
// PACKAGES DATA
// Do NOT invent actual prices — use "Request Pricing"
// ============================================================

export const packages = [
  {
    id: 'essential',
    name: 'Essential',
    subtitle: 'For intimate celebrations',
    description: 'Perfect for smaller events and personal milestones. Clean, beautiful coverage that captures your most important moments.',
    features: [
      'Up to 4 hours of coverage',
      '1 photographer',
      '200+ edited photographs',
      'Online private gallery',
      'High-resolution digital files',
      'Fine-art color grading',
    ],
    price: 'Starting From £495',
    popular: false,
    cta: 'Request Pricing',
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'For complete event coverage',
    description: 'Comprehensive photography for weddings, birthdays, and celebrations. Our most popular choice for couples and families.',
    features: [
      'Up to 8 hours of coverage',
      '2 photographers',
      '500+ edited photographs',
      'Online private gallery',
      'High-resolution digital files',
      'Professional retouching',
      'Pre-event consultation',
      'Highlight slideshow',
      'Premium photo album (30 pages)',
    ],
    price: 'Starting From £1,150',
    popular: true,
    cta: 'Get Custom Quote',
  },
  {
    id: 'signature',
    name: 'Signature',
    subtitle: 'For a complete cinematic experience',
    description: 'Our most comprehensive package combining stunning photography with cinematic films. The ultimate storytelling experience.',
    features: [
      'Full day coverage (12+ hours)',
      '2 photographers + 1 videographer',
      '800+ edited photographs',
      'Cinematic highlight film (5-8 min)',
      'Full ceremony film',
      'Drone aerial coverage',
      'Online private gallery',
      'High-resolution digital files',
      'Advanced retouching',
      'Pre-event consultation & recce',
      'Same-day edit preview',
      'Signature photo album (50 pages)',
      'Parent albums (2)',
      'USB box delivery',
    ],
    price: 'Request Pricing',
    popular: false,
    cta: 'Request Pricing',
  },
]

export const packageAddons = [
  { name: 'Additional Hour', description: 'Extended coverage beyond package hours' },
  { name: 'Extra Photographer', description: 'Additional photographer for wider coverage' },
  { name: 'Drone Coverage', description: 'Aerial photography & videography' },
  { name: 'Same-Day Edit', description: 'Highlights video ready by end of event' },
  { name: 'Photo Album Upgrade', description: 'Premium handcrafted album with more pages' },
  { name: 'Canvas Prints', description: 'Gallery-quality canvas prints of your favourite shots' },
  { name: 'Destination Travel', description: 'Coverage for outstation events (travel extra)' },
]
