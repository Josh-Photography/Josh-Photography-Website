import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import PackagesPage from './pages/PackagesPage'
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
          <Route path="corporate-events" element={<CorporateEvents />} />
          <Route path="mothers-day" element={<MothersDay />} />
          <Route path="fathers-day" element={<FathersDay />} />
          <Route path="family" element={<Family />} />
          <Route path="maternity" element={<Maternity />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="photography" element={<Portfolio />} />
          <Route path="services" element={<Portfolio />} />
          <Route path="films" element={<Films />} />
          <Route path="about" element={<About />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="check-availability" element={<CheckAvailability />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
