export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 md:px-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: logo */}
        <div className="font-[family-name:var(--font-display)] font-bold text-xl">
          CAESTUS
        </div>

        {/* Center: nav */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
          <a href="#vision" className="hover:text-text-secondary transition-colors">
            Vision
          </a>
          <a href="#system" className="hover:text-text-secondary transition-colors">
            System
          </a>
          <a href="#team" className="hover:text-text-secondary transition-colors">
            Team
          </a>
          <a href="#early-access" className="hover:text-text-secondary transition-colors">
            Early Access
          </a>
          <a href="#contact" className="hover:text-text-secondary transition-colors">
            Contact
          </a>
        </div>

        {/* Right: socials */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-text-secondary transition-colors">
            X
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            YouTube
          </a>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-8 text-center font-[family-name:var(--font-mono)] text-xs text-text-secondary uppercase tracking-wider">
        Caestus Labs / 2026 / Built in Ontario
      </div>
    </footer>
  )
}
