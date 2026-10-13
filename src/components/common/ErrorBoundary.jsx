import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Josh Photography Application Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleClearCacheAndReload = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('josh_cms_data')
        sessionStorage.clear()
      }
    } catch (e) {
      console.warn('Could not clear storage:', e)
    }
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F3EA] text-[#292522] flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-white border border-[#D8B77A]/40 rounded-xl p-8 shadow-xl text-center">
            {/* Logo */}
            <div className="inline-flex items-center gap-2 mb-6">
              <img src="/logo-black.png" alt="Josh Photography" className="h-9 w-auto object-contain" />
              <span className="font-serif text-xl tracking-[0.08em] uppercase text-[#292522] font-medium">
                JOSH PHOTOGRAPHY
              </span>
            </div>

            <h1 className="font-serif text-3xl font-light text-[#292522] mb-3">
              Application Notice
            </h1>
            <p className="text-[#51443A]/80 text-sm leading-relaxed mb-6 font-light">
              A temporary display issue occurred while loading this page. You can easily restore the display below.
            </p>

            <div className="bg-[#FAF6EE] border border-[#D8B77A]/30 rounded-lg p-4 mb-6 text-left overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-700 break-words font-semibold">
                {this.state.error?.toString()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#292522] text-[#F8F3EA] rounded-md font-medium text-xs tracking-wider uppercase hover:bg-[#1a1715] transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleClearCacheAndReload}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#D8B77A] text-[#1A1715] rounded-md font-semibold text-xs tracking-wider uppercase hover:bg-[#c9a665] transition-colors"
              >
                Reset Cache & Reload
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
