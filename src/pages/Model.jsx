import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Model() {
  return (
    <CategoryTemplate
      categoryId="model-photography"
      badge="17 — HAUTE COUTURE & EDITORIAL EXPRESSION"
      title="High-Fashion Aesthetics & Striking Model Portfolios"
      tagline="Poetic Lighting, Agency Z-Cards & Avant-Garde Direction"
      heroPosition="center 18%"
      quoteImagePosition="center 18%"
      filterCategory="model-photography"
      description={[
        'Whether you are an aspiring talent building your inaugural agency Z-card or an established model updating your international book, we offer high-fashion creative direction, sculptural studio lighting, and location editorial setups.',
        'We collaborate closely with stylists, makeup artists, and creatives to produce compelling images that exude personality, versatility, and timeless allure.',
        'From high-key clean beauty tests to avant-garde haute couture in atmospheric London architectural settings, every frame is crafted to command attention.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Haute Couture Studio Editorial',
          desc: 'Clean geometric lines, striking silhouette posing, and sculptured studio strobes designed for fashion journals.',
        },
        {
          step: '02',
          title: 'Natural Beauty & Clean Headshots',
          desc: 'Minimalist makeup, honest eye contact, and delicate natural lighting showcasing authentic bone structure.',
        },
        {
          step: '03',
          title: 'Urban Architecture & Street Style',
          desc: 'London’s contemporary brutalism and historical façades providing dramatic contextual lookbook settings.',
        },
        {
          step: '04',
          title: 'Movement, Fabric & Fluidity',
          desc: 'High-speed flashes capturing flowing silk gowns, airborne hair, and unscripted motion radiating confidence.',
        },
      ]}
      features={[
        'Complete agency Z-card and comp sheet digital layouts ready for agency submissions',
        'Expert posing guidance and pre-shoot mood-board aesthetic curation',
        'High-end frequency separation beauty retouching preserving real skin texture',
        'Multiple wardrobe changes, styling assistance, and studio or location options',
      ]}
      quote={{
        text: 'Josh understands model posing and lighting like few photographers I’ve worked with. The images signed me with a top London agency within two weeks.',
        author: 'Aria Sterling — Fashion Model',
      }}
      quoteImage="/images/model_shoot_1.jpg"
    />
  )
}
