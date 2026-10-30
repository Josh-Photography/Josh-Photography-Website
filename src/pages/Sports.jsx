import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Sports() {
  return (
    <CategoryTemplate
      categoryId="sports-photography"
      badge="13 — ATHLETIC ACTION & POWER"
      title="High-Speed Action & Unstoppable Athletic Spirit"
      tagline="Precision Motion, Arena Drama & Athletic Grit"
      heroPosition="center 18%"
      quoteImagePosition="center 20%"
      filterCategory="sports-photography"
      description={[
        'From stadium floodlights and trackside sprints to competitive media days and intense training sessions, our sports photography captures peak performance with split-second precision.',
        'Using high-speed optical tracking, crisp strobe lighting, and dramatic low angles, we document explosive energy, authentic grit, and the unforgettable joy of victory.',
        'Whether for individual athletes, clubs, academies, or commercial sports campaigns, every photograph celebrates human strength, discipline, and competitive heart.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Decisive Peak Action',
          desc: 'High-burst shutter speeds freezing mid-air leaps, rapid direction changes, and ball strikes.',
        },
        {
          step: '02',
          title: 'Strobed Athlete Portraits',
          desc: 'High-contrast rim lighting and intense gaze defining the dedication and discipline of the competitor.',
        },
        {
          step: '03',
          title: 'Team Camaraderie & Victory',
          desc: 'Sideline anticipation, emotional huddles, and the ecstatic roar when the championship is won.',
        },
        {
          step: '04',
          title: 'Commercial Brand Direction',
          desc: 'Clean, punchy visuals engineered for sports apparel lines, fitness sponsors, and promotional campaigns.',
        },
      ]}
      features={[
        'Full coverage for athletic competitions, club fixtures, and private training sessions',
        'High-speed optical tracking and multi-burst continuous shooting',
        'Express digital delivery of action shots for news, social media, and sponsors',
        'Fine-art metallic prints and personalized athlete showcase portfolios',
      ]}
      quote={{
        text: 'Josh captured our tournament with unreal energy and sharpness. You can feel the adrenaline and heart in every single frame.',
        author: 'Marcus Davies — Athletic Director',
      }}
      quoteImage="/images/sports_shoot_2.jpg"
    />
  )
}
