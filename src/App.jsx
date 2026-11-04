import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import { CursorGlow } from './components/Effects/CursorGlow'

// Lazy-load subpages to reduce initial bundle size for fast mobile loading
const Weddings = lazy(() => import('./pages/Weddings'))
const BirthdayPhotography = lazy(() => import('./pages/BirthdayPhotography'))
const Celebrations = lazy(() => import('./pages/Celebrations'))
const PreWedding = lazy(() => import('./pages/PreWedding'))
const Engagement = lazy(() => import('./pages/Engagement'))
const Anniversary = lazy(() => import('./pages/Anniversary'))
const BabyFamily = lazy(() => import('./pages/BabyFamily'))
const Portraits = lazy(() => import('./pages/Portraits'))
const Festivals = lazy(() => import('./pages/Festivals'))
const CorporateEvents = lazy(() => import('./pages/CorporateEvents'))
const MothersDay = lazy(() => import('./pages/MothersDay'))
const FathersDay = lazy(() => import('./pages/FathersDay'))
const Graduations = lazy(() => import('./pages/Graduations'))
const Family = lazy(() => import('./pages/Family'))
const Maternity = lazy(() => import('./pages/Maternity'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Films = lazy(() => import('./pages/Films'))
const About = lazy(() => import('./pages/About'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))
const SpecialOffers = lazy(() => import('./pages/SpecialOffers'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const Sports = lazy(() => import('./pages/Sports'))
const Product = lazy(() => import('./pages/Product'))
const Cars = lazy(() => import('./pages/Cars'))
const Reels = lazy(() => import('./pages/Reels'))
const Model = lazy(() => import('./pages/Model'))
const Contact = lazy(() => import('./pages/Contact'))
const CheckAvailability = lazy(() => import('./pages/CheckAvailability'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Elegant luxury loader for seamless page transitions
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#FAF6EE] p-8">
      <div className="w-10 h-10 border-2 border-[#D8B77A]/30 border-t-[#B9975B] rounded-full animate-spin mb-4" />
      <span className="font-serif text-[#8C7A6B] text-sm tracking-widest uppercase">Loading Artistry...</span>
    </div>
  )
}

function getBasename() {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/joshphotography.co.uk')) return '/joshphotography.co.uk'
    if (path.startsWith('/Josh-Photography-Website')) return '/Josh-Photography-Website'
  }
  return ''
}

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <CursorGlow />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="weddings" element={<Weddings />} />
            <Route path="birthday-photography" element={<BirthdayPhotography />} />
            <Route path="celebrations" element={<Celebrations />} />
            <Route path="pre-wedding" element={<PreWedding />} />
            <Route path="engagement" element={<Engagement />} />
            <Route path="anniversary" element={<Anniversary />} />
            <Route path="baby-family" element={<BabyFamily />} />
            <Route path="portraits" element={<Portraits />} />
            <Route path="festivals" element={<Festivals />} />
            <Route path="graduations" element={<Graduations />} />
            <Route path="sports-photography" element={<Sports />} />
            <Route path="sports-shoot" element={<Sports />} />
            <Route path="product-photography" element={<Product />} />
            <Route path="product-shoot" element={<Product />} />
            <Route path="car-photography" element={<Cars />} />
            <Route path="car-shoot" element={<Cars />} />
            <Route path="cars-shoot" element={<Cars />} />
            <Route path="reels-shoots" element={<Reels />} />
            <Route path="reels-shoot" element={<Reels />} />
            <Route path="model-photography" element={<Model />} />
            <Route path="model-shoot" element={<Model />} />
            <Route path="corporate-events" element={<CorporateEvents />} />
            <Route path="mothers-day" element={<MothersDay />} />
            <Route path="fathers-day" element={<FathersDay />} />
            <Route path="family" element={<Family />} />
            <Route path="maternity" element={<Maternity />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="films" element={<Films />} />
            <Route path="about" element={<About />} />
            <Route path="special-offers" element={<SpecialOffers />} />
            <Route path="offers" element={<SpecialOffers />} />
            <Route path="packages" element={<Navigate to="/special-offers" replace />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="check-availability" element={<CheckAvailability />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
