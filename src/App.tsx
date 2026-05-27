import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './lib/useLenis'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Delivery } from './components/Delivery'
import { WhyUs } from './components/WhyUs'
import { CaseStudies } from './components/CaseStudies'
import { Faq } from './components/Faq'
import { Contact } from './components/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  const handleComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      <AnimatePresence>{!loaded && <Preloader onComplete={handleComplete} />}</AnimatePresence>
      <Nav show={loaded} />
      <main>
        <Hero playing={loaded} />
        <About />
        <Services />
        <Delivery />
        <WhyUs />
        <CaseStudies />
        <Faq />
        <Contact />
      </main>
    </>
  )
}
