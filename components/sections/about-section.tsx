"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ValueItem {
  title: string;
  description: string;
}

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  values?: ValueItem[];
  stats?: { label: string; value: string }[];
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  imagePosition?: "left" | "right";
}

export default function AboutSection({
  title = "Qui sommes-nous ?",
  subtitle = "À propos de nous",
  description = "Nous sommes une équipe passionnée d'experts en développement web, dédiés à créer des expériences numériques exceptionnelles qui propulsent votre entreprise vers de nouveaux sommets.",
  imageSrc = "/placeholder.jpg",
  values = [],
  stats = [],
  showCTA = true,
  ctaText = "En savoir plus",
  ctaLink = "/about",
  imagePosition = "left",
}: AboutSectionProps) {
  // Détecter si l'affichage est mobile
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div 
          className={`flex flex-col gap-8 md:gap-12 items-center ${
            isMobile 
              ? "" 
              : imagePosition === "left" 
                ? "lg:flex-row" 
                : "lg:flex-row-reverse"
          }`}
        >
          {/* Image side */}
          <motion.div 
            className={`w-full ${isMobile ? "" : "lg:w-1/2"}`}
            initial={{ opacity: 0, x: isMobile ? 0 : (imagePosition === "left" ? -40 : 40) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt="À propos de nous"
                  width={600}
                  height={400}
                  className="w-full object-cover h-[300px] md:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#070602]/60 to-transparent"></div>
              </div>
              
              {/* Stats overlay (if provided) - Adapté pour mobile */}
              {stats.length > 0 && (
                <div className={`absolute ${isMobile ? "-bottom-6 right-4 scale-90" : "-bottom-8 -right-8"} bg-[#201f1b] p-4 md:p-6 rounded-2xl shadow-lg grid grid-cols-2 gap-4 md:gap-12`}>
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-[#fbc63d] text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">{stat.value}</p>
                      <p className="text-white text-xs md:text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Decorative elements - Réduits sur mobile */}
              <div className={`absolute -top-6 -left-6 ${isMobile ? "w-24 h-24" : "w-32 h-32"} rounded-full border-4 border-[#fbc63d]/30 z-10`}></div>
              <div className="absolute -z-10 bottom-1/3 -right-8 w-16 h-16 bg-[#fbc63d] rounded-full blur-2xl opacity-20"></div>
            </div>
          </motion.div>

          {/* Content side */}
          <div className={`w-full ${isMobile ? "" : "lg:w-1/2"}`}>
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-2 md:mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {subtitle}
            </motion.span>
            
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            
            <motion.div
              className="text-[#d9d9d9] text-base md:text-lg space-y-4 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Values list */}
            {values.length > 0 && (
              <motion.div
                className="space-y-3 md:space-y-4 mb-6 md:mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-medium text-lg md:text-xl mb-3">Nos valeurs</h3>
                
                <div className={`grid ${isMobile ? "grid-cols-1" : "sm:grid-cols-2"} gap-4`}>
                  {values.map((value, index) => (
                    <div 
                      key={index} 
                      className="flex items-start"
                    >
                      <div className="text-[#fbc63d] mr-2 mt-1">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{value.title}</h4>
                        <p className="text-[#d9d9d9] text-sm md:text-base">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA button */}
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href={ctaLink}>
                  <Button 
                    className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    {ctaText}
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
