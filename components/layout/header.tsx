"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Fermer le menu mobile quand on redimensionne
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/devis", label: "Devis" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

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
            src="/logo.webp"
            alt="Logo I-Tsika"
            width={100}
            height={100}
            className="mr-2"
            priority
          />
          <span className="sr-only">I-Tsika - Accueil</span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-[#fbc63d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602] rounded-md p-1 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bouton CTA desktop */}
        <div className="hidden md:block">
          <Link href="/devis" aria-label="Demandez un devis gratuit">
            <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] font-medium rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-offset-2 focus:ring-offset-[#070602]">
              Demander un devis
            </Button>
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-white p-2 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className="sr-only">{mobileMenuOpen ? "Fermer" : "Menu"}</span>
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Menu mobile avec animation améliorée */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Menu principal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-0 bg-[#070602]/98 backdrop-blur-md z-40"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-2 p-6">
              <nav aria-label="Menu principal" className="w-full max-w-sm">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center text-white hover:text-[#fbc63d] py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#fbc63d] rounded-md transition-colors border-b border-[#fbc63d]/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-[#fbc63d] mr-3 text-sm font-mono" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA mobile */}
              <motion.div
                className="w-full max-w-sm pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link href="/devis" onClick={() => setMobileMenuOpen(false)} aria-label="Demandez un devis gratuit">
                  <Button className="w-full bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] font-medium rounded-full py-4 text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#070602]">
                    Demander un devis
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
