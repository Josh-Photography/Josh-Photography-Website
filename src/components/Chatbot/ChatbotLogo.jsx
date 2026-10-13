import React from 'react'

/**
 * Premium Photography & Speech Bubble Logo for Hello Chatbot
 * Clean, minimalist aesthetic with subtle silver & charcoal accents.
 * Fuses a precision camera body, lens aperture iris, and dialogue bubble.
 */
export default function ChatbotLogo({ size = 'md', className = '', variant = 'light' }) {
  const sizeMap = {
    sm: { width: 30, height: 30 },
    md: { width: 38, height: 38 },
    lg: { width: 48, height: 48 },
  }

  const { width, height } = sizeMap[size] || sizeMap.md

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none flex-shrink-0 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      aria-label="Hello Chatbot Photography Logo"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle Silver Gradient */}
          <linearGradient id="silverBezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Clean Camera Body Gradient */}
          <linearGradient id="cameraBodyLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E2024" />
            <stop offset="100%" stopColor="#111215" />
          </linearGradient>

          {/* Lens Interior Gradient */}
          <radialGradient id="lensInterior" cx="38%" cy="36%" r="65%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="55%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Camera + Speech Bubble Shell */}
        <path
          d="M 12 18
             C 12 13, 15 10, 20 10
             L 24 10
             C 25 7, 27 6, 30 6
             L 34 6
             C 37 6, 39 7, 40 10
             L 44 10
             C 49 10, 52 13, 52 18
             L 52 44
             C 52 49, 49 52, 44 52
             L 24 52
             L 15 59
             C 13 60.5, 12 59.5, 12 57
             L 12 44
             Z"
          fill="url(#cameraBodyLight)"
          stroke="url(#silverBezel)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Shutter Button & Flash */}
        <rect x="42" y="7" width="5" height="3" rx="1" fill="#94A3B8" />
        <circle cx="20" cy="18" r="2.2" fill="#64748B" />

        {/* Outer Lens Ring */}
        <circle
          cx="32"
          cy="31"
          r="15"
          fill="none"
          stroke="url(#silverBezel)"
          strokeWidth="2.2"
        />

        {/* Lens Glass Interior */}
        <circle cx="32" cy="31" r="12.5" fill="url(#lensInterior)" />

        {/* Aperture Iris Blades */}
        <g stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.8">
          <line x1="32" y1="22" x2="38" y2="28" />
          <line x1="38" y1="28" x2="35" y2="36" />
          <line x1="35" y1="36" x2="27" y2="37" />
          <line x1="27" y1="37" x2="25" y2="29" />
          <line x1="25" y1="29" x2="32" y2="22" />
        </g>

        {/* Center Iris Opening */}
        <circle cx="31.5" cy="31" r="4.5" fill="#0B0C0E" stroke="#E2E8F0" strokeWidth="0.8" />

        {/* Lens Catchlight Glint */}
        <path
          d="M 27 24 A 8 8 0 0 1 36 24"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Chat dots */}
        <circle cx="22" cy="46" r="1.3" fill="#94A3B8" />
        <circle cx="27" cy="46" r="1.3" fill="#E2E8F0" />
        <circle cx="32" cy="46" r="1.3" fill="#94A3B8" />
      </svg>
    </div>
  )
}
