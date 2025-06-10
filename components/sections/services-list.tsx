"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-[#d9d9d9] text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Services grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-[#201f1b]/40 p-8 rounded-2xl transition-all duration-300 hover:bg-[#201f1b] hover:shadow-lg hover:shadow-[#fbc63d]/10 hover:-translate-y-1 group"
              variants={itemVariants}
            >
              <div className="bg-[#fbc63d]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Image 
                  src={service.icon} 
                  alt={service.title}
                  width={32} 
                  height={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-[#fbc63d] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#d9d9d9] mb-6 text-sm leading-relaxed">
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

        {/* CTA button */}
        {showCTA && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href={ctaLink}>
              <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
