import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Family() {
  return (
    <CategoryTemplate
      categoryId="family"
      badge="10 — Family Legacies"
      title="Family Photography"
      tagline="Natural Lifestyle Portraits & Multigenerational Legacies"
      description={[
        'Family photography is an enduring investment in memory. Children grow up in the blink of an eye, and the seasons when everyone gathers under one roof become rare and precious.',
        'We photograph your family in natural, unhurried environments — sunlit meadow walks, heritage estate gardens, and relaxed moments in your home where genuine laughter flourishes.',
        'From lively toddler candids to heirloom portraits uniting four generations, our sessions celebrate the unique bond and affection that make your family who you are.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Location & Wardrobe Palette',
          desc: 'Personalized styling guidance recommending complementary earthy tones and serene natural parkland backdrops.',
        },
        {
          step: '02',
          title: 'Playful & Unposed Interactions',
          desc: 'Allowing children to play freely, chase bubbles, and laugh naturally without stiff or awkward posing.',
        },
        {
          step: '03',
          title: 'Generational Groupings',
          desc: 'Carefully composed, beautiful portraits uniting grandparents, adult children, and grandchildren.',
        },
        {
          step: '04',
          title: 'Heirloom Fine-Art Prints',
          desc: 'Archival framing and heirloom album design crafted to stand the test of time on your family gallery wall.',
        },
      ]}
      features={[
        'Outdoor lifestyle sessions in scenic countryside parks or private home gardens',
        'Unhurried pacing allowing plenty of rest, snack, and play breaks for little ones',
        'Multigenerational groupings with grandparents, aunts, uncles, and cousins welcome',
        'High-resolution archival digital delivery with full printing rights',
      ]}
      quote={{
        text: 'The portraits Josh took of our four-generation family reunion brought our grandmother to tears of joy. They now hang proudly in our dining room.',
        author: 'The Beaumont Family — Oxfordshire',
      }}
      quoteImage="/images/family-photography-img-2.jpg"
    />
  )
}
