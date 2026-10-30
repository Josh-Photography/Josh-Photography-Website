import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Reels() {
  return (
    <CategoryTemplate
      categoryId="reels-shoots"
      badge="16 — 9:16 VERTICAL CINEMA & TRENDS"
      title="High-Impact Vertical Stories That Captivate & Go Viral"
      tagline="Cinematic Match-Cuts, Trending Audio & 4K Social Motion"
      heroPosition="center 20%"
      quoteImagePosition="center 18%"
      filterCategory="reels-shoots"
      description={[
        'In today’s fast-paced digital world, short-form vertical video is the ultimate medium of connection and engagement.',
        'We produce cinematic 9:16 reels for high-end weddings, VIP milestone celebrations, creative personal branding, and product launches.',
        'With 4K stabilized gimbals, licensed trending soundtracks, and same-day delivery options, our reels stop thumbs from scrolling and leave lasting impressions.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Wedding & Event Teaser Reels',
          desc: 'Emotional audio soundbites blended with slow-motion confetti showers and tender glances in 9:16.',
        },
        {
          step: '02',
          title: 'High-Energy Entrances & Dance Floors',
          desc: 'Dynamic gimbal tracking, rhythmic strobe bursts, and beat-matched cuts capturing pure celebration electricity.',
        },
        {
          step: '03',
          title: 'Creative Transitions & Speed Ramps',
          desc: 'Smooth match-cuts and speed ramping delivering magazine-worthy editorial elegance in 15 exhilarating seconds.',
        },
        {
          step: '04',
          title: 'Behind-The-Scenes Craft',
          desc: 'Unfiltered, captivating glimpses into the craft, backstage preparation, and candid artistry of VIP events.',
        },
      ]}
      features={[
        'Native 4K 9:16 vertical video captured on cinema sensor bodies and motorized gimbals',
        'Express 24–48 hour delivery for rapid social announcements and viral sharing',
        'Full sound design, beat-matched edits, and commercial audio licensing included',
        'Optimized for Instagram Reels, TikTok, YouTube Shorts, and brand campaigns',
      ]}
      quote={{
        text: 'The teaser reel Josh created for our wedding received over 120,000 views on Instagram in 48 hours. The music syncing and camera motion were pure magic.',
        author: 'Chloe & Dominic — Manor Wedding',
      }}
      quoteImage="/images/reel_shoot_1.jpg"
    />
  )
}
