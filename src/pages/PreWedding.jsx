import CategoryTemplate from '../components/common/CategoryTemplate'

export default function PreWedding() {
  return (
    <CategoryTemplate
      categoryId="pre-wedding"
      badge="Pre-Wedding Stories"
      title="Cinematic Love Stories"
      tagline="Your Love Story, Beautifully Told Across Picturesque Landscapes"
      filterCategory="pre-wedding"
      description={[
        'Before the whirlwind of wedding ceremonies begins, a pre-wedding session is your opportunity to slow down, connect, and celebrate the journey that brought the two of you together.',
        'Whether in historic architectural colonnades, rolling hillside fields, or grand country estates, we craft editorial portraits that reflect your distinct chemistry and quiet intimacy.',
        'We work closely with you on concept planning, styling palettes, and scouting hidden golden hour locations to make your shoot feel effortless, candid, and cinematic.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Moodboard & Styling',
          desc: 'We brainstorm your personal aesthetic, select harmonious wardrobe colors, and establish the emotional tone of the shoot.',
        },
        {
          step: '02',
          title: 'Scenic Location Scouting',
          desc: 'Carefully chosen landscapes — from classic architectural heritage to serene countryside sunset viewpoints.',
        },
        {
          step: '03',
          title: 'Effortless Direction',
          desc: 'No awkward, stiff posing. We guide you into genuine interactions, laughter, and natural movement.',
        },
        {
          step: '04',
          title: 'Cinematic Film Emulation',
          desc: 'Color-graded with warm, filmic tones, preserving the golden light and emotional weight of every frame.',
        },
      ]}
      features={[
        'Full creative moodboard and wardrobe consultation prior to shoot',
        'Multi-location scouting tailored to your preferred scenery and light',
        'Optional 4K cinematic video teaser reel add-on available',
        'Delivery of 100+ high-resolution retouched digital photographs',
        'Custom fine-art pre-wedding guestbook album options for wedding day display',
      ]}
      quote={{
        text: 'Our pre-wedding shoot was an experience in itself. Josh found the most breathtaking vantage points and made us feel so completely natural in front of the lens.',
        author: 'Anjali & Ravi — Couple Portrait',
      }}
      quoteImage="https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80"
    />
  )
}
