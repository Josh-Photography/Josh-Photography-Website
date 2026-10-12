import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Maternity() {
  return (
    <CategoryTemplate
      categoryId="maternity"
      badge="11 — The Miracle of Life"
      title="Maternity Photography"
      tagline="Elegance, Expecting Wonder & Motherhood"
      description={[
        'Maternity is one of the most fleeting and breathtaking milestones in a woman’s journey. Carrying new life brings a quiet glow, deep anticipation, and boundless love.',
        'Our maternity sessions celebrate this transformative chapter with editorial sophistication. We blend fine-art studio lighting with sweeping outdoor landscapes to capture the beauty of your pregnancy.',
        'Partners and older siblings are warmly encouraged to join, turning your session into an intimate family celebration of the new little life soon to arrive.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Styling & Wardrobe Selection',
          desc: 'Complimentary access to our curated collection of luxury silken maternity gowns and elegant draping fabrics.',
        },
        {
          step: '02',
          title: 'Golden Hour Outdoor Lighting',
          desc: 'Serene sunset light glowing through delicate lace and tall grasses in scenic countryside meadowlands.',
        },
        {
          step: '03',
          title: 'Intimate Couples Connection',
          desc: 'Gentle, tender moments between expecting parents holding the bump together with whispered promises.',
        },
        {
          step: '04',
          title: 'Fine-Art Studio Chiaroscuro',
          desc: 'Dramatic, sculptural black-and-white studio portraits accentuating the graceful curvature of pregnancy.',
        },
      ]}
      features={[
        'Best photographed between weeks 28 and 34 for optimum comfort and shape',
        'Private studio or golden-hour countryside meadow location options',
        'Full hair, makeup artist coordination, and wardrobe styling available upon request',
        'Seamless maternity-to-newborn collective packages available',
      ]}
      quote={{
        text: 'I was hesitant about how I would look at 32 weeks, but Joshy made me feel like an editorial goddess. The photos are pure art.',
        author: 'Charlotte & James — Maternity Commission',
      }}
      quoteImage="/images/Maternity-Photography-img-3.jpg"
    />
  )
}
