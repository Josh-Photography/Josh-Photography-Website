import Hero from '../components/Hero/Hero'
import BrandStory from '../components/sections/BrandStory'
import Categories from '../components/sections/Categories'
import ServicesSection from '../components/sections/ServicesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import BookingCTA from '../components/sections/BookingCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <Categories />
      <ServicesSection />
      <TestimonialsSection />
      <BookingCTA />
    </>
  )
}
