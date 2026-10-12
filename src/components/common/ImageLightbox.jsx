import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react'

export default function ImageLightbox({ image, images = [], onClose, onNavigate }) {
  const currentIndex = images.findIndex((img) => img?.id === image?.id)

  const goToPrev = useCallback(
    (e) => {
      e?.stopPropagation()
      if (currentIndex > 0) {
        onNavigate?.(images[currentIndex - 1])
      } else if (images.length > 0) {
        onNavigate?.(images[images.length - 1])
      }
    },
    [currentIndex, images, onNavigate]
  )

  const goToNext = useCallback(
    (e) => {
      e?.stopPropagation()
      if (currentIndex < images.length - 1) {
        onNavigate?.(images[currentIndex + 1])
      } else if (images.length > 0) {
        onNavigate?.(images[0])
      }
    },
    [currentIndex, images, onNavigate]
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!image) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [image, onClose, goToPrev, goToNext])

  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [image])

  if (!image) return null

  const imgSrc = image.srcLarge || image.src

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black/95 backdrop-blur-md p-4 md:p-8"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-deep-black/70 border border-ivory/20 text-ivory hover:text-gold hover:border-gold transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter */}
        {images.length > 1 && currentIndex !== -1 && (
          <div className="absolute top-7 left-6 z-10 text-caption tracking-widest text-ivory/70 font-sans uppercase">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={goToPrev}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-deep-black/60 border border-ivory/20 text-ivory hover:text-gold hover:border-gold transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            aria-label="Next image"
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-deep-black/60 border border-ivory/20 text-ivory hover:text-gold hover:border-gold transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Content Box */}
        <motion.div
          key={image.id || imgSrc}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-5xl max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden rounded-sm border border-ivory/10 shadow-2xl">
            <img
              src={imgSrc}
              alt={image.title || image.alt || 'Photography showcase'}
              className="max-h-[72vh] max-w-full w-auto object-contain select-none"
            />
          </div>

          {/* Caption & Metadata */}
          <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-3 text-ivory/80 text-sm">
            <div>
              <h3 className="font-serif text-lg md:text-xl text-ivory">
                {image.title || image.alt || 'Studio Collection'}
              </h3>
              {image.event && (
                <p className="text-body-sm text-gold/90 font-light">{image.event}</p>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-ivory/60 font-sans">
              {image.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {image.location}
                </span>
              )}
              {(image.subcategory || image.category) && (
                <span className="flex items-center gap-1 uppercase tracking-wider text-[11px] bg-ivory/10 px-2 py-0.5 rounded">
                  <Tag className="w-3 h-3 text-gold" />
                  {image.subcategory || image.category}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
