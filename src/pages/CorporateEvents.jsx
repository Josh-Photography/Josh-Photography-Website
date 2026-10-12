import CategoryTemplate from '../components/common/CategoryTemplate'

export default function CorporateEvents() {
  return (
    <CategoryTemplate
      categoryId="corporate-events"
      badge="Corporate & Commercial"
      title="Professional Imagery for Milestone Moments"
      tagline="High-Impact Event Coverage for Conferences, Global Summits, and Brand Launches"
      filterCategory="events"
      description={[
        'In today’s media-driven world, how your corporate events are photographed defines your brand authority, investor relations, and recruitment prestige.',
        'We deliver sophisticated, magazine-grade event photography that captures keynotes, panel discussions, interactive workshops, award galas, and VIP networking with dynamic composition and polished color fidelity.',
        'Our corporate team operates with complete professional discretion, punctuality, and rapid turnaround — delivering same-day media press selects for immediate PR and social distribution.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Keynote & Stage Presence',
          desc: 'Dynamic, flattering angles of C-suite executives, keynote speakers, and slide presentations.',
        },
        {
          step: '02',
          title: 'Audience Engagement',
          desc: 'Immersive wide and medium perspectives showing engaged delegates, laughter, applause, and interaction.',
        },
        {
          step: '03',
          title: 'Networking & Gala Dinners',
          desc: 'Polished candids during cocktail hours, VIP lounges, breakout conversations, and banquet awards.',
        },
        {
          step: '04',
          title: 'Brand Activation & Décor',
          desc: 'Clean architectural shots of sponsor booths, step-and-repeats, branded stages, and expo lighting.',
        },
      ]}
      features={[
        'Same-day press delivery (15-25 curated images within 3 hours for PR teams)',
        'Full high-resolution commercial usage rights with no royalty restrictions',
        'Multi-photographer crews equipped for simultaneous parallel breakout tracks',
        'Secure password-protected client portal with high-speed download options',
      ]}
      quote={{
        text: 'Professional, punctual, and exceptional quality. Our global conference gallery was ready on time and impressed our international stakeholders.',
        author: 'The Harrison Consultancy — Corporate Conference',
      }}
      quoteImage="/images/corporate-img-2.jpg"
    />
  )
}
