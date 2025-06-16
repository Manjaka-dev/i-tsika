"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Détection du défilement pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070602]/95 py-3 shadow-lg backdrop-blur-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Accueil I-Tsika">
          <Image
            src="/logo.png"
            alt="Logo I-Tsika"
            width={100}
            height={100}
            className="mr-2"
            priority
          />
          <span className="sr-only">I-Tsika - Accueil</span>
        </Link>

        {/* Navigation desktop avec rôles d'accessibilité */}
        <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Navigation principale">
          <Link href="/" className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1">
            Accueil
          </Link>
          <Link href="/about" className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1">
            À propos
          </Link>
          <Link href="/services" className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1">
            Services
          </Link>
          <Link href="/devis" className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1">
            Devis
          </Link>
          <Link href="/faq" className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1">
            FAQ
          </Link>
          <Link href="/contact" className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1">
            Contact
          </Link>
        </nav>

        {/* Bouton CTA desktop avec accessibilité améliorée */}
        <div className="hidden md:block">
          <Link href="/devis" aria-label="Demandez un devis gratuit">
            <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] font-medium rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602]">
              Demander un devis
            </Button>
          </Link>
        </div>

        {/* Bouton menu mobile avec attributs d'accessibilité */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className="sr-only">{mobileMenuOpen ? "Fermer" : "Menu"}</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menu mobile avec animation */}
      <motion.div 
        id="mobile-menu"
        role="navigation" 
        aria-label="Menu principal"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#070602]/98 backdrop-blur-md absolute w-full"
      >
        <div className="flex flex-col p-6 space-y-4">
          {/* Sections principales avec amélioration d'accessibilité */}
          <nav aria-label="Menu principal">
            <div className="border-b border-[#fbc63d]/20 pb-4">
              <Link
                href="/"
                className="flex items-center text-white hover:text-[#fbc63d] py-3 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-[#fbc63d] mr-2" aria-hidden="true">01.</span> Accueil
              </Link>
              <Link
                href="/about"
                className="flex items-center text-white hover:text-[#fbc63d] py-3 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-[#fbc63d] mr-2" aria-hidden="true">02.</span> À propos
              </Link>
              <Link
                href="/services"
                className="flex items-center text-white hover:text-[#fbc63d] py-3 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-[#fbc63d] mr-2" aria-hidden="true">03.</span> Services
              </Link>
            </div>
            
            {/* Sections secondaires avec accessibilité améliorée */}
            <div className="border-b border-[#fbc63d]/20 pb-4">
              <Link
                href="/faq"
                className="flex items-center text-white hover:text-[#fbc63d] py-3 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-[#fbc63d] mr-2" aria-hidden="true">•</span> FAQ
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-white hover:text-[#fbc63d] py-3 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-[#fbc63d] mr-2" aria-hidden="true">•</span> Contact
              </Link>
            </div>
          </nav>
          
          {/* CTA avec accessibilité améliorée */}
          <div className="pt-2">
            <Link href="/devis" onClick={() => setMobileMenuOpen(false)} aria-label="Demandez un devis gratuit">
              <Button className="w-full bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] font-medium rounded-full py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#070602]">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
