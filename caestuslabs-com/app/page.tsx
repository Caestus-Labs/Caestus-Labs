import Nav from '@/components/ui/Nav'
import EnhancedHero from '@/components/sections/EnhancedHero'
import ProblemStatement from '@/components/sections/ProblemStatement'
import MarketOpportunity from '@/components/sections/MarketOpportunity'
import Vision from '@/components/sections/Vision'
import SystemReveal from '@/components/sections/SystemReveal'
import Applications from '@/components/sections/Applications'
import TechnologyStack from '@/components/sections/TechnologyStack'
import BusinessModel from '@/components/sections/BusinessModel'
import Team from '@/components/sections/Team'
import Traction from '@/components/sections/Traction'
import Investment from '@/components/sections/Investment'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black">
      <Nav />
      <EnhancedHero />
      <ProblemStatement />
      <MarketOpportunity />
      <Vision />
      <SystemReveal />
      <Applications />
      <TechnologyStack />
      <BusinessModel />
      <Team />
      <Traction />
      <Investment />
      <Footer />
    </main>
  )
}
