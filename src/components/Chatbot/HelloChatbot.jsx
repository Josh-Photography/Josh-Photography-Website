import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ChatbotLogo from './ChatbotLogo'

// Subtle audio chime using Web Audio API
function playChime(type = 'receive') {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    gain.connect(ctx.destination)
    osc.connect(gain)

    if (type === 'send') {
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      osc.start(now)
      osc.stop(now + 0.13)
    } else {
      osc.frequency.setValueAtTime(587.33, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
      osc.start(now)
      osc.stop(now + 0.2)
    }
  } catch (err) {}
}

const INITIAL_WELCOME = {
  id: 'msg-welcome',
  role: 'assistant',
  content: `**Hello! Welcome to Josh Photography.** ✨\n\nI’m **Hello Chatbot**, your photography assistant. I can help you with:\n• Wedding, birthday & event photography\n• Packages & pricing (starting from £495)\n• Checking date availability & bookings\n• Studio information & photo delivery\n\nWhat can I help you with today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestions: [
    '💍 Wedding Packages',
    '🎂 Birthday Photography',
    '💰 Pricing & Options',
    '📅 Check Availability',
  ],
  actions: [
    { label: 'Explore Weddings', url: '/weddings', type: 'internal' },
    { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
    { label: 'Check Availability', url: '/check-availability', type: 'internal' },
  ],
}

export default function HelloChatbot() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_WELCOME])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Load chat history from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('josh_hello_chatbot_msgs')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        }
      }
    } catch (e) {}
  }, [])

  // Persist messages to sessionStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem('josh_hello_chatbot_msgs', JSON.stringify(messages))
      }
    } catch (e) {}
  }, [messages])

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 200)
      }
    }
  }, [messages, isOpen, isLoading])

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim()
    if (!text || isLoading) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    if (soundEnabled) playChime('send')

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'msg-welcome')
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      })

      if (!response.ok) throw new Error(`HTTP error ${response.status}`)
      const data = await response.json()

      const botReply = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions || [],
        actions: data.actions || [],
      }

      setMessages((prev) => [...prev, botReply])
      if (soundEnabled) playChime('receive')
    } catch (err) {
      const fallbackReply = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: `I’m Hello Chatbot, your photography assistant! I can help you with our photography services, packages, bookings, and other website-related questions.\n\nOur official packages start from **£495** (Essential) and **£1,150** (Premium). For dates and bespoke quotes, you can also reach Josh directly on **+44 7988 827057** or WhatsApp!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Wedding Packages', 'Check Availability', 'Birthday Photography'],
        actions: [
          { label: 'Client Reviews', url: '/testimonials', type: 'internal' },
          { label: 'Check Availability', url: '/check-availability', type: 'internal' },
        ],
      }
      setMessages((prev) => [...prev, fallbackReply])
      if (soundEnabled) playChime('receive')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME])
    sessionStorage.removeItem('josh_hello_chatbot_msgs')
    setShowClearConfirm(false)
  }

  const handleActionClick = (action) => {
    if (!action || !action.url) return
    if (action.type === 'external' || action.url.startsWith('http') || action.url.startsWith('tel:')) {
      window.open(action.url, '_blank', 'noopener,noreferrer')
    } else {
      navigate(action.url)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      }
    }
  }

  // Clean Markdown Parser for light mode
  const formatMarkdown = (content) => {
    if (!content) return null
    const lines = content.split('\n')

    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-serif text-base font-semibold text-neutral-900 mt-2 mb-1">
            {line.replace('### ', '')}
          </h3>
        )
      }
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return (
          <h2 key={idx} className="font-serif text-lg font-semibold text-neutral-900 mt-2 mb-1">
            {line.replace(/^#+\s/, '')}
          </h2>
        )
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2)
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-neutral-700 text-sm leading-relaxed">
            <span className="text-neutral-400 mt-0.5">•</span>
            <span>{parseInline(bulletText)}</span>
          </div>
        )
      }
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="my-1 text-neutral-800 text-sm font-medium leading-relaxed">
            {parseInline(line)}
          </div>
        )
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />
      }
      return (
        <p key={idx} className="my-1 text-neutral-700 text-sm leading-relaxed">
          {parseInline(line)}
        </p>
      )
    })
  }

  const parseInline = (text) => {
    if (!text) return ''
    const parts = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/)

      let firstMatch = null
      let matchType = null

      if (linkMatch && boldMatch) {
        if (linkMatch.index < boldMatch.index) {
          firstMatch = linkMatch
          matchType = 'link'
        } else {
          firstMatch = boldMatch
          matchType = 'bold'
        }
      } else if (linkMatch) {
        firstMatch = linkMatch
        matchType = 'link'
      } else if (boldMatch) {
        firstMatch = boldMatch
        matchType = 'bold'
      }

      if (!firstMatch) {
        parts.push(remaining)
        break
      }

      if (firstMatch.index > 0) {
        parts.push(remaining.substring(0, firstMatch.index))
      }

      if (matchType === 'bold') {
        parts.push(
          <strong key={`b-${key++}`} className="font-semibold text-neutral-900">
            {firstMatch[1]}
          </strong>
        )
      } else if (matchType === 'link') {
        const linkText = firstMatch[1]
        const linkUrl = firstMatch[2]
        if (linkUrl.startsWith('/')) {
          parts.push(
            <Link
              key={`l-${key++}`}
              to={linkUrl}
              onClick={() => {
                if (window.innerWidth < 768) setIsOpen(false)
              }}
              className="font-medium text-neutral-900 underline decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
            >
              {linkText}
            </Link>
          )
        } else {
          parts.push(
            <a
              key={`a-${key++}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-900 underline decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
            >
              {linkText}
            </a>
          )
        }
      }
      remaining = remaining.substring(firstMatch.index + firstMatch[0].length)
    }
    return parts
  }

  return (
    <>
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. SIMPLE & NEAT FLOATING LAUNCHER (WHITE LIGHT DESIGN)    */}
      {/* ──────────────────────────────────────────────────────────── */}
      {!isOpen && (
        <aside
          className="fixed bottom-6 left-6 z-[850] sm:bottom-8 sm:left-8 select-none"
          aria-label="Hello Chatbot Launcher"
        >
          <button
            type="button"
            id="open-hello-chatbot-btn"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-white hover:bg-neutral-50 text-neutral-900 px-4 py-2.5 sm:px-4.5 sm:py-3 rounded-full border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-102 active:scale-98 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-label="Open Hello Chatbot"
          >
            {/* Logo */}
            <ChatbotLogo size="sm" />

            {/* Clean Typography */}
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-sm font-semibold tracking-wide text-neutral-900">
                  Hello Chatbot
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-sans">
                Josh Photography
              </span>
            </div>
          </button>
        </aside>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. BACKDROP OVERLAY FOR MOBILE                             */}
      {/* ──────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/30 backdrop-blur-[2px] z-[940] transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. SIMPLE, NEAT, WHITE LIGHT CHAT PANEL (LEFT SIDE)        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="hello-chatbot-panel"
        aria-label="Hello Chatbot Assistant"
        className={`fixed top-0 left-0 bottom-0 z-[950] w-full sm:w-[390px] md:w-[410px] flex flex-col bg-white text-neutral-800 shadow-[12px_0_40px_rgba(0,0,0,0.08)] border-r border-neutral-200/80 transition-transform duration-300 ease-out select-text ${
          isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        {/* HEADER: CLEAN, WHITE & MINIMALIST */}
        <header className="flex-shrink-0 px-5 py-4 bg-white border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChatbotLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base font-semibold text-neutral-900">Hello Chatbot</h2>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">Josh Photography Assistant</p>
            </div>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-1">
            {/* Sound Mute/Unmute */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              title={soundEnabled ? 'Mute chime' : 'Enable chime'}
              aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            >
              {soundEnabled ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>

            {/* Clear Chat */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowClearConfirm(!showClearConfirm)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                title="Clear conversation"
                aria-label="Clear chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              {showClearConfirm && (
                <div className="absolute right-0 top-9 z-50 w-48 p-2.5 bg-white border border-neutral-200 rounded-xl shadow-lg text-xs animate-scale-in">
                  <p className="text-neutral-700 font-medium mb-2 text-center">Clear messages?</p>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={handleClearChat}
                      className="flex-1 bg-neutral-900 hover:bg-black text-white py-1 px-2 rounded-md transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-1 px-2 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors ml-1"
              title="Close"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* MESSAGES STREAM: SOFT WARM WHITE / IVORY LIGHT */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#FAF9F7] text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[88%] break-words ${
                  msg.role === 'user'
                    ? 'bg-neutral-900 text-white rounded-tr-sm shadow-xs'
                    : 'bg-white text-neutral-800 rounded-tl-sm border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="space-y-1">{formatMarkdown(msg.content)}</div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
                )}

                {/* Clean Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleActionClick(act)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-neutral-200 transition-colors"
                      >
                        <span>{act.label}</span>
                        <span className="text-neutral-400 text-[10px]">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clean Suggestion Pills */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-[88%]">
                  {msg.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleSendMessage(sug)}
                      className="text-left text-xs text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-full transition-colors shadow-2xs"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Neat Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start animate-fade-in">
              <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1.5 shadow-2xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"></span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR: SIMPLE, NEAT & WHITE LIGHT */}
        <footer className="flex-shrink-0 p-3 bg-white border-t border-neutral-100">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2 bg-[#F6F5F2] rounded-xl px-3 py-1.5 border border-neutral-200 focus-within:border-neutral-800 focus-within:bg-white transition-all"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about wedding, birthday, packages..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-neutral-900 placeholder:text-neutral-400 text-sm py-1.5 focus:outline-none"
              aria-label="Message Hello Chatbot"
            />

            {/* Neat Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0 h-8 w-8 rounded-lg bg-neutral-900 hover:bg-black text-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              title="Send"
              aria-label="Send message"
            >
              {isLoading ? (
                <svg className="animate-spin h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
        </footer>
      </section>
    </>
  )
}
