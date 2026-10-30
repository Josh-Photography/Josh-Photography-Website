import React from 'react'

/**
 * Starburst polygon coordinate generator
 * Produces a jagged circular starburst matching the user's reference image
 */
function getStarburstPoints(points = 20, rOuter = 48, rInner = 40) {
  const total = points * 2
  const coords = []
  for (let i = 0; i < total; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2
    const r = i % 2 === 0 ? rOuter : rInner
    const x = (50 + r * Math.cos(angle)).toFixed(2)
    const y = (50 + r * Math.sin(angle)).toFixed(2)
    coords.push(`${x},${y}`)
  }
  return coords.join(' ')
}

const STARBURST_POINTS = getStarburstPoints(20, 48, 40)

/**
 * PromotionalBadge — Code-generated advertisement discount badge
 * 
 * Supports:
 * - 'starburst': Red jagged starburst with bold white discount % and gold 'OFF'
 * - 'ribbon': Sleek advertisement corner ribbon with red gradient & gold border
 */
export default function PromotionalBadge({
  discount = 20,
  text = 'OFF',
  style = 'starburst',
  visible = true,
  className = '',
}) {
  if (!visible || !discount || discount <= 0) return null

  const discountNum = Number(discount)
  const displayDiscount = isNaN(discountNum) ? '20%' : `${discountNum}%`
  const bottomText = (text && text.trim()) ? text.trim() : 'OFF'

  if (style === 'ribbon') {
    return (
      <div
        className={`absolute top-3 right-3 z-20 flex flex-col items-center justify-center px-3.5 py-1.5 rounded-sm shadow-xl bg-gradient-to-br from-[#DC2626] via-[#B91C1C] to-[#7F1D1D] text-white border border-[#D8B77A]/50 ${className}`}
        style={{
          boxShadow: '0 6px 16px rgba(0,0,0,0.45)',
        }}
      >
        <div className="flex items-baseline gap-0.5 leading-none">
          <span className="font-extrabold text-base tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {displayDiscount}
          </span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#FACC15] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-0.5">
          {bottomText}
        </span>
      </div>
    )
  }

  // Primary: Red Jagged Starburst Badge (Reference Image 4)
  return (
    <div
      className={`absolute top-2.5 right-2.5 z-20 w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{
        filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45))',
      }}
      aria-label={`${displayDiscount} ${bottomText}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vibrant Red Gradient */}
          <radialGradient id="starburstGrad" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="45%" stopColor="#DC2626" />
            <stop offset="85%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          {/* Angled 3D Drop Shadow for text */}
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="0.8" floodColor="#450A0A" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* Starburst Jagged Red Background */}
        <polygon
          points={STARBURST_POINTS}
          fill="url(#starburstGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />

        {/* Inner Highlight Ring */}
        <polygon
          points={STARBURST_POINTS}
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="0.8"
          transform="scale(0.92) translate(4.3, 4.3)"
        />

        {/* Discount Percentage Number (Large, Bold White) */}
        <text
          x="50"
          y={bottomText ? '46' : '56'}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontFamily="'Outfit', 'Inter', -apple-system, sans-serif"
          fontWeight="900"
          fontSize={displayDiscount.length > 3 ? '24' : '27'}
          letterSpacing="-0.5px"
          filter="url(#badgeShadow)"
        >
          {displayDiscount}
        </text>

        {/* Bottom Text ('OFF' in Bold Gold/Yellow, matching Reference Image 4) */}
        {bottomText && (
          <text
            x="50"
            y="69"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#FACC15"
            fontFamily="'Outfit', 'Inter', -apple-system, sans-serif"
            fontWeight="900"
            fontSize={bottomText.length > 5 ? '13' : '18'}
            letterSpacing="0.8px"
            filter="url(#badgeShadow)"
          >
            {bottomText}
          </text>
        )}
      </svg>
    </div>
  )
}

/**
 * SpecialOfferSticker — Yellow Advertisement Sticker (Reference Image 5)
 * Inspired by retro comic/advertisement speech bubble with lightning bolt
 */
export function SpecialOfferSticker({
  label = 'SPECIAL OFFER',
  className = '',
}) {
  if (!label || !label.trim()) return null

  return (
    <div
      className={`absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-[#1A1715] rounded-full border-2 border-[#1A1715] shadow-[2px_2px_0px_#B91C1C] select-none ${className}`}
      style={{
        transform: 'rotate(-2deg)',
      }}
    >
      <span className="text-[11px] leading-none text-[#B91C1C] font-black">⚡</span>
      <span className="font-nav font-black text-[10px] sm:text-[11px] uppercase tracking-wider text-[#1A1715]">
        {label}
      </span>
    </div>
  )
}
