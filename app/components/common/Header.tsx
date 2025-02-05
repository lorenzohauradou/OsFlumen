"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, User, ShoppingBag } from "lucide-react"
import { useCallback } from "react"

export function Header() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }, [])

  return (
    <header className="absolute top-4 left-0 w-full z-50 px-6">
      <div className="w-full bg-gradient-to-br from-white via-cream-light to-white backdrop-blur-sm rounded-full border border-[#E8E6E1] max-w-7xl mx-auto">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/osflumen_logo.png" alt="OsFlumen" width={32} height={32} className="w-8 h-8" />
            <span className="text-4xl font-medium font-serif">
              <span className="text-charcoal-light">Os</span>
              <span className="text-charcoal-light">Flumen</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("hero")} className="text-sm hover:text-[#4A5724] transition-colors text-charcoal-light">
              HOME
            </button>
            <button onClick={() => scrollToSection("products")} className="text-sm hover:text-[#4A5724] transition-colors text-charcoal-light">
              PRODOTTI
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm hover:text-[#4A5724] transition-colors text-charcoal-light">
              ABOUT
            </button>
            <button onClick={() => scrollToSection("contacts")} className="text-sm hover:text-[#4A5724] transition-colors text-charcoal-light">
              CONTATTI
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:flex items-center">
              <input
                type="search"
                placeholder="Search..."
                className="pl-4 pr-10 py-2 rounded-full bg-white/80 text-sm focus:outline-none w-[200px] text-charcoal-light"
              />
              <Search className="absolute right-3 h-4 w-4 text-charcoal-light" />
            </div>
            <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5">
              <User className="h-5 w-5 text-charcoal-light cursor-pointer" />
              <ShoppingBag className="h-5 w-5 text-charcoal-light cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

