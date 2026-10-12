import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { siteConfig, navigation } from '../../data/siteConfig'

// Routes with dark hero imagery at the top
const DARK_HERO_ROUTES = [
  '/',
  '/weddings',
  '/birthday-photography',
  '/celebrations',
  '/pre-wedding',
  '/engagement',
  '/anniversary',
  '/baby-family',
  '/portraits',
  '/festivals',
  '/corporate-events',
  '/mothers-day',
  '/fathers-day',
  '/portfolio',
  '/films',
  '/testimonials',
  '/about',
  '/contact',
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({ '/celebrations': false, '/portfolio': false })
  const location = useLocation()
  const navContainerRef = useRef(null)

  const isDarkHeroPage = DARK_HERO_ROUTES.includes(location.pathname)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close dropdowns on route changes
  useEffect(() => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Click outside and Escape key handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }

  // Header state
  // State A: Over dark hero at top -> transparent with subtle warm-charcoal top gradient & warm ivory text
  // State B: Scrolled or over light section -> solid opaque warm ivory background (#F8F3EA) with bold deep-charcoal text
  const isLightMode = isScrolled || !isDarkHeroPage

  const toggleDropdown = (path, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setActiveDropdown((prev) => (prev === path ? null : path))
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <header
        style={{
          backgroundColor: isLightMode ? '#F8F3EA' : undefined,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-luxury ${
          isLightMode
            ? 'bg-ivory border-b border-[#D8B77A]/35 shadow-[0_4px_24px_rgba(41,37,34,0.06)] py-4'
            : 'bg-gradient-to-b from-[#181310]/90 via-[#181310]/40 to-transparent py-5'
        }`}
      >
        <div
          ref={navContainerRef}
          className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between"
        >
          {/* Column 1: Logo (Left Aligned) */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link
              to="/"
              className="group flex items-center gap-3 sm:gap-3.5"
              aria-label={`${siteConfig.studioName} - Home`}
            >
              <img
                src="/LOGO.png"
                alt={siteConfig.studioName}
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className={`font-serif text-2xl sm:text-3xl lg:text-[1.85rem] tracking-[0.06em] whitespace-nowrap transition-colors duration-300 font-normal ${
                  isLightMode
                    ? 'text-charcoal'
                    : 'text-ivory drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                }`}
              >
                {siteConfig.studioName}
              </span>
            </Link>
          </div>

          {/* Column 2: Navigation Links (True Center) */}
          <nav
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-3 flex-shrink-0"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0)
              const isOpen = activeDropdown === item.path

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => hasChildren && setActiveDropdown(item.path)}
                  onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                >
                  {hasChildren ? (
                    <Link
                      to={item.path}
                      onClick={() => setActiveDropdown(null)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`px-3.5 py-2 font-nav text-[14px] uppercase tracking-[0.14em] transition-all duration-300 flex items-center gap-1.5 cursor-pointer rounded-sm ${
                        isOpen || isActive(item.path)
                          ? isLightMode
                            ? 'text-gold font-bold'
                            : 'text-[#E5BA78] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                          : isLightMode
                            ? 'text-charcoal font-semibold hover:text-gold'
                            : 'text-ivory font-medium hover:text-[#E5BA78] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-gold' : 'opacity-80'
                        }`}
                      />
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3.5 py-2 font-nav text-[14px] uppercase tracking-[0.14em] transition-all duration-300 flex items-center gap-1 rounded-sm ${
                        isActive(item.path)
                          ? isLightMode
                            ? 'text-gold font-bold'
                            : 'text-[#E5BA78] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                          : isLightMode
                            ? 'text-charcoal font-semibold hover:text-gold'
                            : 'text-ivory font-medium hover:text-[#E5BA78] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasChildren && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ backgroundColor: '#F8F3EA' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[300px] bg-ivory border border-[#D8B77A]/60 shadow-[0_16px_40px_rgba(41,37,34,0.18)] py-2.5 z-[70] rounded-sm"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-center justify-between px-5 py-3 font-nav text-[14px] tracking-[0.04em] font-medium transition-all duration-200 border-l-2 group ${
                              isActive(child.path)
                                ? 'border-gold text-gold bg-[#F3ECE0]'
                                : 'border-transparent text-charcoal/90 hover:text-charcoal hover:bg-[#F3ECE0] hover:border-gold/80 hover:pl-6'
                            }`}
                          >
                            <span>{child.label}</span>
                            <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0 ml-2" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Column 3: Check Availability Button (Right Aligned & Inset with Padding) */}
          <div className="flex-1 flex items-center justify-end min-w-0">
            <Link
              to="/check-availability"
              className={`hidden lg:inline-flex items-center justify-center px-6 py-2.5 font-nav text-[13px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 border shadow-sm rounded-sm ${
                isLightMode
                  ? 'border-[#292522] text-[#292522] hover:bg-[#292522] hover:text-[#FAF6EE]'
                  : 'border-[#E5BA78] text-[#E5BA78] hover:bg-[#E5BA78] hover:text-[#1A1715] backdrop-blur-sm bg-black/25'
              }`}
            >
              Check Availability
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2.5 transition-colors duration-300 rounded ${
                isLightMode ? 'text-charcoal' : 'text-ivory'
              }`}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay — Full Screen on Warm Ivory Background */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: '#F8F3EA' }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8B77A]/30">
              <div className="flex items-center gap-3">
                <img
                  src="/LOGO.png"
                  alt={siteConfig.studioName}
                  className="h-8 w-auto object-contain"
                />
                <span className="font-serif text-2xl text-charcoal font-medium tracking-[0.06em]">
                  {siteConfig.studioName}
                </span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-charcoal hover:text-gold"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
              {navigation.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0)
                const isExpanded = Boolean(mobileExpanded[item.path])

                return (
                  <div key={item.path} className="border-b border-[#D8B77A]/20 pb-3">
                    {hasChildren ? (
                      <div>
                        <div className="w-full flex items-center justify-between py-1">
                          <Link
                            to={item.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={`font-serif text-2xl font-light tracking-wide transition-colors ${
                              isActive(item.path) ? 'text-gold font-medium' : 'text-charcoal hover:text-gold'
                            }`}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpanded((prev) => ({
                                ...prev,
                                [item.path]: !prev[item.path],
                              }))
                            }
                            className="p-2 -mr-2 text-charcoal/70 hover:text-gold"
                            aria-expanded={isExpanded}
                            aria-label={`Toggle ${item.label} submenu`}
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180 text-gold' : ''
                              }`}
                            />
                          </button>
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22 }}
                              className="mt-2.5 pl-4 space-y-1 border-l-2 border-[#D8B77A]/50 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  onClick={() => setIsMobileOpen(false)}
                                  className={`block font-nav text-[13.5px] tracking-wider py-2 transition-colors ${isActive(child.path)
                                      ? 'text-gold font-semibold'
                                      : 'text-charcoal/85 hover:text-charcoal'
                                    }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block font-serif text-2xl font-light tracking-wide transition-colors py-1 ${isActive(item.path)
                            ? 'text-gold font-medium'
                            : 'text-charcoal hover:text-gold'
                          }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                )
              })}

              <div className="pt-6 pb-8">
                <Link
                  to="/check-availability"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full block text-center py-4 bg-muted-gold text-deep-black font-nav text-xs uppercase tracking-[0.16em] font-semibold hover:bg-gold-light shadow-sm"
                >
                  Check Availability
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[65] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-gold transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
