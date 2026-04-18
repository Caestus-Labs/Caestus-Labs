import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import Vision from '@/components/sections/Vision'
import Problem from '@/components/sections/Problem'
import SystemReveal from '@/components/sections/SystemReveal'
import EarlyAccess from '@/components/sections/EarlyAccess'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Vision />
      <Problem />
      <SystemReveal />
      <EarlyAccess />
      <Footer />
    </main>
  )
}
