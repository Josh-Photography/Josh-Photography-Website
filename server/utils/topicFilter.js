/**
 * Strict Topic Filter for Josh Photography - Hello Chatbot
 *
 * Ensures Hello Chatbot answers questions related to Josh Photography,
 * all 17 photography categories, packages, pricing, booking, availability,
 * promotional offers, client testimonials, studio information, and website services.
 */

export const OFF_TOPIC_RESPONSE =
  "I’m Hello Chatbot, your photography assistant! I can help you with our photography services, packages, bookings, promotions, and other website-related questions. Please feel free to ask about our weddings, celebrations, commercial shoots, or packages!"

// Explicit on-topic patterns confirming photography and Josh Photography relevance
const ON_TOPIC_PATTERNS = [
  // 1. Studio, Brand, Founder, Team & Studios
  /\b(josh|josh\s+photography|elena|studio|photographer|photography|photo\s*shoot|photoshoot)\b/i,
  /\b(stories\s+worth\s+remembering|fused\s+lens|lead\s+photographer|team)\b/i,
  /\b(owner|founder|who\s+is\s+owner|who\s+is\s+the\s+owner|who\s+owns|who\s+runs|who\s+is\s+josh|who\s+are\s+you|who\s+takes\s+the\s+photos)\b/i,
  /\b(de\s+fab|de\s+fab\s+studio|defab|another\s+studio|second\s+studio|other\s+studio)\b/i,
  /\b(northampton|kg\s+house|united\s+kingdom|london|greater\s+london|surrey|cotswolds|hertfordshire|uk)\b/i,
  /\b(opening\s+hours|hours|open|location|located|address|premises|directions)\b/i,

  // 2. All 17 Photography Categories
  // 12 core categories
  /\b(wedding|weddings|weddin|church\s+wedding|bride|groom|ceremony|reception|vow|vows)\b/i,
  /\b(birthday|birthdays|bday|cake\s+smash|jubilee|celebration|celebrations)\b/i,
  /\b(engagement|engagements|proposal|propose|pre-wedding|prewedding|couple|couples)\b/i,
  /\b(anniversary|anniversaries|silver\s+jubilee|golden\s+jubilee|vow\s+renewal)\b/i,
  /\b(baby|babies|newborn|infant|toddler)\b/i,
  /\b(festival|festivals|cultural|christmas|diwali|easter|lanterns|holiday|seasonal)\b/i,
  /\b(mother'?s\s+day|father'?s\s+day)\b/i,
  /\b(corporate|conference|summit|business\s+event|gala|headshot|headshots|brand\s+event)\b/i,
  /\b(family|families|parents|children|kids|grandparents|multi-generational|heirloom)\b/i,
  /\b(maternity|pregnancy|pregnant|expecting|baby\s+bump)\b/i,
  /\b(graduation|graduations|degree|convocation|regalia|diploma)\b/i,
  // 5 additional categories
  /\b(sport|sports|athletic|athlete|tournament|fitness|gym|match|championship)\b/i,
  /\b(product|products|commercial|e-commerce|packshot|packaging|bottle|macro|catalog)\b/i,
  /\b(car|cars|vehicle|vehicles|automotive|supercar|vintage\s+car|motor|aston\s+martin|porsche|ferrari|bmw|audi)\b/i,
  /\b(reel|reels|video|videos|videography|tiktok|short-form|vertical\s+video|9:16|social\s+video|cinematic)\b/i,
  /\b(model|models|modeling|modelling|fashion|couture|lookbook|z-card|comp\s+card|editorial)\b/i,

  // 3. Special Offers, Discounts & Promotions
  /\b(offer|offers|discount|discounts|discounted|deal|deals|promo|promotion|promotions|promotional|campaign|sale|special\s+offer|percent\s+off|%|off)\b/i,
  /\b(christmas\s+discount|birthday\s+discount|wedding\s+discount|festive\s+offer)\b/i,

  // 4. Packages, Pricing & Fees
  /\b(package|packages|price|prices|pricing|cost|costs|rate|rates|fee|fees|quote|quotes|budget)\b/i,
  /\b(essential|premium|signature|addon|add-on|starting\s+from|how\s+much)\b/i,
  /\b(£495|£1,?150|495|1150|gbp|pounds?)\b/i,

  // 5. Booking, Availability & Retainer
  /\b(book|booking|reserve|reservation|availability|available|available\s+dates|schedule|dates?|appointment|consultation|hire)\b/i,
  /\b(how\s+(?:can|do|to)\s+(?:i\s+)?book|can\s+i\s+book|want\s+to\s+book|ready\s+to\s+book)\b/i,
  /\b(inquire|enquire|inquiry|enquiry|deposit|retainer|contract|notice|advance|when\s+to\s+book)\b/i,

  // 6. Gallery, Album, Delivery & Turnaround
  /\b(gallery|galleries|portfolio|photos?|images?|pictures?|shots?|frames?|album|albums)\b/i,
  /\b(delivery|turnaround|how\s+long|when\s+will|preview|highlight\s+frames|high-res|digital\s+files)\b/i,
  /\b(print|prints|canvas|usb|proofs|color\s+grading|retouching|editing|drone|aerial)\b/i,

  // 7. Testimonials, Reviews & Social Proof
  /\b(review|reviews|testimonial|testimonials|feedback|rating|client\s+feedback|what\s+clients\s+say|experience|award|awards|stats|statistics)\b/i,

  // 8. Contact & Communication
  /\b(contact|phone|telephone|call|whatsapp|email|address|reach|message)\b/i,
  /\b(\+?44\s*7988\s*827057|joshyjose282@gmail\.com|hello@joshphotography\.co\.uk)\b/i,

  // 9. General Photography Inquiries
  /\b(service|services|category|categories|options|recommend|recommendation|popular)\b/i,
  /\b(what\s+do\s+you\s+(?:do|offer|shoot|photograph|cover|provide))\b/i,
]

// Purely off-topic domains (coding, politics, math, medicine, non-photography general trivia)
const OFF_TOPIC_PATTERNS = [
  // Coding & Software Development
  /\b(write\s+(?:a\s+)?(?:code|script|function|program|class|algorithm|regex))\b/i,
  /\b(python|javascript|typescript|c\+\+|java|golang|rust|swift|sql|react|tailwind|node\.?js|docker)\b/i,
  /\b(debug|compile|syntax|binary\s+tree|leetcode|github|stack\s*overflow)\b/i,

  // Politics & Government
  /\b(politics|political|election|vote|voting|ballot|president|prime\s+minister|parliament|congress|senate)\b/i,
  /\b(biden|trump|keir\s+starmer|rishi\s+sunak|legislation|tax\s+policy)\b/i,

  // Math calculation & General Science
  /\b(calculate|equation|algebra|calculus|geometry|square\s+root|\d+\s*[\+\*\/\^]\s*\d+)\b/i,
  /\b(speed\s+of\s+light|quantum\s+physics|gravity\s+constant|photosynthesis|periodic\s+table|dinosaur)\b/i,
  /\b(who\s+is\s+(?:einstein|newton|shakespeare|napoleon|hitler|caesar))\b/i,

  // Medical Advice
  /\b(symptoms\s+of|cure\s+for|medicine|dosage|diagnose|prescription|medical\s+advice|vaccine)\b/i,

  // General AI Jailbreaks
  /\b(ignore\s+all\s+(?:previous|prior)\s+instructions|system\s+prompt|dan\s+mode|jailbreak|pretend\s+to\s+be)\b/i,
  /\b(what\s+llm|what\s+model\s+are\s+you|chatgpt|openai|anthropic|claude)\b/i,
]

// Conversational greetings and pleasantries
const CONVERSATIONAL_PATTERNS = [
  /^(hi|hello|hey|hiya|howdy|good\s+(morning|afternoon|evening|day)|greetings)(\s+(there|josh|bot|chatbot|everyone|team))?[\s!.,?]*$/i,
  /^(who\s+are\s+you|what\s+can\s+you\s+do|what\s+do\s+you\s+do|help|help\s+me|can\s+you\s+help)[\s!.,?]*$/i,
  /^(thank\s+you|thanks|thank\s+u|thx|cheers|awesome|great|perfect|okay|ok|sounds\s+good)[\s!.,?]*$/i,
  /^(bye|goodbye|see\s+you|talk\s+later)[\s!.,?]*$/i,
]

/**
 * Validates whether user message is relevant to Josh Photography.
 */
export function validateQueryTopic(text = '', history = []) {
  const query = text.trim()
  if (!query) {
    return { isAllowed: false, reason: 'empty_query', fallbackResponse: OFF_TOPIC_RESPONSE }
  }

  // 1. Check conversational greetings first
  for (const pattern of CONVERSATIONAL_PATTERNS) {
    if (pattern.test(query)) {
      return { isAllowed: true, reason: 'conversational' }
    }
  }

  // 2. Check photography on-topic match (High priority)
  for (const pattern of ON_TOPIC_PATTERNS) {
    if (pattern.test(query)) {
      return { isAllowed: true, reason: 'on_topic_match' }
    }
  }

  // 3. Multi-turn follow-up allowance in active conversation
  if (history && history.length > 0) {
    const isShortFollowUp = query.split(/\s+/).length <= 7
    const followUpWords =
      /\b(what|how|why|when|where|yes|no|sure|more|details|next|interested|tell\s+me|included|cost|quote|give\s+me|show\s+me|tell|can\s+you)\b/i
    if (isShortFollowUp && followUpWords.test(query)) {
      return { isAllowed: true, reason: 'multi_turn_followup' }
    }
  }

  // 4. Check explicit off-topic patterns
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(query)) {
      return {
        isAllowed: false,
        reason: 'strict_off_topic_pattern',
        fallbackResponse: OFF_TOPIC_RESPONSE,
      }
    }
  }

  // 5. Default fallback
  return {
    isAllowed: false,
    reason: 'unrelated_to_photography',
    fallbackResponse: OFF_TOPIC_RESPONSE,
  }
}
