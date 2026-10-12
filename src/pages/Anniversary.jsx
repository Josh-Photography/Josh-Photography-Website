import CategoryTemplate from '../components/common/CategoryTemplate'

export default function Anniversary() {
  return (
    <CategoryTemplate
      categoryId="anniversary"
      badge="Anniversaries & Milestone Jubilees"
      title="Celebrating Years of Love"
      tagline="Whether Your 1st or 50th, Every Anniversary Is A Testament To Enduring Devotion"
      filterCategory="anniversary"
      description={[
        'Love that has stood the test of time deserves to be celebrated with grace and honor. From intimate 1st anniversary romantic sessions to 25th Silver Jubilees and 50th Golden Jubilees, we document the enduring beauty of companionship.',
        'We photograph the warmth of hands held over decades, the fond glances between partners who know each other by heart, and the family tree that flourished from their union.',
        'Our photography honors family legacy and the joyful reunion of children, grandchildren, and lifelong friends in elegant venues, country estates, and family gardens.',
      ]}
      chapters={[
        {
          step: '01',
          title: 'Legacy Couple Portraits',
          desc: 'Gentle, elegant portraits celebrating the couple’s graceful journey, mutual devotion, and lasting chemistry.',
        },
        {
          step: '02',
          title: 'Intimate Dinners & Vow Renewals',
          desc: 'Candlelit dining, private garden lunches, and the meaningful exchange or renewal of wedding vows.',
        },
        {
          step: '03',
          title: 'Multigenerational Family Tree',
          desc: 'Heirloom portraits uniting elders, children, and grandchildren together in one timeless frame.',
        },
        {
          step: '04',
          title: 'Speeches, Laughter & Toasts',
          desc: 'Heartfelt toasts, nostalgic photo album reviews, and spontaneous laughter with lifelong friends.',
        },
      ]}
      features={[
        'Specialized coverage for Silver (25th), Ruby (40th), and Golden (50th) anniversary celebrations',
        'Patient, respectful direction tailored for senior family members and little grandchildren alike',
        'Large-format heirloom portraiture suitable for custom framed prints and archival canvases',
        'Handcrafted anniversary photo album design honoring the couple’s life journey',
      ]}
      quote={{
        text: 'Our children organized a surprise 30th anniversary lunch and booked Josh to photograph it. The family portraits now hold pride of place in our home.',
        author: 'David & Margaret — Anniversary Couple',
      }}
      quoteImage="/images/Anniversary-img-2.jpg"
    />
  )
}
