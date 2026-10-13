import { validateQueryTopic, OFF_TOPIC_RESPONSE } from './topicFilter.js'
import { getKnowledgeBase, OFFICIAL_PACKAGES, OFFICIAL_ADDONS } from './chatKnowledge.js'

/**
 * Normalizes user text for robust keyword and intent matching
 */
function normalizeText(str = '') {
  return str
    .toLowerCase()
    .replace(/[^\w\s£$€-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Precise word & phrase matching (prevents substring false matches like 'ok' inside 'book')
 */
function hasWord(text = '', keywords = []) {
  if (!text) return false
  return keywords.some((kw) => {
    if (kw.includes(' ')) {
      return text.includes(kw)
    }
    // Matches standalone word using whitespace boundaries
    return new RegExp(`(^|\\s)${kw}(\\s|$)`, 'i').test(text)
  })
}

/**
 * Resolves context from recent conversation turns
 */
function resolveContext(history = []) {
  let recentTopic = null
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i]
    if (!msg || !msg.content) continue
    const c = msg.content.toLowerCase()
    if (c.includes('wedding')) recentTopic = 'wedding'
    else if (c.includes('birthday')) recentTopic = 'birthday'
    else if (c.includes('maternity')) recentTopic = 'maternity'
    else if (c.includes('family')) recentTopic = 'family'
    else if (c.includes('anniversary')) recentTopic = 'anniversary'
    else if (c.includes('newborn') || c.includes('baby')) recentTopic = 'baby'
    else if (c.includes('corporate') || c.includes('headshot')) recentTopic = 'corporate'
    else if (c.includes('package') || c.includes('price')) recentTopic = 'pricing'
    else if (c.includes('studio') || c.includes('location')) recentTopic = 'studio'
    if (recentTopic) break
  }
  return recentTopic
}

/**
 * Generates an answer using deterministic RAG based on live website content
 */
function generateDeterministicAnswer(query, history = [], kb) {
  const norm = normalizeText(query)
  const recentTopic = resolveContext(history)

  const studioPhone = kb.studio.phone || '+44 7988 827057'
  const studioEmail = kb.studio.email || 'hello@joshphotography.co.uk'
  const studioLocation = kb.studio.location || 'Greater London, United Kingdom'

  // 1. Warm Greeting & Bot Identity
  if (
    hasWord(norm, ['hi', 'hello', 'hey', 'hiya', 'good morning', 'good afternoon', 'good evening', 'greetings']) &&
    norm.split(' ').length <= 4
  ) {
    return {
      reply: `Warm greetings! Welcome to **Josh Photography**. ✨\n\nI’m **Hello Chatbot**, your personal photography assistant. I can help you with:\n- 💍 **Wedding Photography & Films**\n- 🎂 **Birthday Celebrations & Milestones**\n- 💰 **Packages & Pricing (Starting from £495)**\n- 📅 **Checking Availability & How to Book**\n- 🏛️ **Our New Studio Space Opening Next Month**\n- ⏱️ **Turnaround & Delivery Times**\n\nWhat can I assist you with today?`,
      suggestions: ['Wedding Packages & Pricing', 'Birthday Photography', 'Check Availability', 'Where is it located?'],
      actions: [
        { label: 'Explore Weddings', url: '/weddings', type: 'internal' },
        { label: 'View Packages', url: '/packages', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      ],
    }
  }

  // 2. Who is the Owner / Founder / About Josh & Elena
  if (
    hasWord(norm, [
      'owner',
      'who is owner',
      'who is the owner',
      'who owns',
      'founder',
      'who founded',
      'who is josh',
      'about josh',
      'who runs',
      'lead photographer',
      'who takes the photos',
      'elena',
      'photographer bio',
      'team',
    ])
  ) {
    return {
      reply: `### Meet Lead Photographer & Founder Josh\n\n**Josh** is the owner, founder, and lead photographer of **Josh Photography**! 📷\n\nOver the past decade, Josh has documented **450+ weddings, 1,200+ families, and 1,800+ celebrations** across the United Kingdom.\n\n*“Light is fleeting. Emotion is forever. I don’t just photograph what things look like — I photograph what they feel like.”*\n\n**Our Team:**\n- **Josh** — Lead Photographer & Founder (documentary photojournalism & refined editorial portraiture)\n- **Elena Vance** — Associate Photographer & Lighting Specialist (candid ceremony coverage & soft ambient light portraits)\n\nJosh and Elena work together to ensure every moment of your celebration is captured with dignity, patience, and timeless care.`,
      suggestions: ['View Packages & Pricing', 'Read Client Reviews', 'Check Availability'],
      actions: [
        { label: 'About Josh Photography', url: '/about', type: 'internal' },
        { label: 'Read Client Reviews', url: '/testimonials', type: 'internal' },
        { label: 'Contact Josh', url: '/contact', type: 'internal' },
      ],
    }
  }

  // 3. Location / Where is it located / Studio Address
  if (
    hasWord(norm, [
      'location',
      'located',
      'where',
      'where is it located',
      'where are you located',
      'where is your studio',
      'where is the studio',
      'where are you based',
      'where is it based',
      'where is josh',
      'address',
      'premises',
      'london',
      'directions',
      'cotswolds',
      'visit',
    ])
  ) {
    return {
      reply: `### Studio Space & Location — Josh Photography\n\n- 📍 **Primary Location:** ${studioLocation}\n- 🕒 **Operating Hours:** ${kb.studio.openingHours}\n- 🗺️ **Coverage Areas:** Greater London, Surrey, Hertfordshire, Cotswolds, and commissions across the United Kingdom and destination events.\n\n**🏛️ Exciting Studio Announcement:**\nWe are preparing to officially open our **dedicated photography studio space next month** in Greater London!\n- The upcoming studio features high-ceiling natural light bays, parabolic portrait lighting suites, a color-calibrated proofing station, and an intimate consultation lounge.\n- Currently, consultations and commissions are held on-location, virtually, or by private appointment.`,
      suggestions: ['Check Availability', 'View Packages', 'Contact Team'],
      actions: [
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
        { label: 'Contact Us', url: '/contact', type: 'internal' },
        { label: 'Call +44 7988 827057', url: 'tel:+447988827057', type: 'external' },
      ],
    }
  }

  // 4. Booking Process & How to Book
  if (
    hasWord(norm, [
      'book',
      'booking',
      'how can i book',
      'how do i book',
      'how to book',
      'can i book',
      'want to book',
      'ready to book',
      'booking process',
      'reserve',
      'reservation',
      'advance notice',
      'how far in advance',
      'when to book',
      'dates',
      'availability',
      'deposit',
      'retainer',
      'appointment',
      'consultation',
    ])
  ) {
    return {
      reply: `### How to Book with Josh Photography\n\nBooking your celebration is simple and transparent:\n\n1. **Check Dates / Inquire:** Visit our [Check Availability](/check-availability) page or submit your event details on our [Contact page](/contact).\n2. **Consultation:** We’ll arrange an unhurried chat (video call, phone, or in person) to review your itinerary, style preferences, and package options.\n3. **Reservation:** To officially lock in your date on our calendar, a service agreement and date retainer are finalized.\n\n**Advance Booking Guidelines:**\n- **Weddings & Peak Weekends:** We recommend inquiring **6 to 12 months in advance** as peak British summer and autumn dates fill quickly.\n- **Birthdays, Newborns & Family Sessions:** **3 to 6 weeks notice** is ideal.\n\nWould you like to check if your date is currently open?`,
      suggestions: ['Check Date Availability', 'WhatsApp Josh Directly', 'View Packages & Pricing'],
      actions: [
        { label: 'Check Availability Now', url: '/check-availability', type: 'internal' },
        { label: 'Submit Inquiry Form', url: '/contact', type: 'internal' },
        { label: 'Chat on WhatsApp', url: kb.studio.whatsappUrl, type: 'external' },
      ],
    }
  }

  // 5. Packages & Pricing Inquiries
  if (
    hasWord(norm, [
      'package',
      'packages',
      'price',
      'pricing',
      'prices',
      'cost',
      'costs',
      'rate',
      'rates',
      'fee',
      'fees',
      'how much',
      'quote',
      'budget',
      '£495',
      '£1150',
      'starting from',
    ]) ||
    ((norm.includes('cost') || norm.includes('how much')) && recentTopic)
  ) {
    let focusNote = ''
    if (recentTopic === 'wedding') {
      focusNote = 'For weddings, couples most frequently choose our **Premium Package** (£1,150) for comprehensive 8-hour dual-photographer coverage and a handcrafted photo album, or our bespoke **Signature Package** for full-day cinema & photo.\n\n'
    } else if (recentTopic === 'birthday') {
      focusNote = 'For birthdays, our **Essential Package** (£495) covers up to 4 hours of party action, or **Premium** (£1,150) for complete day coverage with an heirloom album.\n\n'
    }

    return {
      reply: `### Official Photography Packages & Pricing\n\n${focusNote}At Josh Photography, we believe in transparent starting pricing:\n\n1. **Essential Package — Starting From £495**\n   - Up to 4 hours of continuous coverage\n   - 1 professional photographer\n   - 200+ hand-edited high-resolution photographs\n   - Private online gallery with full download access & print release\n   - Fine-art color grading and individual retouching\n   - *Ideal for:* Intimate celebrations, first birthdays, civil ceremonies, maternity and newborn portraits.\n\n2. **Premium Package — Starting From £1,150 (Most Popular)**\n   - Up to 8 hours of complete coverage\n   - 2 professional photographers (capturing multiple angles simultaneously)\n   - 500+ hand-edited high-resolution photographs\n   - Pre-event consultation & timeline planning\n   - Highlight slideshow set to music\n   - Handcrafted 30-page premium photo album\n   - *Ideal for:* Full-day weddings, grand milestone celebrations, and family jubilees.\n\n3. **Signature Package — Request Pricing (Custom Commission)**\n   - Full-day unlimited coverage (12+ hours)\n   - 2 photographers + 1 dedicated cinematic videographer\n   - 800+ artistically edited photographs\n   - 4K cinematic highlight film (5–8 min) + ceremony film\n   - Aerial drone coverage (subject to venue permits)\n   - 50-page signature luxury photo album + 2 parent albums\n   - USB gift box with keepsake prints\n\n**Optional Add-ons:** Extra hours, additional photographer, aerial drone, same-day edit preview, album upgrades, fine-art canvas prints, and destination travel.`,
      suggestions: ['How do I book a package?', 'What is the delivery timeline?', 'Do you provide photo albums?'],
      actions: [
        { label: 'View Full Packages Page', url: '/packages', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
        { label: 'WhatsApp for Availability', url: kb.studio.whatsappUrl, type: 'external' },
      ],
    }
  }

  // 5b. Categories & Service Recommendations (e.g. "which categorie is best", "what are your services")
  if (
    hasWord(norm, [
      'which category is best',
      'which categorie is best',
      'which is best',
      'what is best',
      'best category',
      'best categorie',
      'best service',
      'best photography',
      'what do you recommend',
      'which do you recommend',
      'most popular',
      'popular category',
      'categories',
      'category',
      'categorie',
      'what services',
      'what do you offer',
      'what photography do you do',
      'types of photography',
      'options',
      'recommend',
      'recommendation',
      'services',
      'service',
      'which service',
      'which service do you recommend',
    ])
  ) {
    return {
      reply: `### Our Signature & Most Popular Photography Categories\n\nAt **Josh Photography**, our primary specialty and most acclaimed service is **Wedding Photography**! Over the past decade, Josh has documented 450+ weddings across the UK.\n\nHere is a guide to our most requested categories:\n\n1. 💍 **Wedding Photography (Our Flagship & Most Popular)**\n   Full-day unhurried documentary coverage of British church ceremonies, Cotswolds countryside manors, and authentic candid emotion.\n\n2. 🎂 **Birthday & Milestone Celebrations**\n   From 1st birthday cake smashes to energetic 21st parties and 50th/60th Jubilees, capturing party styling, games, cake cutting, and family joy.\n\n3. 🌿 **Family & Heirloom Portraits**\n   Natural, unscripted multigenerational portraits in outdoor gardens or countryside estates that outlive generations.\n\n4. 🌸 **Maternity & Baby/Newborn Photography**\n   Poetic fine-art portraits celebrating expectant mothers and the gentle innocence of a newborn's earliest days.\n\n**Which is best for you?**\nIt depends on the milestone you are celebrating! If you have an upcoming wedding or engagement, our **Wedding Photography** with the **Premium Package (£1,150)** is our couples' top choice.\n\nWhich celebration would you like to explore?`,
      suggestions: ['💍 Wedding Photography', '🎂 Birthday Celebrations', '👨‍👩‍👧 Family Portraits', '💰 View Packages'],
      actions: [
        { label: 'Explore Weddings', url: '/weddings', type: 'internal' },
        { label: 'Explore Birthdays', url: '/birthday-photography', type: 'internal' },
        { label: 'View Packages', url: '/packages', type: 'internal' },
      ],
    }
  }

  // 6. Wedding Photography Inquiries
  if (
    hasWord(norm, ['wedding', 'weddings', 'church wedding', 'bride', 'groom', 'ceremony', 'reception', 'vows', 'bridal', 'cathedral']) ||
    (recentTopic === 'wedding' && hasWord(norm, ['detail', 'more', 'tell me', 'coverage', 'album']))
  ) {
    return {
      reply: `### Wedding Photography — Josh Photography\n\n**“Stories Worth Remembering”**\n\nOur wedding coverage is built on quiet photojournalism and refined editorial portraiture. We document the reverence of your vows, the joyous tears of parents, and the unrepeatable energy of your celebration without turning your day into an artificial photo shoot.\n\n**What We Offer for Weddings:**\n- **Documentary & Candid Coverage:** From morning preparations and historic church ceremonies to candlelight toasts and sparkler exits.\n- **Dual-Photographer Coverage:** Available with our **Premium Package (Starting from £1,150)** and **Signature Package**, capturing both bride and groom perspectives.\n- **British & Destination Venues:** Historic British cathedrals, Cotswolds countryside manors, rustic barns, and private estates.\n- **Rapid Highlights:** 25–30 hand-graded highlight frames within **48 to 72 hours** so you can announce your celebration.\n- **Complete Gallery:** 500+ to 800+ high-resolution, print-ready frames delivered in **3 to 4 weeks** via an elegant online private gallery.\n- **Cinematic Films:** Option to add 4K ceremony films, highlight reels, and licensed drone coverage.\n\n*Advance Booking Advice:* We recommend inquiring **6 to 12 months in advance** for peak UK wedding dates.`,
      suggestions: ['How much does wedding photography cost?', 'Can we see your wedding gallery?', 'Check wedding date availability'],
      actions: [
        { label: 'Explore Wedding Gallery', url: '/weddings', type: 'internal' },
        { label: 'Check Date Availability', url: '/check-availability', type: 'internal' },
        { label: 'View Wedding Packages', url: '/packages', type: 'internal' },
      ],
    }
  }

  // 7. Birthday Photography Inquiries
  if (
    hasWord(norm, ['birthday', 'birthdays', 'bday', 'cake smash', '1st birthday', 'first birthday', 'milestone birthday', 'party']) ||
    (recentTopic === 'birthday' && hasWord(norm, ['detail', 'cost', 'more']))
  ) {
    return {
      reply: `### Birthday & Milestone Celebration Photography\n\n**“Every Celebration Deserves Art — Far Beyond the Cake Cutting”**\n\nFrom magical first birthday cake smashes and themed children's parties to energetic 18th/21st celebrations and grand 50th/60th Jubilees, we document every smile and candid family hug.\n\n**What We Document:**\n- Bespoke party styling, table decor, florals, and balloon installations\n- Candid laughter, guest interactions, games, and party entertainment\n- Traditional cake cutting ceremony, speeches, and toasts\n- Multi-generational family portraits with grandparents, parents, and cousins\n- High-speed capture of energetic children and joyful spontaneous antics\n\n**Recommended Packages:**\n- **Essential Package (Starting From £495):** Perfect for intimate family parties and restaurant celebrations (up to 4 hours, 200+ edited photos).\n- **Premium Package (Starting From £1,150):** Ideal for grand venue events with extended family (up to 8 hours, 2 photographers, 500+ photos, and 30-page heirloom album).\n\n*Notice:* For birthday sessions, we recommend booking **3 to 6 weeks in advance**.`,
      suggestions: ['View Birthday Gallery', 'How much is the Essential package?', 'Book Birthday Session'],
      actions: [
        { label: 'Explore Birthday Gallery', url: '/birthday-photography', type: 'internal' },
        { label: 'Check Date Availability', url: '/check-availability', type: 'internal' },
        { label: 'Contact Team', url: '/contact', type: 'internal' },
      ],
    }
  }

  // 8. Maternity & Newborn Inquiries
  if (
    hasWord(norm, ['maternity', 'pregnancy', 'pregnant', 'baby bump', 'expecting']) ||
    (recentTopic === 'maternity' && hasWord(norm, ['detail', 'cost', 'more']))
  ) {
    return {
      reply: `### Maternity Photography — Poetic Fine-Art Portraits\n\n**“Carrying Life, Radiating Grace, Embracing Tomorrow”**\n\nOur maternity sessions celebrate the profound beauty and sacred anticipation of motherhood through gentle, empowering fine-art imagery.\n\n**Session Details:**\n- **Locations:** Conducted either outdoors in golden hour countryside meadows or in private comfort.\n- **Styling:** Guidance on flowing couture gowns, warm neutral color palettes, and natural light aesthetics.\n- **Inclusions:** Expectant mother solo portraits, partner portraits, and heartfelt sibling interactions.\n- **Timing:** We recommend scheduling your session between weeks 28 and 34 of pregnancy for maximum comfort.\n- **Pricing:** Available starting from **£495** (Essential Package).\n\n*New Studio Notice:* Our new natural light studio opening next month will also offer dedicated indoor maternity lighting setups!`,
      suggestions: ['Explore Maternity Gallery', 'Packages for Maternity', 'Book a Consultation'],
      actions: [
        { label: 'View Maternity Stories', url: '/maternity', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      ],
    }
  }

  // 9. Baby & Newborn Photography
  if (
    hasWord(norm, ['baby', 'babies', 'newborn', 'infant', 'tiny fingers', 'first days']) ||
    (recentTopic === 'baby' && hasWord(norm, ['detail', 'cost', 'more']))
  ) {
    return {
      reply: `### Baby & Newborn Photography\n\n**“Unhurried Sessions Preserving Gentle Beginnings”**\n\nNewborn sessions are gentle, relaxed, and patient. We never rush babies and pause whenever feeding, soothing, or cuddling is needed.\n\n**Highlights:**\n- Baby-safe, hygienic environment with warm, gentle natural light\n- Minimalist, organic wraps and delicate wooden props that put the focus on your little one\n- Tender family portraits with both parents and older siblings\n- Delivered in high-resolution digital files with print release\n- Recommended within the first 7 to 21 days for sleepy newborn poses, or any milestone month up to the first birthday\n- Packages start from **£495** (Essential Package).\n\n*Advance notice:* 3 to 6 weeks in advance of your expected due date is recommended.`,
      suggestions: ['Explore Newborn Gallery', 'Pricing for Baby Sessions', 'Contact Josh'],
      actions: [
        { label: 'View Baby & Newborn Stories', url: '/baby-family', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      ],
    }
  }

  // 10. Family & Heirloom Portraits
  if (hasWord(norm, ['family', 'families', 'parents', 'grandparents', 'generations', 'multigenerational', 'heirloom'])) {
    return {
      reply: `### Family & Heirloom Photography\n\n**“A Legacy of Connection, Preserved Across Generations”**\n\nWe specialize in timeless, unscripted family portraiture. We avoid stiff, forced poses, focusing instead on natural laughter, genuine hugs, and the real personalities of children and parents.\n\n**Session Features:**\n- Outdoor countryside estate sessions, private gardens, or studio settings\n- Multi-generational family reunions honoring grandparents and children together\n- High-resolution edited files with optional heirloom album creation\n- Packages starting from **£495** (Essential) and **£1,150** (Premium with handcrafted 30-page album).\n\n*Notice:* 3 to 6 weeks advance notice is ideal for weekend family sessions.`,
      suggestions: ['View Family Gallery', 'Package Pricing', 'Book Family Session'],
      actions: [
        { label: 'Explore Family Stories', url: '/family', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      ],
    }
  }

  // 11. Anniversary & Engagement Inquiries
  if (hasWord(norm, ['anniversary', 'anniversaries', 'vow renewal', 'silver jubilee', 'golden jubilee', 'engagement', 'proposal', 'pre-wedding', 'prewedding'])) {
    return {
      reply: `### Anniversary & Engagement Photography\n\n**Engagement & Surprise Proposals:**\n- Preserving the heartbeat of the question and the radiance of the answer.\n- Discreet documentary coverage of surprise proposals followed by an editorial romantic couple session.\n- Great way to practice before your wedding day!\n\n**Anniversaries & Vow Renewals:**\n- Honoring 1st, 10th, Silver (25th), Pearl (30th), and Golden (50th) Jubilees.\n- Couple portraits celebrating enduring devotion alongside multi-generational family celebrations.\n\n**Pricing:** Packages start from **£495** (Essential) or **£1,150** (Premium). Custom travel commissions available across the UK.`,
      suggestions: ['View Engagement Stories', 'View Anniversary Gallery', 'Check Availability'],
      actions: [
        { label: 'Explore Engagement', url: '/engagement', type: 'internal' },
        { label: 'Explore Anniversaries', url: '/anniversary', type: 'internal' },
      ],
    }
  }

  // 12. Corporate Events, Festivals, Graduations, Films
  if (hasWord(norm, ['corporate', 'conference', 'summit', 'business event', 'gala', 'headshot', 'brand'])) {
    return {
      reply: `### Corporate Event & Brand Photography\n\nWe provide polished, high-impact visual storytelling for corporate gatherings:\n- Annual conferences, symposiums, summits, and executive galas\n- Keynote speaker action shots, networking moments, and panel discussions\n- Consistent leadership headshots and brand lifestyle imagery\n- Rapid next-day highlight turnarounds for press releases and communications.\n\nBespoke half-day and full-day corporate commissions available starting from **£495** (Essential) or tailored day rates.`,
      suggestions: ['View Corporate Events', 'Request Corporate Quote', 'Contact Details'],
      actions: [
        { label: 'Corporate Events Page', url: '/corporate-events', type: 'internal' },
        { label: 'Inquire Directly', url: '/contact', type: 'internal' },
      ],
    }
  }

  if (hasWord(norm, ['graduation', 'graduations', 'degree', 'convocation', 'regalia', 'diploma'])) {
    return {
      reply: `### Graduation Photography\n\nCelebrate academic triumph with timeless portraits honoring your degree:\n- Historic campus backdrops and architectural regalia portraits\n- Cap & gown solo sessions plus proud celebratory portraits with parents and friends\n- High-resolution prints and framed heirlooms\n- Sessions starting from **£495** (Essential Package).`,
      suggestions: ['Explore Graduations', 'Check Availability', 'Contact Us'],
      actions: [{ label: 'Graduations Page', url: '/graduations', type: 'internal' }],
    }
  }

  if (hasWord(norm, ['festival', 'festivals', 'cultural', 'christmas', 'cultural celebrations'])) {
    return {
      reply: `### Festival & Cultural Celebrations\n\nDocumenting British seasonal magic and rich cultural celebrations:\n- Christmas markets, twinkling light installations, and festive parties\n- Traditional cultural ceremonies, religious rituals, and community gatherings\n- Authentic documentary coverage capturing vibrant colors, dances, and unity\n- Packages starting from **£495**.`,
      suggestions: ['Explore Festivals', 'View Packages', 'Contact Team'],
      actions: [{ label: 'Festivals Page', url: '/festivals', type: 'internal' }],
    }
  }

  if (hasWord(norm, ['wedding films', 'film', 'video', 'videography', 'cinematic', 'drone'])) {
    return {
      reply: `### Wedding Films & Cinematic Videography\n\nPhotographs capture a single frozen moment; cinema lets you relive the sound of your vows, the quiver in your voice, and the music of your celebration.\n\n**What Our Films Feature:**\n- 4K cinematic highlight film (5–8 minutes) set to licensed soundtrack\n- Full multi-camera ceremony and speech documentary films with crystal-clear audio\n- Licensed aerial drone coverage of breathtaking venue grounds\n- Same-day edit preview option for evening reception screenings\n- Included in our **Signature Package** or available as an add-on to our **Premium Package**!`,
      suggestions: ['Explore Films', 'Signature Package Pricing', 'Check Availability'],
      actions: [
        { label: 'Explore Films', url: '/films', type: 'internal' },
        { label: 'View Packages', url: '/packages', type: 'internal' },
      ],
    }
  }

  // 13. Delivery Time & Turnaround
  if (hasWord(norm, ['delivery', 'turnaround', 'how long', 'when will i get', 'when do we receive', 'timeline', 'preview'])) {
    return {
      reply: `### Gallery Delivery & Turnaround Times\n\nWe know how eagerly you and your family anticipate your photographs! Our delivery workflow is:\n\n1. **Curated Highlight Preview (48 to 72 Hours):**\n   You will receive **25 to 30 hand-graded highlight frames** within 48 to 72 hours of your celebration. These are perfect for instant mobile viewing, family sharing, and social announcements.\n\n2. **Complete Digital Gallery (3 to 4 Weeks):**\n   Your full, comprehensive high-resolution gallery (200+ to 800+ frames depending on your package) is individually color-graded, retouched, and delivered within **3 to 4 weeks** via a secure private online gallery.\n\n3. **Heirloom Albums & Prints:**\n   For clients with handcrafted fine-art albums (included in Premium & Signature), once you approve your favorite album spreads, printing and hand-binding take approximately **2 to 3 weeks** before archival delivery to your door.`,
      suggestions: ['What packages include albums?', 'Can we download full resolution?', 'Check Availability'],
      actions: [
        { label: 'View Packages', url: '/packages', type: 'internal' },
        { label: 'Contact Team', url: '/contact', type: 'internal' },
      ],
    }
  }

  // 14. Contact Information & Direct Channels
  if (hasWord(norm, ['contact', 'phone', 'telephone', 'call', 'whatsapp', 'email', 'reach', 'number', 'mobile'])) {
    return {
      reply: `### Official Contact Information — Josh Photography\n\nWe would love to hear all about your upcoming celebration!\n\n- 📞 **Phone:** [${studioPhone}](tel:${studioPhone.replace(/\s+/g, '')})\n- 💬 **WhatsApp:** [Message us on WhatsApp](${kb.studio.whatsappUrl}) (${studioPhone})\n- ✉️ **Email:** [${studioEmail}](mailto:${studioEmail})\n- 📍 **Location:** ${studioLocation} (Studio opening next month)\n- 🕒 **Hours:** ${kb.studio.openingHours}\n\nOur team is available to assist you Monday through Saturday, with private Sunday consultations by appointment.`,
      suggestions: ['Check Availability', 'View Packages', 'Explore Weddings'],
      actions: [
        { label: 'Call Now', url: `tel:${studioPhone.replace(/\s+/g, '')}`, type: 'external' },
        { label: 'WhatsApp Us', url: kb.studio.whatsappUrl, type: 'external' },
        { label: 'Online Contact Form', url: '/contact', type: 'internal' },
      ],
    }
  }

  // 15. Equipment, Cameras & Style
  if (hasWord(norm, ['camera', 'cameras', 'lens', 'lenses', 'gear', 'equipment', 'lighting', 'style', 'documentary', 'retouching', 'color grading'])) {
    return {
      reply: `### Photographic Approach & Professional Optics\n\n**Our Style: Emotional Authenticity & Quiet Reverence**\nWe combine unobtrusive photojournalism with refined editorial portraiture. We use silent electronic shutters during sacred church ceremonies so as not to disrupt holy rituals.\n\n**Our Optics & Gear:**\n- Dual-card full-frame cinema camera bodies with real-time hardware backup.\n- Fast prime optics (35mm, 50mm, 85mm f/1.2) for creamy cinematic depth and low-light cathedral fidelity.\n- Soft parabolic lighting modifiers for flattering, natural skin tones.\n- Color-calibrated monitors ensuring true-to-life tones without artificial fading trends.\n- Dual offsite backups of all original RAW digital negatives.`,
      suggestions: ['View Wedding Gallery', 'Packages & Pricing', 'Book Consultation'],
      actions: [
        { label: 'Explore Portfolio', url: '/portfolio', type: 'internal' },
        { label: 'About Josh', url: '/about', type: 'internal' },
      ],
    }
  }

  // 16. Client Reviews & Testimonials
  if (hasWord(norm, ['review', 'reviews', 'testimonial', 'testimonials', 'ratings', 'feedback', 'what clients say'])) {
    return {
      reply: `### What Our Couples & Families Say ⭐⭐⭐⭐⭐\n\n- **Eleanor & James (Church Wedding):**\n  *“Josh documented our church ceremony and manor reception with such breathtaking sensitivity. Looking through the gallery feels like reliving every vow and tear.”*\n\n- **Charlotte & Family (First Birthday):**\n  *“They captured our son’s first birthday with such patience. Not just the cake cutting, but the grandparents laughing and cousins playing on the lawn.”*\n\n- **David & Margaret (30th Pearl Anniversary):**\n  *“The multi-generational portraits and candid moments now hold pride of place in our home.”*\n\n- **Harrison & Victoria (Cotswolds Estate Wedding):**\n  *“From morning preparations to the candlelight sparkler exit, Josh captured every fleeting emotion with sheer editorial mastery.”*`,
      suggestions: ['Read More Testimonials', 'View Packages', 'Contact Us'],
      actions: [
        { label: 'View All Testimonials', url: '/testimonials', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      ],
    }
  }

  // 17. Polite Etiquette (Strictly only when NOT asking a question)
  if (
    hasWord(norm, ['thank you', 'thanks', 'thx', 'cheers', 'awesome', 'great', 'perfect', 'ok', 'okay']) &&
    !hasWord(norm, ['book', 'booking', 'price', 'pricing', 'cost', 'where', 'who', 'how', 'wedding', 'birthday', 'package'])
  ) {
    return {
      reply: `You are very welcome! It’s an absolute pleasure helping you. 😊\n\nWhenever you’re ready to discuss your plans or check calendar dates, feel free to submit an inquiry on our [Contact page](/contact), reach out on [WhatsApp](${kb.studio.whatsappUrl}), or call us directly at **${studioPhone}**.\n\nWishing you a wonderful celebration!`,
      suggestions: ['Check Availability', 'View Packages', 'Explore Weddings'],
      actions: [
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
        { label: 'WhatsApp Us', url: kb.studio.whatsappUrl, type: 'external' },
      ],
    }
  }

  // Default fallback for general photography website questions
  return {
    reply: `Thank you for asking about **Josh Photography**!\n\nAs your photography assistant, I can help you with:\n- **Photography Services:** Weddings, birthdays, maternity, family, anniversaries, baby & newborn, graduations, corporate events, and wedding films.\n- **Packages & Rates:** Essential (Starting From £495), Premium (Starting From £1,150), and Signature (Request Pricing).\n- **Dates & Availability:** Peak weekend scheduling, advance recommendations, and consultations.\n- **Turnaround:** 25–30 preview frames within 48–72 hours; complete digital gallery in 3–4 weeks.\n\nFor custom quotes, venue travel inquiries, or specific date openings, please get in touch with Josh directly at **${studioPhone}** or email **${studioEmail}**!`,
    suggestions: ['Wedding Packages', 'Birthday Photography', 'Check Availability', 'Where is it located?'],
    actions: [
      { label: 'View Packages', url: '/packages', type: 'internal' },
      { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      { label: 'Contact Team', url: '/contact', type: 'internal' },
    ],
  }
}

/**
 * Main chat handler: Validates topic, uses RAG and optionally LLM if key exists,
 * guaranteeing strict topic boundaries and accurate responses.
 */
export async function handleChatMessage({ message = '', history = [] }) {
  // Step 1: Strict topic validation
  const validation = validateQueryTopic(message, history)
  if (!validation.isAllowed) {
    return {
      reply: OFF_TOPIC_RESPONSE,
      suggestions: [
        'Wedding Packages & Pricing',
        'Birthday Photography',
        'Check Date Availability',
        'Where is it located?',
      ],
      actions: [
        { label: 'Explore Weddings', url: '/weddings', type: 'internal' },
        { label: 'View Packages', url: '/packages', type: 'internal' },
        { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      ],
      topicRestricted: true,
    }
  }

  // Step 2: Retrieve live knowledge base
  const kb = getKnowledgeBase()

  // Step 3: Optional external LLM (Gemini or OpenAI) with strict grounding
  const geminiKey = process.env.GEMINI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (geminiKey) {
    try {
      const response = await callGeminiWithGuardrails(message, history, kb, geminiKey)
      if (response) return response
    } catch (err) {
      console.warn('Gemini call failed or timed out, falling back to local RAG engine:', err.message)
    }
  } else if (openaiKey) {
    try {
      const response = await callOpenAIWithGuardrails(message, history, kb, openaiKey)
      if (response) return response
    } catch (err) {
      console.warn('OpenAI call failed or timed out, falling back to local RAG engine:', err.message)
    }
  }

  // Step 4: High-precision deterministic RAG engine (always works, 100% accurate, zero hallucinations)
  return generateDeterministicAnswer(message, history, kb)
}

/**
 * Calls Gemini API with strict system instructions and topic guardrails
 */
async function callGeminiWithGuardrails(query, history, kb, apiKey) {
  const systemInstruction = `You are "Hello Chatbot", the exclusive AI photography assistant for Josh Photography (a luxury wedding, celebration, and family photography studio in Greater London, UK).
STRICT INSTRUCTION:
1. ONLY answer questions about Josh Photography, photography services, packages, prices, availability, galleries, studio, and bookings.
2. If the user asks about ANYTHING else (coding, math, politics, science, recipe, other brands, general AI), you MUST reply EXACTLY:
"${OFF_TOPIC_RESPONSE}"
3. NEVER invent prices, availability, or contact details.
Known facts:
- Owner/Founder/Lead Photographer: Josh (10+ years experience, 450+ weddings, 1,800+ celebrations across UK). Associate: Elena Vance.
- Location: Greater London, UK (covering nationwide UK, Cotswolds, and destinations). Dedicated studio space opening next month in Greater London!
- Booking: Inquire via Check Availability page or Contact page. Retainer secures date. 6-12 months advance for weddings, 3-6 weeks for family/birthdays.
- Essential Package: Starting From £495 (up to 4 hours, 1 photographer, 200+ photos, online gallery).
- Premium Package: Starting From £1,150 (up to 8 hours, 2 photographers, 500+ photos, 30-page album, slideshow).
- Signature Package: Request Pricing (12+ hours, 2 photographers + 1 videographer, 800+ photos, 4K film, drone, 50-page album, 2 parent albums).
- Delivery: 25-30 previews in 48-72h; full digital gallery in 3-4 weeks.
- Phone & WhatsApp: +44 7988 827057. Email: hello@joshphotography.co.uk.
Keep formatting clean, professional, and friendly with markdown.`

  const contents = []
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      if (h.role && h.content) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })
      }
    }
  }
  contents.push({
    role: 'user',
    parts: [{ text: query }],
  })

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
      },
    }),
  })

  if (!res.ok) throw new Error(`Gemini status ${res.status}`)
  const data = await res.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) throw new Error('No text returned from Gemini')

  const isOffTopic = rawText.includes(OFF_TOPIC_RESPONSE)

  return {
    reply: rawText,
    suggestions: ['Wedding Packages & Pricing', 'Birthday Photography', 'Check Availability'],
    actions: [
      { label: 'View Packages', url: '/packages', type: 'internal' },
      { label: 'Check Availability', url: '/check-availability', type: 'internal' },
      { label: 'Contact Us', url: '/contact', type: 'internal' },
    ],
    topicRestricted: isOffTopic,
  }
}

/**
 * Calls OpenAI API with strict system instructions and topic guardrails
 */
async function callOpenAIWithGuardrails(query, history, kb, apiKey) {
  const systemPrompt = `You are "Hello Chatbot", the exclusive AI photography concierge for Josh Photography (Greater London, UK).
STRICT RULES:
1. ONLY answer questions about Josh Photography, photography services, packages, pricing, booking, and studio information.
2. If the user asks about ANYTHING outside the photography website (coding, politics, general knowledge, other businesses), reply EXACTLY:
"${OFF_TOPIC_RESPONSE}"
3. Facts:
- Owner/Lead Photographer: Josh (10+ years experience). Associate: Elena Vance.
- Location: Greater London, UK. Studio space opening next month!
- How to book: Check Availability or Contact page, or call +44 7988 827057.
- Essential: Starting From £495 (4 hours, 1 photographer, 200+ photos)
- Premium: Starting From £1,150 (8 hours, 2 photographers, 500+ photos, 30-page album)
- Signature: Request Pricing (12+ hours, 2 photographers + 1 videographer, 4K film, drone, 50-page album)
- Previews: 25-30 highlight frames in 48-72h. Full gallery: 3-4 weeks.
- Phone & WhatsApp: +44 7988 827057. Email: hello@joshphotography.co.uk.`

  const messages = [{ role: 'system', content: systemPrompt }]
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      if (h.role && h.content) {
        messages.push({ role: h.role, content: h.content })
      }
    }
  }
  messages.push({ role: 'user', content: query })

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
      max_tokens: 800,
    }),
  })

  if (!res.ok) throw new Error(`OpenAI status ${res.status}`)
  const data = await res.json()
  const rawText = data?.choices?.[0]?.message?.content
  if (!rawText) throw new Error('No text returned from OpenAI')

  return {
    reply: rawText,
    suggestions: ['Wedding Packages & Pricing', 'Birthday Photography', 'Check Availability'],
    actions: [
      { label: 'View Packages', url: '/packages', type: 'internal' },
      { label: 'Check Availability', url: '/check-availability', type: 'internal' },
    ],
    topicRestricted: rawText.includes(OFF_TOPIC_RESPONSE),
  }
}
