import CategoryTemplate from '../components/common/CategoryTemplate'

export default function FathersDay() {
  return (
    <CategoryTemplate
      categoryId="fathers-day"
      badge="Father's Day Sessions"
      title="Honoring the Pillars of Our Lives"
      tagline="The Quiet Strength, Deep Warmth, and Enduring Guidance of Fathers"
      filterCategory="events"
      description={[
        'A father’s love is often expressed in quiet acts of protection, selfless sacrifices, and gentle encouragement from the sidelines. Too often, his love remains uncelebrated in front of the lens.',
        'Our Father’s Day sessions celebrate this profound bond: the firm handshake, the warm shoulder to lean on, the boisterous belly laughs, and the silent pride reflected in a father’s eyes when looking at his children.',
        'We craft powerful, dignified portraits that honor dad’s personality — timeless imagery that his children and grandchildren will hold dear forever.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'The Patriarch Portrait',
          desc: 'A strong, dignified solo portrait reflecting dad’s character, career legacy, and gentle wisdom.',
        },
        {
          step: '02',
          title: 'Father-Child Camraderie',
          desc: 'Relaxed, authentic candids sharing hobbies, conversation, humor, and natural moments of affection.',
        },
        {
          step: '03',
          title: 'Grandfather & Grandchildren',
          desc: 'Pure warmth as granddad spoils the little ones with stories, smiles, and playful games.',
        },
        {
          step: '04',
          title: 'The Complete Family Legacy',
          desc: 'A classic, museum-worthy family portrait uniting the generations he worked tirelessly to build.',
        },
      ]}
      features={[
        'Relaxed, no-stress sessions tailored to make fathers feel completely comfortable and natural',
        'In-studio executive setups or lifestyle outdoor sunset environments',
        'Luxury wooden desk frames and custom metal prints ready for his office study',
        'Elegant digital gift cards available for instant presentation',
      ]}
      quote={{
        text: 'Dad usually hates having his picture taken, but the team put him so thoroughly at ease. The photo of him laughing with my son is priceless.',
        author: 'David & Family — Father’s Day Session',
      }}
      quoteImage="/images/fatherday-img-3.jpg"
    />
  )
}
