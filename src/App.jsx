import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Weddings from './pages/Weddings'
import BirthdayPhotography from './pages/BirthdayPhotography'
import Celebrations from './pages/Celebrations'
import PreWedding from './pages/PreWedding'
import Engagement from './pages/Engagement'
import Anniversary from './pages/Anniversary'
import BabyFamily from './pages/BabyFamily'
import Portraits from './pages/Portraits'
import Festivals from './pages/Festivals'
import CorporateEvents from './pages/CorporateEvents'
import MothersDay from './pages/MothersDay'
import FathersDay from './pages/FathersDay'
import Graduations from './pages/Graduations'
import Family from './pages/Family'
import Maternity from './pages/Maternity'
import Portfolio from './pages/Portfolio'
import Films from './pages/Films'
import About from './pages/About'
import TestimonialsPage from './pages/TestimonialsPage'
import SpecialOffers from './pages/SpecialOffers'
import ServicesPage from './pages/ServicesPage'
import Sports from './pages/Sports'
import Product from './pages/Product'
import Cars from './pages/Cars'
import Reels from './pages/Reels'
import Model from './pages/Model'
import Contact from './pages/Contact'
import CheckAvailability from './pages/CheckAvailability'
import NotFound from './pages/NotFound'
import { CursorGlow } from './components/Effects/CursorGlow'

function App() {
  return (
    <BrowserRouter>
      <CursorGlow />
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
    </BrowserRouter>
  )
}

export default App
