import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Compass } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ivory pt-24 px-6">
      <div className="max-w-xl text-center py-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-8xl md:text-9xl text-gold/30 font-light block mb-2"
        >
          404
        </motion.span>
        <span className="text-caption uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-4">
          Page Not Found
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-light mb-6">
          This Moment Has Shifted
        </h1>
        <p className="text-warm-brown/80 text-body-md font-light leading-relaxed mb-10">
          The frame you are looking for has been moved or does not exist. Explore our visual collections below to find your way back.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-deep-black text-ivory font-sans font-medium text-xs uppercase tracking-wider hover:bg-gold hover:text-deep-black transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal/30 text-charcoal font-sans font-medium text-xs uppercase tracking-wider hover:border-gold hover:text-gold transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            <span>View Photography</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
