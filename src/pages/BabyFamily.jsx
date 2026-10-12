import CategoryTemplate from '../components/common/CategoryTemplate'

export default function BabyFamily() {
  return (
    <CategoryTemplate
      categoryId="baby-family"
      badge="Baby & Family Photography"
      title="Tiny Moments, Timeless Love"
      tagline="From First Breaths To Multigenerational Legacies"
      filterCategory="baby-family"
      description={[
        'Few seasons in life move as quickly as the early years of parenthood. Tiny eyelashes, sleepy yawns, unsteady first steps, and big toothless grins vanish before you know it.',
        'Our baby and family sessions are designed to be calm, patient, and completely baby-led. We never rush. We let feeding breaks, lullabies, and cuddles happen naturally.',
        'Whether in the natural light of your family home, tranquil botanical gardens, or scenic outdoor parks, we craft soft, emotional portraits that preserve the purity of your family’s journey.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Newborn Slumber & Tiny Details',
          desc: 'Gentle, natural posing during the first weeks, celebrating tiny toes, whisper-soft wraps, and tranquil sleep.',
        },
        {
          step: '02',
          title: 'Parent Bonding & Skin-to-Skin',
          desc: 'Tender forehead kisses, warm cuddles, and unposed connection between parents and their new baby.',
        },
        {
          step: '03',
          title: 'Sitting Milestones & First Year Cake Smash',
          desc: 'Playful 6-month sitting giggles and joyous first birthday cake smash sessions brimming with curiosity.',
        },
        {
          step: '04',
          title: 'Lifestyle Outdoor Family Portraits',
          desc: 'Natural family strolls through blooming gardens and scenic landscapes with grandparents, parents, and children.',
        },
      ]}
      features={[
        'Certified safe newborn posing with unhurried pacing for feedings and soothing',
        'In-home lifestyle sessions and outdoor sessions in natural parks & gardens',
        'Neutral organic wraps, heirloom blankets, and timeless styling guidance provided',
        'Multi-generational family groupings welcoming grandparents and siblings',
      ]}
      quote={{
        text: 'From our newborn session to our son’s first birthday, Joshy handled everything with such immense patience and warmth. The photos are pure magic.',
        author: 'Sophie & Mark — Family Clients',
      }}
      quoteImage="/images/baby-family-img-3.jpg"
    />
  )
}
