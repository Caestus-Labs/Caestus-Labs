import NewHero from '@/components/sections/NewHero'

export default function NewHeroTestPage() {
  return (
    <main className="bg-black">
      <NewHero />
      {/* Additional sections can be added below for testing */}
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-white/50 font-mono text-sm">Scroll continues here</p>
      </div>
    </main>
  )
}