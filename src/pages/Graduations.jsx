import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Graduations() {
  return (
    <CategoryTemplate
      categoryId="graduations"
      badge="12 — ACADEMIC MILESTONE"
      title="Honoring Academic Milestones & Success"
      tagline="Triumphant Caps, Honors & Campus Legacy"
      filterCategory="graduations"
      description={[
        'Graduation marks the culmination of tireless dedication, late-night study sessions, and personal triumph. It is a moment of profound pride not just for the graduate, but for the parents, family members, and mentors who supported every step of the journey.',
        'We capture the ceremony excitement, ceremonial caps and hoods, diploma presentations, and natural joy as classmates toss their caps and embrace their loved ones.',
        'Our graduation sessions combine formal heirloom portraits with relaxed, editorial candids on academic grounds, ensuring you have timeless photographs to commemorate this monumental chapter.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'The Graduate Solo Portrait',
          desc: 'Dignified, editorial individual portraits with ceremonial robes, hood, diploma scroll, and classic regalia.',
        },
        {
          step: '02',
          title: 'Family Pride & Embraces',
          desc: 'Tears of pride from parents, proud hugs from grandparents, and joyful groupings commemorating the family achievement.',
        },
        {
          step: '03',
          title: 'Classmates & The Cap Toss',
          desc: 'High-energy celebration shots with university friends, confetti bursts, and the iconic celebratory cap toss.',
        },
        {
          step: '04',
          title: 'Campus Walk & Historic Backdrops',
          desc: 'Golden hour portraits strolling through historic archways, library colonnades, and iconic campus landmarks.',
        },
      ]}
      features={[
        'Full coverage for university commencements, private campus sessions, and graduation dinners',
        'Expert guidance on flattering gown posing, cap positioning, and lighting',
        'Expedited digital delivery for celebration invitations, announcements, and social sharing',
        'Handcrafted framed prints and heirloom folio boxes for family gifting',
      ]}
      quote={{
        text: 'The photographs Josh captured of our daughter’s graduation are exquisite. He documented the formal pride of the ceremony and the pure laughter of our family celebration afterwards.',
        author: 'The Harrison Family — Graduation Celebration',
      }}
      quoteImage="/images/Graduation-Photography-img-4.jpg"
    />
  )
}
