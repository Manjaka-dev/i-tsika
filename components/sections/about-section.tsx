"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className={`flex flex-col gap-12 items-center ${
            imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image side */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: imagePosition === "left" ? -40 : 40 }}
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
                  className="w-full object-cover h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#070602]/60 to-transparent"></div>
              </div>
              
              {/* Stats overlay (if provided) */}
              {stats.length > 0 && (
                <div className="absolute -bottom-8 -right-8 bg-[#201f1b] p-6 rounded-2xl shadow-lg grid grid-cols-2 gap-6 md:gap-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-[#fbc63d] text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                      <p className="text-white text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-4 border-[#fbc63d]/30 z-10"></div>
              <div className="absolute -z-10 bottom-1/3 -right-8 w-16 h-16 bg-[#fbc63d] rounded-full blur-2xl opacity-20"></div>
            </div>
          </motion.div>

          {/* Content side */}
          <div className="w-full lg:w-1/2">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {subtitle}
            </motion.span>
            
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            
            <motion.div
              className="text-[#d9d9d9] text-lg space-y-4 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Values list */}
            {values.length > 0 && (
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#fbc63d] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{value.title}</h3>
                      <p className="text-sm text-[#d9d9d9]">{value.description}</p>
                    </div>
                  </div>
                ))}
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
                  <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
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
