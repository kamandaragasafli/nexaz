import { MotionConfig } from 'framer-motion'

import CustomCursor from './components/ui/CustomCursor'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import Navbar from './components/layout/Navbar'
import WhatsAppButton from './components/layout/WhatsAppButton'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import LogoCloud from './components/sections/LogoCloud'
import StorySection from './components/sections/StorySection'
import ServicesGrid from './components/sections/ServicesGrid'
import OfferSection from './components/sections/OfferSection'
import ProcessTimeline from './components/sections/ProcessTimeline'
import StatsSection from './components/sections/StatsSection'
import TestimonialsCarousel from './components/sections/TestimonialsCarousel'
import TechStack from './components/sections/TechStack'
import PricingSection from './components/sections/PricingSection'
import FAQSection from './components/sections/FAQSection'
import CTASection from './components/sections/CTASection'

export default function App() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-ink-950 font-body text-mist-100 overflow-x-hidden selection:bg-signal selection:text-ink-950">
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />
        <WhatsAppButton />
        
        <main>
          <Hero />
          <LogoCloud />
          <StorySection />
          <ServicesGrid />
          <OfferSection />
          <ProcessTimeline />
          <StatsSection />
          <TestimonialsCarousel />
          <TechStack />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </MotionConfig>
  )
}
