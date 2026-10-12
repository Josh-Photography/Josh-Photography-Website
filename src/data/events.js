// ============================================================
// EVENT CATEGORIES DATA — JOSH PHOTOGRAPHY (UK)
// ============================================================

export const eventCategories = [
  {
    id: 'weddings',
    title: 'Weddings',
    tagline: 'Where Forever Begins',
    description:
      'From historic British church weddings and cathedral aisles to countryside manor celebrations and romantic estate grounds, we chronicle every unrepeatable chapter of your wedding day with timeless elegance.',
    heroImage: '/images/hero-church-wedding.jpg',
    path: '/weddings',
    subcategories: [
      'British Church Weddings',
      'Countryside Manor Venues',
      'Vow & Ring Exchange',
      'Aisle Processional & Recessional',
      'Christian Ceremonies & Church Celebrations',
      'Romantic Couple Portraits',
      'Estate Grounds & Golden Hour',
      'Family Heirlooms & Candids',
    ],
  },
  {
    id: 'birthday',
    title: 'Birthday Celebrations',
    tagline: 'Every Birthday Deserves Its Own Story',
    description:
      'We capture the complete birthday experience across curated celebration venues — from children’s joyful cake-cutting and balloon wonderlands to distinguished adult milestone jubilees.',
    heroImage: '/images/birthday_01.png',
    path: '/birthday-photography',
    subcategories: [
      'Children’s Birthday Parties',
      'Cake-Cutting & Candle Blowing',
      'First Birthday & Cake Smash',
      'Private Garden & Hall Parties',
      'Adult Milestone Jubilees (30th, 50th, 60th, 80th)',
      'Party Styling & Dessert Tables',
      'Family Celebrations & Candids',
      'Unscripted Laughter & Entertainment',
    ],
  },
  {
    id: 'engagement',
    title: 'Engagement & Proposals',
    tagline: 'The Sacred Promise',
    description:
      'Surprise proposals in scenic parklands, historic estates, intimate ring ceremonies, and celebratory parties surrounded by close family and friends.',
    heroImage: '/images/engagement-img-1.jpg',
    path: '/engagement',
    subcategories: [
      'Scenic Park Surprise Proposals',
      'Engagement Ring Macro Artistry',
      'Romantic Sunset Couple Sessions',
      'Family Engagement Banquets',
      'Ring Ceremonies & Blessings',
      'Candid Celebration Moments',
    ],
  },
  {
    id: 'baby-family',
    title: 'Baby & Family',
    tagline: 'Tiny Moments, Timeless Love',
    description:
      'Gentle newborn photography, milestone cake smashes, and natural lifestyle family portraits in blooming gardens, scenic parklands, and the cozy comfort of your home.',
    heroImage: '/images/family-photography-img-5.jpg',
    path: '/baby-family',
    subcategories: [
      'Newborn Baby Portraits',
      'Parents & Baby Bonding',
      '6-Month Sitter Milestones',
      'First Birthday Cake Smash',
      'Lifestyle Portraits in Scenic Parks',
      'Multi-Generational Family Trees',
      'In-Home Lifestyle Moments',
    ],
  },
  {
    id: 'anniversary',
    title: 'Anniversaries & Milestones',
    tagline: 'Celebrating Years of Love',
    description:
      'Whether honoring your 1st year together or a milestone Silver (25th) or Golden (50th) anniversary, we celebrate enduring love with dignified portraits and warm family banquets.',
    heroImage: '/images/Anniversary-img-2.jpg',
    path: '/anniversary',
    subcategories: [
      'Milestone Jubilees (25th, 40th, 50th)',
      'Legacy Couple Portraits',
      'Intimate Anniversary Dinners',
      'Family Gathering Celebrations',
      'Vow Renewals',
      'Heirloom Albums & Candids',
    ],
  },
  {
    id: 'festivals',
    title: 'Festivals & Seasonal Celebrations',
    tagline: 'Christmas Holiday Magic & Halloween Autumn Wonders',
    description:
      'Authentic seasonal festival photography — from the glowing lights of winter Christmas markets and decorated trees to atmospheric autumn pumpkin patches and Halloween festivals.',
    heroImage: '/images/christmas-festival.jpg',
    path: '/festivals',
    subcategories: [
      'Christmas Market Stalls & Winter Evenings',
      'Decorated Christmas Trees & Fairy Lights',
      'Holiday Hearth & Cozy Fireplace Moments',
      'Christmas Eve & Holiday Dinner Table Styling',
      'Autumn Pumpkin Patch Adventures',
      'Carved Jack-o’-Lanterns & Twilight Lighting',
      'Creative Children Halloween Costumes',
      'Seasonal Community Harvest Celebrations',
    ],
  },
  {
    id: 'mothers-day',
    title: "Mother's Day Sessions",
    tagline: 'Celebrating the Heart of Every Home',
    description:
      'Heartfelt Mother’s Day portraits honoring mothers, grandmothers, and children with warm natural light, soft interactions, and timeless emotional storytelling.',
    heroImage: '/images/mothersday-img-2.jpg',
    path: '/mothers-day',
    subcategories: [
      'Mothers with Newborns',
      'Mother & Child Connection',
      'Generations of Mothers',
      'Spring Garden Mini-Sessions',
      'Handmade Gifts & Flowers',
      'Emotional Candids',
    ],
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Love Stories',
    tagline: 'Your Love Story, Beautifully Told',
    description:
      'Cinematic couple sessions across picturesque historic estates, rolling country gardens, and elegant architectural settings.',
    heroImage: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80',
    path: '/pre-wedding',
    subcategories: [
      'Architectural & Cityscape Couples',
      'Rolling Countryside Sessions',
      'Golden Hour Sunset Walks',
      'Cinematic Concept Shoots',
      'Historic Architecture Portraits',
    ],
  },
  {
    id: 'fathers-day',
    title: "Father's Day Sessions",
    tagline: 'Honoring the Pillars of Our Lives',
    description:
      'Capturing the understated warmth, laughter, and lifelong guidance between fathers, grandfathers, and their children.',
    heroImage: '/images/fatherday-img-3.jpg',
    path: '/fathers-day',
    subcategories: [
      'Father & Child Camaraderie',
      'Grandfather & Grandchildren',
      'Dignified Portraits',
      'Family Legacy Moments',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate & Summits',
    tagline: 'High-Impact Event Coverage',
    description:
      'Polished event photography for conferences, brand summits, panel discussions, and executive gatherings across premier venues and gala ballrooms.',
    heroImage: '/images/corporate-img-1.jpg',
    path: '/corporate-events',
    subcategories: [
      'Conferences & Executive Summits',
      'Keynote Speakers',
      'Networking & Galas',
      'Executive Leadership Headshots',
    ],
  },
]

export const getCategoryById = (id) => eventCategories.find((c) => c.id === id)
export const getCategoryByPath = (path) => eventCategories.find((c) => c.path === path)
