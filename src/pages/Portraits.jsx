import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Portraits() {
  return (
    <CategoryTemplate
      categoryId="portraits"
      badge="Editorial & Studio Portraits"
      title="Your Story, One Frame at a Time"
      tagline="Refined, Impactful Portraiture for Artists, Founders, and Visionaries"
      filterCategory="portrait"
      description={[
        'A portrait is never merely a likeness; it is a revelation. Our portrait sessions are crafted to draw out your authentic aura, confidence, and quiet strength.',
        'Using sculptural studio lighting, textured cinematic backdrops, and mindful direction, we create portraits that command attention — whether on Forbes, an album cover, a luxury personal brand, or a framed centerpiece in your gallery.',
        'We tailor every setup to your purpose, guiding your posture, expressions, and angles so you feel completely in your element.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Creative Consultation',
          desc: 'We map out your personal branding goals, aesthetic preferences, and the exact mood your portrait should convey.',
        },
        {
          step: '02',
          title: 'Lighting Architecture',
          desc: 'Bespoke lighting design — from Rembrandt chiaroscuro to soft, glowing beauty light.',
        },
        {
          step: '03',
          title: 'Guided Direction',
          desc: 'Fluid, empowering coaching that eliminates stiffness and unlocks your effortless presence.',
        },
        {
          step: '04',
          title: 'High-End Retouching',
          desc: 'Natural frequency separation and color grading that preserves skin texture while delivering a flawless, magazine-ready finish.',
        },
      ]}
      features={[
        'Executive headshots, creative artist portraits, and fashion editorial lookbooks',
        'In-studio or environmental executive on-location setups',
        'Live monitor tethering for real-time review and immediate selection',
        'Commercial usage licensing included for business profiles, press, and publications',
      ]}
      quote={{
        text: 'The best portrait I have ever had taken. They captured both my authority and warmth effortlessly.',
        author: 'Arun V. — Founder & Architect',
      }}
      quoteImage="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80"
    />
  )
}
