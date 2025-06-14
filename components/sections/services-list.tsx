"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile, useScreenSize } from "@/hooks/use-mobile";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesListProps {
  title?: string;
  subtitle?: string;
  description?: string;
  services: Service[];
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export default function ServicesList({
  title = "Nos services",
  subtitle = "Ce que nous proposons",
  description = "Découvrez notre gamme complète de services web personnalisés pour répondre à tous vos besoins numériques.",
  services,
  showCTA = true,
  ctaText = "Voir tous nos services",
  ctaLink = "/services",
  className = "",
}: ServicesListProps) {
  // Détecter si l'affichage est mobile
  const isMobile = useIsMobile();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Utiliser un layout différent selon que l'utilisateur est sur mobile ou non
  const screenSize = useScreenSize();
  const isSmallMobile = screenSize === "xs";
  
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span
            className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {subtitle}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-[#d9d9d9] text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Services grid - layout optimisé selon la taille d'écran */}
        {isMobile ? (
          // Mobile: Slider / Carousel compact
          <div className="mb-12 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory">
            <div className="flex space-x-4 min-w-max">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="snap-start w-[85vw] max-w-xs flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="bg-[#201f1b] h-full rounded-xl p-6 flex flex-col">
                    <div className="mb-4 flex items-center">
                      <div className="bg-[#fbc63d]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <Image src={service.icon} alt={service.title} width={24} height={24} />
                      </div>
                      <span className="text-xs text-[#fbc63d] font-mono">SERVICE {(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-[#d9d9d9] mb-6 text-sm flex-grow">{service.description}</p>
                    <Link href={service.link} className="text-[#fbc63d] hover:underline text-sm flex items-center">
                      En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop: Grid classique
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`bg-[#201f1b]/40 ${isMobile ? "p-6" : "p-8"} rounded-2xl transition-all duration-300 hover:bg-[#201f1b] hover:shadow-lg hover:shadow-[#fbc63d]/10 hover:-translate-y-1 group`}
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#fbc63d]/10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mr-4 md:mb-6 md:mr-0">
                  <Image 
                    src={service.icon} 
                    alt={service.title}
                    width={isMobile ? 24 : 32} 
                    height={isMobile ? 24 : 32}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {isMobile && (
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#fbc63d] transition-colors">
                    {service.title}
                  </h3>
                )}
              </div>
              
              {!isMobile && (
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-[#fbc63d] transition-colors">
                  {service.title}
                </h3>
              )}
              
              <p className="text-[#d9d9d9] mb-4 md:mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <Link 
                href={service.link}
                className="inline-flex items-center text-[#fbc63d] hover:text-[#ffbb00] transition-colors text-sm font-medium"
              >
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        )}
        
        {/* Indicateurs de défilement mobile (points) */}
        {isMobile && (
          <div className="flex justify-center items-center space-x-2 my-4">
            {services.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-[#fbc63d]/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileInView={{
                  scale: [1, 1.3, 1],
                  transition: { repeat: 0, duration: 0.5, delay: index * 0.1 }
                }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        )}

        {/* CTA button */}
        {showCTA && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href={ctaLink}>
              <Button className={`bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 ${isMobile ? 'w-full' : ''} px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm font-medium transition-all duration-300`}>
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
