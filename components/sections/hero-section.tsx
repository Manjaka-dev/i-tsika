"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imagePosition?: "left" | "right";
  backgroundImage?: string;
  showPattern?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  imagePosition = "right",
  backgroundImage = "/hero.webp",
  showPattern = true,
}: HeroSectionProps) {
  // Utiliser le hook pour détecter si l'affichage est mobile
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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[#070602]/80"></div>
      </div>

      {/* Pattern overlay (optional) */}
      {showPattern && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-28">
        <div
          className={`flex flex-col ${
            isMobile
              ? "items-center text-center"
              : imagePosition === "left"
              ? "md:flex-row-reverse"
              : "md:flex-row"
          } items-center gap-8 md:gap-16`}
        >
          {/* Text content */}
          <motion.div
            className={`flex-1 ${isMobile ? "max-w-full" : ""}`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span
              className="inline-block text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3"
              variants={itemVariants}
            >
              {subtitle}
            </motion.span>
            <motion.h1
              className={`${isMobile ? "text-4xl" : "text-5xl md:text-6xl lg:text-7xl"} font-bold mb-6 leading-tight`}
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-base md:text-lg max-w-md mb-8 leading-relaxed"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href={ctaLink}>
                <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-6 py-4 md:px-8 md:py-6 rounded-full text-base font-medium transition-all duration-300">
                  {ctaText}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image or animation side (optional) - Hidden on very small screens */}
          {(!isMobile || (isMobile && window.innerWidth > 480)) && (
            <motion.div
              className="flex-1 w-full max-w-md relative mt-8 md:mt-0"
              initial={{ opacity: 0, x: imagePosition === "left" ? -40 : 40 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.3 },
              }}
            >
              <div className="rounded-2xl bg-[#201f1b]/80 p-4 md:p-6 backdrop-blur-sm border border-[#fbc63d]/10">
                <div className="overflow-hidden rounded-xl aspect-[4/3] relative flex items-center justify-center">
                  {/* Logo image */}
                  <Image
                    src="/logo.webp"
                    alt="I-Tsika Logo"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#fbc63d] rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#fbc63d] rounded-full opacity-20 blur-xl"></div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            ></motion.div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
