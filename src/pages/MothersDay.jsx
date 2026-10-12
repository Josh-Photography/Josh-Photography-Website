import CategoryTemplate from '../components/common/CategoryTemplate'

export default function MothersDay() {
  return (
    <CategoryTemplate
      categoryId="mothers-day"
      badge="Mother's Day Sessions"
      title="Celebrating the Heart of Every Home"
      tagline="A Tribute to the Unconditional Love, Warmth, and Quiet Strength of Mothers"
      filterCategory="mothers-day"
      description={[
        'Mothers are constantly the ones behind the camera, ensuring everyone else’s memories are documented while rarely appearing in the photographs themselves.',
        'Our dedicated Mother’s Day sessions are designed to put mothers center stage: pampering them with a relaxed atmosphere, beautiful natural light, and genuine, unposed connection with their children.',
        'Whether your children are toddlers running across a sunlit garden, newborns resting on your chest, or grown adults returning home, these portraits will become treasured family heirlooms.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Mothers with Newborns & Babies',
          desc: 'Gentle, whisper-soft morning light capturing quiet cuddles, feeding moments, and tranquil maternal reverie.',
        },
        {
          step: '02',
          title: 'Spring Flowers & Handcrafted Gifts',
          desc: 'Children proudly presenting spring bouquets or handmade cards with genuine smiles and sparkling eyes.',
        },
        {
          step: '03',
          title: 'Three Generations of Mothers',
          desc: 'A poignant, joyful tribute uniting grandmothers, mothers, and daughters in one timeless heirloom portrait.',
        },
        {
          step: '04',
          title: 'Emotional Candids & Playful Laughter',
          desc: 'Warm forehead kisses, shared giggles on the lawn, and unscripted embraces in natural outdoor and in-home settings.',
        },
      ]}
      features={[
        'Exclusive limited-edition Mother’s Day spring outdoor & in-home mini-sessions',
        'Relaxed, unhurried pacing designed to make mothers feel cherished and at ease',
        'Luxury gold-foil gift voucher presentation boxes available for easy gifting',
        'Handcrafted fine-art desk prints and archival canvas enlargements available',
      ]}
      quote={{
        text: 'This was the greatest gift my family ever gave me. Seeing the portrait of three generations of our family laughing together brings tears of gratitude every single time.',
        author: 'Claire & Family — Mother’s Day Session',
      }}
      quoteImage="/images/mothersday-img-3.jpg"
    />
  )
}
