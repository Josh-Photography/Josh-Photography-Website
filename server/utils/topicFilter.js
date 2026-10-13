/**
 * Strict Topic Filter for Josh Photography - Hello Chatbot
 *
 * Ensures Hello Chatbot ONLY answers questions related to Josh Photography,
 * its photography services, packages, pricing, booking, availability,
 * studio, galleries, and website-specific information.
 *
 * Any off-topic questions (coding, politics, general knowledge, math,
 * other businesses, etc.) trigger the exact required polite response:
 * "I’m Hello Chatbot, your photography assistant! I can help you with our photography services, packages, bookings, and other website-related questions."
 */

export const OFF_TOPIC_RESPONSE = "I’m Hello Chatbot, your photography assistant! I can help you with our photography services, packages, bookings, and other website-related questions."

// Patterns indicating off-topic domains (coding, politics, general knowledge, math, other businesses, general AI)
const OFF_TOPIC_PATTERNS = [
  // Coding & Software Engineering
  /\b(python|javascript|typescript|c\+\+|java|php|ruby|golang|rust|swift|kotlin|c#|sql)\b/i,
  /\b(html|css|tailwind|react|vue|angular|node\.?js|express|docker|kubernetes|aws|azure)\b/i,
  /\b(write\s+(?:a\s+)?(?:code|script|function|program|class|algorithm|query|regex))\b/i,
  /\b(debug|compile|syntax|binary\s+tree|linked\s+list|leetcode|github|stack\s*overflow)\b/i,
  /\b(how\s+to\s+code|how\s+to\s+program|software\s+developer|backend|frontend\s+dev)\b/i,

  // Politics & Government
  /\b(politics|political|election|vote|voting|voters|ballot|president|prime\s+minister)\b/i,
  /\b(parliament|congress|senate|democrat|republican|labour\s+party|conservative\s+party)\b/i,
  /\b(biden|trump|keir\s+starmer|rishi\s+sunak|boris\s+johnson|legislation|tax\s+policy)\b/i,

  // Math & Calculation
  /\b(calculate|equation|algebra|calculus|geometry|square\s+root|\d+\s*[\+\*\/\^]\s*\d+)\b/i,

  // General Science, Trivia, Geography outside Josh Photography
  /\b(capital\s+of|distance\s+to|speed\s+of\s+light|quantum\s+physics|gravity\s+constant)\b/i,
  /\b(photosynthesis|periodic\s+table|molecule|dinosaur|solar\s+system|black\s+hole)\b/i,
  /\b(who\s+invented|who\s+discovered|who\s+wrote|who\s+is\s+(?:einstein|newton|shakespeare|napoleon|hitler|caesar))\b/i,

  // Food / Recipes / General Daily Life not related to event catering/photography
  /\b(recipe\s+for|how\s+to\s+cook|how\s+to\s+bake|ingredients\s+for|weather\s+in|weather\s+forecast)\b/i,

  // Medicine & Health
  /\b(symptoms\s+of|cure\s+for|medicine|dosage|diagnose|prescription|medical\s+advice|vaccine)\b/i,

  // Other Commercial Entities / Competitors / Products / Gadgets
  /\b(iphone|ipad|macbook|laptop|pc|desktop|android|samsung|galaxy|pixel|smartwatch)\b/i,
  /\b(playstation|ps5|xbox|nintendo|switch|gaming|console)\b/i,
  /\b(tesla|bmw|mercedes|audi|ford|toyota|honda|car|cars|vehicle|motorbike)\b/i,
  /\b(netflix|disney\+|hulu|spotify|amazon\s+prime|uber|lyft|airbnb)\b/i,
  /\b(crypto|bitcoin|ethereum|doge|blockchain|nft|stock\s+market|wall\s+street|forex)\b/i,
  /\b(nike|adidas|gucci|prada|zara|h&m|clothing\s+store)\b/i,
  /\b(mcdonald'?s|burger\s+king|kfc|starbucks|domino'?s|pizza\s+hut|subway)\b/i,

  // General AI / Jailbreak Attempts
  /\b(ignore\s+all\s+(?:previous|prior)\s+instructions|system\s+prompt|dan\s+mode|jailbreak|pretend\s+to\s+be)\b/i,
  /\b(what\s+llm|what\s+model\s+are\s+you|chatgpt|openai|anthropic|claude|gemini\s+api)\b/i,
]

// Patterns confirming photography & Josh Photography relevance
const ON_TOPIC_PATTERNS = [
  // Studio & Brand & Owner
  /\b(josh|josh\s+photography|elena|studio|photographer|photography|photo\s+shoot|photoshoot)\b/i,
  /\b(stories\s+worth\s+remembering|fused\s+lens|lead\s+photographer|team)\b/i,
  /\b(owner|founder|who\s+is\s+owner|who\s+is\s+the\s+owner|who\s+owns|who\s+runs|who\s+is\s+josh|who\s+are\s+you|who\s+takes\s+the\s+photos)\b/i,

  // Location & Base & Studio Space
  /\b(location|located|where|where\s+is|where\s+are|address|based|area|areas|london|greater\s+london|surrey|cotswolds|hertfordshire|uk|united\s+kingdom)\b/i,
  /\bwhere\s+(?:is|are)\s+(?:it|you|the|this|josh|your\s+studio|the\s+studio)\b/i,
  /\b(opening\s+hours|open|hours|studio\s+opening|new\s+studio|destination|travel)\b/i,

  // Booking & Availability & Dates
  /\b(book|booking|reserve|reservation|availability|available|available\s+dates|schedule|dates?|appointment|consultation|hire)\b/i,
  /\b(how\s+(?:can|do|to)\s+(?:i\s+)?book|can\s+i\s+book|want\s+to\s+book|ready\s+to\s+book)\b/i,
  /\b(inquire|enquire|inquiry|enquiry|deposit|retainer|contract|notice|advance|when\s+to\s+book)\b/i,

  // Services, Categories & Offerings
  /\b(categor(?:y|ies|ie)|services?|offerings?|specialt(?:y|ies)|specialise|specialize|specializing)\b/i,
  /\b(types?|kinds?|genres?|portfolio\s+categories|best\s+category|best\s+service|which\s+(?:one|is\s+best))\b/i,
  /\b(which\s+(?:category|categorie|service|package|photography)\s+(?:is|are)\s+(?:the\s+)?(?:best|better|popular|recommended))\b/i,
  /\b(what\s+do\s+you\s+(?:do|offer|shoot|photograph|cover|provide))\b/i,
  /\b(recommend|recommendation|popular|most\s+popular|specialty|specialties|options)\b/i,

  // Specific Categories
  /\b(wedding|weddings|weddin|church\s+wedding|bride|groom|ceremony|reception|vow|vows)\b/i,
  /\b(birthday|birthdays|bday|cake\s+smash|jubilee|celebration|celebrations)\b/i,
  /\b(maternity|pregnancy|pregnant|expecting|baby\s+bump)\b/i,
  /\b(family|families|parents|children|kids|grandparents|multi-generational|heirloom)\b/i,
  /\b(anniversary|anniversaries|silver\s+jubilee|golden\s+jubilee|vow\s+renewal)\b/i,
  /\b(engagement|engagements|proposal|propose|pre-wedding|prewedding|couple|couples)\b/i,
  /\b(baby|babies|newborn|infant|toddler)\b/i,
  /\b(festival|festivals|cultural|christmas|diwali|easter|lanterns|cultural\s+celebrations)\b/i,
  /\b(mother'?s\s+day|father'?s\s+day)\b/i,
  /\b(corporate|conference|summit|business\s+event|gala|headshot|headshots|brand\s+event)\b/i,
  /\b(graduation|graduations|degree|convocation|regalia|diploma)\b/i,
  /\b(portrait|portraits|editorial|fine-art|fine\s+art|candid|lifestyle)\b/i,
  /\b(film|films|video|videography|cinematic|drone|aerial|highlight\s+reel)\b/i,

  // Packages & Pricing
  /\b(package|packages|price|prices|pricing|cost|costs|rate|rates|fee|fees|quote|quotes|budget)\b/i,
  /\b(essential|premium|signature|addon|add-on|addon|starting\s+from|how\s+much)\b/i,
  /\b(£495|£1,?150|495|1150|gbp|pounds?)\b/i,

  // Gallery & Image Delivery
  /\b(gallery|galleries|portfolio|photos?|images?|pictures?|shots?|frames?|album|albums)\b/i,
  /\b(delivery|turnaround|how\s+long|when\s+will|preview|highlight\s+frames|high-res|digital\s+files)\b/i,
  /\b(print|prints|canvas|usb|proofs|color\s+grading|retouching|editing)\b/i,

  // Equipment & Style
  /\b(camera|cameras|lens|lenses|lighting|softbox|gear|optical|aperture|resolution)\b/i,
  /\b(documentary|photojournalism|unobtrusive|style|approach|candid)\b/i,

  // Contact Info
  /\b(contact|phone|telephone|call|whatsapp|email|address|reach|message)\b/i,
  /\b(\+?44\s*7988\s*827057|hello@joshphotography\.co\.uk)\b/i,

  // Reviews & About
  /\b(review|reviews|testimonial|testimonials|feedback|rating|awards|experience|background)\b/i,
]

// Friendly greetings and conversational pleasantries allowed in the photography context
const CONVERSATIONAL_PATTERNS = [
  /^(hi|hello|hey|hiya|howdy|good\s+(morning|afternoon|evening|day)|greetings)(\s+(there|josh|bot|chatbot|everyone|team))?[\s!.,?]*$/i,
  /^(who\s+are\s+you|what\s+can\s+you\s+do|what\s+do\s+you\s+do|help|help\s+me|can\s+you\s+help)[\s!.,?]*$/i,
  /^(thank\s+you|thanks|thank\s+u|thx|cheers|awesome|great|perfect|okay|ok|sounds\s+good)[\s!.,?]*$/i,
  /^(bye|goodbye|see\s+you|talk\s+later)[\s!.,?]*$/i,
]

/**
 * Checks if a user's input adheres strictly to Josh Photography topics.
 *
 * @param {string} text - User message
 * @param {Array} history - Previous conversation messages
 * @returns {{ isAllowed: boolean, reason?: string, fallbackResponse?: string }}
 */
export function validateQueryTopic(text = '', history = []) {
  const query = text.trim()
  if (!query) {
    return { isAllowed: false, reason: 'empty_query', fallbackResponse: OFF_TOPIC_RESPONSE }
  }

  // 1. Check for explicit off-topic patterns (coding, politics, general trivia, math)
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(query)) {
      return {
        isAllowed: false,
        reason: 'strict_off_topic_pattern',
        fallbackResponse: OFF_TOPIC_RESPONSE,
      }
    }
  }

  // 2. Check for friendly greetings and etiquette
  for (const pattern of CONVERSATIONAL_PATTERNS) {
    if (pattern.test(query)) {
      return { isAllowed: true, reason: 'conversational' }
    }
  }

  // 3. Check for direct on-topic patterns (services, packages, pricing, booking, etc.)
  for (const pattern of ON_TOPIC_PATTERNS) {
    if (pattern.test(query)) {
      return { isAllowed: true, reason: 'on_topic_match' }
    }
  }

  // 4. Multi-turn context check: If this is a short follow-up in an ongoing photography chat
  if (history && history.length > 0) {
    const isShortFollowUp = query.split(/\s+/).length <= 6
    const followUpWords = /\b(what|how|why|when|where|yes|no|sure|more|details|next|interested|tell\s+me|included|cost|quote|give\s+me)\b/i
    if (isShortFollowUp && followUpWords.test(query)) {
      // Allowed in multi-turn photography context
      return { isAllowed: true, reason: 'multi_turn_followup' }
    }
  }

  // 5. If it doesn't match photography topics or conversational greetings, treat as off-topic
  return {
    isAllowed: false,
    reason: 'unrelated_to_photography',
    fallbackResponse: OFF_TOPIC_RESPONSE,
  }
}
