import { Header } from '../../components/layout/Header';
import { Hero } from '../../components/sections/landing/Hero'
import { Features } from '../../components/sections/landing/Features'
import { HowItWorks } from '../../components/sections/landing/HowItWorks'
import { CallToAction } from '../../components/sections/landing/CallToAction'
import { Footer } from '../../components/layout/Footer'

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
