import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { featuredStories } from '../../data/stories'

export default function FeaturedStories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden border-y border-[#B8864C]/35"
      style={{
        background: `
          radial-gradient(ellipse 95% 65% at 50% -10%, rgba(220, 160, 90, 0.32) 0%, transparent 65%),
          radial-gradient(ellipse 75% 55% at 92% 35%, rgba(195, 130, 65, 0.26) 0%, transparent 60%),
          radial-gradient(ellipse 75% 55% at 8% 70%, rgba(175, 110, 50, 0.24) 0%, transparent 60%),
          radial-gradient(ellipse 95% 55% at 50% 110%, rgba(220, 160, 90, 0.28) 0%, transparent 65%),
          linear-gradient(175deg, #1C0F08 0%, #2B170E 18%, #3E2416 42%, #4A2B1A 55%, #351C11 82%, #1A0D07 100%)
        `,
      }}
      aria-label="Featured Stories"
    >
      {/* Shining Amber-Bronze Radial Glow Accents */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[radial-gradient(ellipse_at_center,_rgba(235,175,100,0.25),_transparent_70%)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(190,120,55,0.18),_transparent_70%)] blur-3xl pointer-events-none"
      />
      {/* Subtle Metallic Specular Light Sweep */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(235,185,120,0.06)] to-transparent pointer-events-none"
      />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-[#E5BA78] font-sans font-semibold mb-4 drop-shadow-[0_1px_8px_rgba(229,186,120,0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA78]" />
            <span>Featured</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-display-sm md:text-display-md lg:text-display-lg font-serif text-[#FAF4EA] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            Stories We Love To Tell
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '4.5rem' } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#E5BA78] to-transparent mx-auto mt-6"
          />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * index + 0.3, duration: 0.7 }}
            >
              <Link to={story.path} className="group block">
                <div className="relative overflow-hidden aspect-[16/10] rounded-sm border border-[#C88A45]/30 group-hover:border-[#E8BA75]/70 shadow-[0_12px_36px_rgba(18,9,4,0.55)] group-hover:shadow-[0_16px_48px_rgba(180,110,45,0.35)] transition-all duration-500">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-luxury group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0E07]/95 via-[#2D160D]/45 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#E5BA78] font-sans font-semibold">
                        {story.event}
                      </span>
                      <span className="w-4 h-[1px] bg-[#E5BA78]/50" />
                      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-[#FAF4EA]/70 font-sans">
                        {story.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-light text-[#FAF4EA] mb-2 tracking-wide group-hover:text-white transition-colors duration-300">
                      {story.title}
                    </h3>

                    <p className="text-body-sm text-[#FAF4EA]/65 font-light mb-4 line-clamp-2">
                      {story.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-[#E5BA78] font-sans font-medium transition-all duration-400 group-hover:text-white group-hover:gap-3">
                      View Story
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
