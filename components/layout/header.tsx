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
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mr-2"
            priority
          />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-white hover:text-[#fbc63d] transition-colors">
            Accueil
          </Link>
          <Link href="/about" className="text-white hover:text-[#fbc63d] transition-colors">
            À propos
          </Link>
          <Link href="/services" className="text-white hover:text-[#fbc63d] transition-colors">
            Services
          </Link>

          <Link href="/devis" className="text-white hover:text-[#fbc63d] transition-colors">
            Devis
          </Link>
          <Link href="/faq" className="text-white hover:text-[#fbc63d] transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-white hover:text-[#fbc63d] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Bouton CTA desktop */}
        <div className="hidden md:block">
          <Link href="/devis">
            <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] font-medium rounded-full px-6 py-2 transition-all duration-300 hover:scale-105">
              Demander un devis
            </Button>
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menu mobile avec animation */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#070602]/98 backdrop-blur-md absolute w-full"
      >
        <div className="flex flex-col p-6 space-y-4">
          {/* Sections principales */}
          <div className="border-b border-[#fbc63d]/20 pb-4">
            <Link
              href="/"
              className="flex items-center text-white hover:text-[#fbc63d] py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#fbc63d] mr-2">01.</span> Accueil
            </Link>
            <Link
              href="/about"
              className="flex items-center text-white hover:text-[#fbc63d] py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#fbc63d] mr-2">02.</span> À propos
            </Link>
            <Link
              href="/services"
              className="flex items-center text-white hover:text-[#fbc63d] py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#fbc63d] mr-2">03.</span> Services
            </Link>
          </div>
          
          {/* Sections secondaires */}
          <div className="border-b border-[#fbc63d]/20 pb-4">
            <Link
              href="/faq"
              className="flex items-center text-white hover:text-[#fbc63d] py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#fbc63d] mr-2">•</span> FAQ
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-white hover:text-[#fbc63d] py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#fbc63d] mr-2">•</span> Contact
            </Link>
          </div>
          
          {/* CTA */}
          <div className="pt-2">
            <Link href="/devis" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] font-medium rounded-full py-3 mt-2">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
