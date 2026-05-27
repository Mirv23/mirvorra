import { useCallback, useState } from 'react'
import { useLenis } from './lib/useLenis'
import { Preloader } from './components/Preloader'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'
import { CaseStudies } from './components/CaseStudies'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { CTAFooter } from './components/CTAFooter'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  const handleComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <Navbar show={loaded} />
      <main>
        <Hero playing={loaded} />
        <Problem />
        <Solution />
        <CaseStudies />
        <Pricing />
        <Testimonials />
        <CTAFooter />
      </main>
    </>
  )
}
