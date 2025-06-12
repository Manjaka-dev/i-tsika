"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c0c0a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Première colonne - Logo & description */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="mr-2"
                priority
              />
            </Link>
            <p className="text-[#d9d9d9] text-sm leading-relaxed mb-6">
              Nous créons des sites web modernes, performants et sur mesure pour répondre aux besoins uniques de votre entreprise.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#7b7979] flex items-center justify-center hover:border-[#fbc63d] hover:bg-[#fbc63d]/10 transition-colors"
              >
                <Image src="/icons/github.svg" alt="GitHub" width={16} height={16} className="invert brightness-0 filter" />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#7b7979] flex items-center justify-center hover:border-[#fbc63d] hover:bg-[#fbc63d]/10 transition-colors"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={16} height={16} className="invert brightness-0 filter" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#7b7979] flex items-center justify-center hover:border-[#fbc63d] hover:bg-[#fbc63d]/10 transition-colors"
              >
                <Image src="/icons/twitter.svg" alt="Twitter" width={16} height={16} className="invert brightness-0 filter" />
              </a>
            </div>
          </div>

          {/* Deuxième colonne - Liens rapides */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Liens rapides</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Services
                </Link>
              </li>


              <li>
                <Link href="/faq" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Troisième colonne - Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Nos services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services#site-vitrine" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Site vitrine
                </Link>
              </li>
              <li>
                <Link href="/services#e-commerce" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Site e-commerce
                </Link>
              </li>
              <li>
                <Link href="/services#refonte" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Refonte de site
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-[#fbc63d]" />
                  Optimisation SEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Quatrième colonne - Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#fbc63d] mr-3" />
                <span className="text-[#d9d9d9]">contact@i-tsika.site</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#fbc63d] mr-3" />
                <span className="text-[#d9d9d9]">+261 387939905</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#fbc63d] mr-3 mt-1" />
                <span className="text-[#d9d9d9]">Antananarivo, Madagascar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#201f1b] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#7b7979] text-sm mb-4 md:mb-0">
              &copy; {currentYear} I-Tsika. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link href="/mentions-legales" className="text-[#7b7979] text-sm hover:text-[#fbc63d] transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-[#7b7979] text-sm hover:text-[#fbc63d] transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
