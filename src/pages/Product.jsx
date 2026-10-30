import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Product() {
  return (
    <CategoryTemplate
      categoryId="product-photography"
      badge="14 — COMMERCIAL CRAFTSMANSHIP"
      title="Meticulous Optics That Elevate Premium Brands"
      tagline="Pristine Reflections, Studio Precision & Commercial Impact"
      heroPosition="center 45%"
      quoteImagePosition="center center"
      filterCategory="product-photography"
      description={[
        'In a digital marketplace driven by visual impact, exceptional product photography transforms casual browsers into loyal customers.',
        'We craft studio e-commerce imagery, macro texture details, and bespoke lifestyle scenes using color-calibrated lighting, precision focus stacking, and pristine reflections.',
        'Every angle is engineered to showcase materials, luxury finishes, and brand prestige across Shopify, Amazon, and global marketing campaigns.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Hero Packaging & Bottles',
          desc: 'Directional studio lighting highlighting delicate embossed foil, glass contours, and product geometry.',
        },
        {
          step: '02',
          title: 'Styled In-Context Lifestyle',
          desc: 'Organic surfaces and curated backdrops that immerse the product in aspirational real-world settings.',
        },
        {
          step: '03',
          title: 'Macro Material Details',
          desc: 'Hyper-focused macro lenses revealing micro-droplets, leather grains, and tactile craftsmanship.',
        },
        {
          step: '04',
          title: 'Clean E-Commerce Cutouts',
          desc: 'Flawless pure white backgrounds and transparent clipping paths ready for instant digital deployment.',
        },
      ]}
      features={[
        'Full commercial advertising usage rights and print-ready high-resolution files',
        'Custom color matching and focus stacking for razor-sharp edge-to-edge clarity',
        'Transparent PNG clipping paths and high-volume e-commerce catalog turnaround',
        'Creative prop sourcing, bespoke backdrops, and brand identity styling',
      ]}
      quote={{
        text: 'The imagery Josh delivered increased our e-commerce conversion rate noticeably. The clarity of glass reflections and label embossing is world-class.',
        author: 'Julian Thorne — Luxury Botanical Founder',
      }}
      quoteImage="/images/product_shoot_1.jpg"
    />
  )
}
