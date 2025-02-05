'use client'

import { Input } from "../ui/Input"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type React from "react"

export default function Footer() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle newsletter signup
  }

  return (
    <footer className="bg-charcoal-DEFAULT text-white text-center lg:text-left md:text-left">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="font-serif text-4xl md:text-5xl mb-4">UNISCITI ALLA NEWSLETTER</h2>
              <p className="font-sans text-gray-300">Iscriviti e rimani aggiornato sulle nostre ultime novità!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center gap-4 w-full md:w-[400px]">
              <Input
                type="email"
                placeholder="Your email address"
                className="text-lg border-b-white/20"
              />
              <button 
                type="submit" 
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-white/10">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contatti</h3>
            <div className="space-y-2 text-gray-300 font-sans">
              <p>+(39) 331 965 6784</p>
              <p>info@osflumen.com</p>
              <address className="not-italic">
                Bocca di Fiume, Via Migliara 45
                <br />
                Latina, LT, Italy 04100
              </address>
            </div>
          </div>

          {/* Center Logo and Links */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-8">
              <span className="font-serif text-6xl">
                <span className="text-white">Os</span>
                <span className="text-[#fdc12c]">Flumen</span>
              </span>
            </Link>
            <nav className="flex gap-8 font-sans">
              <Link href="/about" className="hover:text-gray-300 transition-colors">
                ABOUT US
              </Link>
              <Link href="/products" className="hover:text-gray-300 transition-colors">
                PRODOTTI
              </Link>
              <Link href="/blog" className="hover:text-gray-300 transition-colors">
                BLOG
              </Link>
              <Link href="/contacts" className="hover:text-gray-300 transition-colors">
                CONTATTI
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col text-center">
            <h3 className="font-serif text-lg mb-4">Social Links</h3>
            <div className="space-y-2 font-sans text-center">
              <Link href="https://www.instagram.com/osflumen" className="block hover:text-gray-300 transition-colors">
                Instagram
              </Link>
              <Link href="https://www.facebook.com/osflumen" className="block hover:text-gray-300 transition-colors">
                Facebook
              </Link>
              <Link href="https://wa.me/+393319656784" className="block hover:text-gray-300 transition-colors">
                WhatsApp
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/10 text-sm text-gray-400 font-sans">
          <p>
            Copyright © OsFlumen. Tutti i diritti riservati. |
            <Link href="/privacy" className="hover:text-white ml-1 transition-colors">
              Privacy Policy
            </Link>{" "}
            | Design by Lorenzo Hauradou.
          </p>
        </div>
      </div>
    </footer>
  )
}

