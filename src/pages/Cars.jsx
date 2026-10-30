import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Cars() {
  return (
    <CategoryTemplate
      categoryId="car-photography"
      badge="15 — AUTOMOTIVE SCULPTURE & SPEED"
      title="Sculpted Reflections & Pure Automotive Passion"
      tagline="Rolling Shutter Rigs, Aerodynamic Contours & Cockpit Art"
      heroPosition="center 60%"
      quoteImagePosition="center center"
      filterCategory="car-photography"
      description={[
        'Automotive photography demands mastery over curvature, metallic reflections, and dynamic velocity on the open road.',
        'We shoot bespoke location editorials on winding countryside passes, private airstrips, and urban architectural backdrops across the United Kingdom.',
        'Using polarized optics, light painting, and rolling shutter rigs, we accentuate every aerodynamic contour, polished alloy, and handcrafted cockpit stitch with editorial reverence.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Rolling Motion Tracking',
          desc: 'Fluid shutter blur capturing dynamic wheels at speed while bodywork remains razor-sharp against the scenery.',
        },
        {
          step: '02',
          title: 'Aggressive Stance & 3/4 Profile',
          desc: 'Low-angle compositions accentuating sculptured splitters, wide fenders, and commanding stance.',
        },
        {
          step: '03',
          title: 'Cockpit & Leather Craft',
          desc: 'Ambient lighting highlighting diamond-quilted seats, milled metal toggles, and illuminated consoles.',
        },
        {
          step: '04',
          title: 'Night Light Painting',
          desc: 'Continuous handheld LED light sweeps carving golden metallic highlights across sleek dark panels.',
        },
      ]}
      features={[
        'Private circuit, runway, and scenic countryside editorial location scouting',
        'Specialized polarized optical filters eliminating harsh glare and reflections',
        'High-resolution master files suitable for large-format garage wall art prints',
        'Concours d’Elegance, auction showcase, and private collector portfolio packages',
      ]}
      quote={{
        text: 'Josh photographed my vintage Aston Martin restoration. The rolling shots at sunset look like they belong on the cover of an international motoring journal.',
        author: 'Sir Edward Kensington — Private Collector',
      }}
      quoteImage="/images/car_shoot_2.jpg"
    />
  )
}
