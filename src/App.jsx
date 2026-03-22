import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import ProblemSection from './components/ProblemSection/ProblemSection'
import SolutionSection from './components/SolutionSection/SolutionSection'
import ProductOverview from './components/ProductOverview/ProductOverview'
import MLSteps from './components/MLSteps/MLSteps'
import Capabilities from './components/Capabilities/Capabilities'
import TargetUsers from './components/TargetUsers/TargetUsers'
import Pricing from './components/Pricing/Pricing'
import MarketOpportunity from './components/MarketOpportunity/MarketOpportunity'
import CompetitiveAdvantage from './components/CompetitiveAdvantage/CompetitiveAdvantage'
import FinalCTA from './components/FinalCTA/FinalCTA'
import Footer from './components/Footer/Footer'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductOverview />
      <MLSteps />
      <Capabilities />
      <TargetUsers />
      <Pricing />
      <MarketOpportunity />
      <CompetitiveAdvantage />
      <FinalCTA />
      <Footer />
    </>
  )
}
