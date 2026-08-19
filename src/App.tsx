import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLenis } from './lib/useLenis'
import { I18nProvider } from './lib/i18n'
import { Cursor } from './components/Cursor'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Approach } from './components/Approach'
import { Cases } from './components/Cases'
import { WhyUs } from './components/WhyUs'
import { Faq } from './components/Faq'
import { Contact } from './components/Contact'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-violet via-cyan to-mint"
    />
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  return (
    <I18nProvider>
      <Cursor />
      <ScrollProgress />
      <Preloader onDone={() => setReady(true)} />
      <Nav show={ready} />
      <main>
        <Hero playing={ready} />
        <About />
        <Services />
        <Approach />
        <Cases />
        <WhyUs />
        <Faq />
        <Contact />
      </main>
    </I18nProvider>
  )
}
