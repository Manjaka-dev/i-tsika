"use client";

import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#070602] text-[#ffffff] flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#fbc63d] transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Retour à l'accueil</span>
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-[#8bc34a] rounded-full flex items-center justify-center mb-8 animate-bounce-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-top">
          Merci pour votre message !
        </h1>
        
        <p className="text-xl text-[#d9d9d9] max-w-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
          Nous avons bien reçu votre demande et vous répondrons dans les meilleurs délais.
        </p>
        
        <Link href="/" className="mt-12">
          <Button 
            className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] px-8 py-4 rounded-full text-lg font-medium relative overflow-hidden transition-all duration-300 animate-slide-in-bottom group"
            style={{ animationDelay: '400ms' }}
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" style={{ backgroundSize: '80rem 100%' }}></span>
            Retourner à l'accueil
          </Button>
        </Link>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[#201f1b] py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-[#7b7979] text-sm">
          <p>&copy; 2025 Portfolio. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
