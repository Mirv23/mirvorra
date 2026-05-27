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
import { CustomCursor } from './components/ui/CustomCursor'
import { ScrollProgress } from './components/ui/ScrollProgress'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  const handleComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
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
