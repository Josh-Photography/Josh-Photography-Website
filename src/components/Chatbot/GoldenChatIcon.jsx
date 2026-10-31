import React from 'react'

/**
 * Premium Golden Metallic Speech Bubble with 3 Golden Dots & Green Online Status Dot
 * Custom designed based on the reference image for Josh Photography
 */
export default function GoldenChatIcon({ className = '', size = 56 }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label="Josh Photography Assistant"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Metallic Gold Border Gradient */}
          <linearGradient id="goldRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="18%" stopColor="#F5D77F" />
            <stop offset="48%" stopColor="#C99424" />
            <stop offset="78%" stopColor="#FEE499" />
            <stop offset="100%" stopColor="#8C5C07" />
          </linearGradient>

          {/* Golden Rim Inner Bevel Line */}
          <linearGradient id="goldInnerLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DEB148" stopOpacity="0.6" />
          </linearGradient>

          {/* Luminous Warm Cream/Pearl Face Fill */}
          <radialGradient id="bubbleFaceFill" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F8ECC8" />
          </radialGradient>

          {/* 3D Golden Dots Gradient */}
          <linearGradient id="goldenDotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9DF8C" />
            <stop offset="45%" stopColor="#CA9623" />
            <stop offset="100%" stopColor="#875803" />
          </linearGradient>

          {/* Side Sonic Glow Waves Gradient */}
          <linearGradient id="goldenWaveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFECA6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D4A02A" stopOpacity="0.3" />
          </linearGradient>

          {/* Drop shadow for 3D depth */}
          <filter id="goldenDropGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#C89622" floodOpacity="0.4" />
          </filter>

          <filter id="dotShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#7A5002" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Side Sonic Glow Waves (Left) */}
        <g opacity="0.95">
          <path
            d="M 23 34 C 18 41 18 51 23 58"
            fill="none"
            stroke="url(#goldenWaveGlow)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 17 28 C 10 39 10 54 17 65"
            fill="none"
            stroke="url(#goldenWaveGlow)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* Side Sonic Glow Waves (Right) */}
        <g opacity="0.95">
          <path
            d="M 77 41 C 82 48 82 58 77 65"
            fill="none"
            stroke="url(#goldenWaveGlow)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 83 34 C 90 46 90 61 83 72"
            fill="none"
            stroke="url(#goldenWaveGlow)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* Outer Metallic Golden Speech Bubble Rim */}
        <path
          d="M 50 16
             C 68.5 16, 83.5 30.5, 83.5 48
             C 83.5 65.5, 68.5 79.5, 50 79.5
             C 44.2 79.5, 39 78, 34.2 75.4
             L 22.8 84.2
             C 21.2 85.4, 19 84, 19.5 82
             L 22.8 72
             C 18.5 65.4, 16 57, 16 48
             C 16 30.5, 31 16, 50 16 Z"
          fill="url(#goldRimGradient)"
          filter="url(#goldenDropGlow)"
        />

        {/* Inner Luminous Pearl / Cream Surface */}
        <path
          d="M 50 20.5
             C 66 20.5, 78.5 32.8, 78.5 48
             C 78.5 62.8, 66 75, 50 75
             C 44.8 75, 40.2 73.6, 35.8 71.3
             L 26.2 78.6
             L 26.5 70.4
             C 22.4 64.6, 20.5 56.8, 20.5 48
             C 20.5 32.8, 33.5 20.5, 50 20.5 Z"
          fill="url(#bubbleFaceFill)"
          stroke="url(#goldInnerLine)"
          strokeWidth="1.2"
        />

        {/* Three 3D Metallic Golden Dots */}
        <circle cx="37.5" cy="48" r="4.3" fill="url(#goldenDotGrad)" filter="url(#dotShadow)" />
        <circle cx="50" cy="48" r="4.3" fill="url(#goldenDotGrad)" filter="url(#dotShadow)" />
        <circle cx="62.5" cy="48" r="4.3" fill="url(#goldenDotGrad)" filter="url(#dotShadow)" />

        {/* Online Status Green Indicator at Top-Right Rim */}
        <g transform="translate(74.5, 23)">
          {/* Crisp White Outer Border Ring */}
          <circle cx="0" cy="0" r="6.2" fill="#FFFFFF" filter="drop-shadow(0 1.5px 3px rgba(0,0,0,0.28))" />
          {/* Bright Green Dot */}
          <circle cx="0" cy="0" r="4.6" fill="#00E676" />
          {/* 3D Specular Highlight Dot */}
          <circle cx="-1.4" cy="-1.4" r="1.4" fill="#E8F5E9" opacity="0.9" />
        </g>
      </svg>
    </div>
  )
}

