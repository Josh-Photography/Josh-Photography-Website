import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Engagement() {
  return (
    <CategoryTemplate
      categoryId="engagement"
      badge="Engagements & Proposals"
      title="The Sacred Promise"
      tagline="Romantic Surprise Proposals & Intimate Couple Portraits"
      filterCategory="engagement"
      description={[
        'An engagement is the romantic beginning of a lifelong journey. Whether you are orchestrating a surprise proposal in scenic natural surroundings or hosting an intimate ring celebration with close family and friends, we preserve every emotional milestone.',
        'We capture the nervous anticipation beforehand, the exact instant of the question, the sheer joy in their eyes, and the sparkling details of the engagement ring.',
        'Our unobtrusive documentary style guarantees genuine reactions, followed by thirty minutes of guided golden-hour portraits to mark the moment you said yes.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Surprise Proposal Coverage',
          desc: 'Discreet planning, hidden vantage point, and capturing the authentic emotional reaction as you ask the question.',
        },
        {
          step: '02',
          title: 'The Ring Artistry',
          desc: 'Fine-art macro photography showcasing the sparkle and craftsmanship of the engagement ring on hands.',
        },
        {
          step: '03',
          title: 'Golden Hour Couple Portraits',
          desc: 'Relaxed romantic portraits immediately following the proposal in scenic parks or timeless architectural settings.',
        },
        {
          step: '04',
          title: 'Family & Friends Celebration',
          desc: 'Surprise champagne toasts, celebratory hugs, and joyful engagement party banquets with loved ones.',
        },
      ]}
      features={[
        'Comprehensive proposal location scouting, lighting assessment, and timing coordination',
        'High-resolution macro photography of engagement rings and personal details',
        'Fast turnaround preview (within 24–48 hours) for social and family announcements',
        'Seamless integration with full wedding photography commissions',
      ]}
      quote={{
        text: 'Joshy helped coordinate the secret vantage point with absolute discretion. The photos of Sophie’s tearful reaction and our sunset walk are beyond anything we could have dreamed of.',
        author: 'Sophie & Oliver — Engaged Couple',
      }}
      quoteImage="/images/engagement-img-3.jpg"
    />
  )
}
