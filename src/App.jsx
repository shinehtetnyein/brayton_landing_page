import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Welcome from './components/Welcome.jsx'
import Beliefs from './components/Beliefs.jsx'
import ServiceTimes from './components/ServiceTimes.jsx'
import Events from './components/Events.jsx'
import Sermons from './components/Sermons.jsx'
import ScriptureBand from './components/ScriptureBand.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <Beliefs />
      <ServiceTimes />
      <Events />
      <Sermons />
      <ScriptureBand />
      <ContactForm />
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
