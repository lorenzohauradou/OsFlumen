import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Italiana } from "next/font/google";
import "./globals.css";

import { Header } from "./components/common/Header";


// Font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const italiana = Italiana({ 
  weight: '400',  // Italiana viene solo in peso 400
  subsets: ['latin'],
  variable: '--font-italiana'
})

// Metadati per SEO e social preview
export const metadata: Metadata = {
  title: "OsFlumen | Olio extravergine di oliva Biologico",
  description: "Olio extravergine di oliva Biologico di alta qualità.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${inter.variable} 
          ${italiana.variable} 
          min-h-screen 
          flex 
          flex-col 
          antialiased
        `}
      >
        {/* HEADER COMUNE */}
        <Header />

        {/* Contenuto principale della pagina */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER COMUNE */}
        
      </body>
    </html>
  );
}