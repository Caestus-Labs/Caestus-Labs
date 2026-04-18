'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'border-b border-border' : ''
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-[120px] py-6 flex items-center justify-between">
        {/* Logo left */}
        <div className="font-[family-name:var(--font-display)] font-bold text-xl tracking-tight">
          CAESTUS
        </div>

        {/* Nav center - hidden on mobile */}
        <div className="hidden md:flex gap-8 text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider">
          <a href="#system" className="hover:text-text-secondary transition-colors">
            System
          </a>
          <a href="#vision" className="hover:text-text-secondary transition-colors">
            Vision
          </a>
          <a href="#about" className="hover:text-text-secondary transition-colors">
            About
          </a>
        </div>

        {/* CTA right */}
        <button className="px-6 py-2 border border-text-primary rounded-[2px] font-[family-name:var(--font-mono)] text-sm hover:bg-text-primary hover:text-background-primary transition-all duration-200 uppercase tracking-wider">
          Request Access
        </button>
      </div>
    </nav>
  )
}
