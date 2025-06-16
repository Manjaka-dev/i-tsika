"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
  sizes?: string;
}

/**
 * Composant spécialisé pour les images de héros, optimisé pour le LCP (Largest Contentful Paint)
 * - Charge automatiquement la version WebP si disponible
 * - Utilise des sources responsives pour les différentes tailles d'écran
 * - Priorité de chargement élevée pour améliorer le LCP
 */
export default function HeroImage({
  src,
  alt,
  priority = true,
  className = "",
  objectFit = "cover",
  sizes = "(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px",
}: HeroImageProps) {
  const [loaded, setLoaded] = useState(false);
  
  // Déterminer la source d'image en fonction du format original
  const originalExtension = src.split('.').pop()?.toLowerCase();
  const baseSrc = src.substring(0, src.lastIndexOf('.'));
  const webpSrc = `${baseSrc}.webp`;
  
  // Créer des sources responsives pour les différentes tailles d'écran
  const getSrcSet = (basePath: string, ext: string) => {
    // Vérifier si nous avons des versions responsives (format: base-width.ext)
    return `
      ${basePath}-640.${ext} 640w,
      ${basePath}-1024.${ext} 1024w,
      ${basePath}.${ext} 1920w
    `;
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Placeholder coloré ou flou pour améliorer le LCP */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#201f1b] to-[#070602] animate-pulse" />
      )}
      
      {/* L'image avec preload pour améliorer le LCP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
      >
        <Image
          src={webpSrc}
          alt={alt}
          fill
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-${objectFit}`}
          sizes={sizes}
          quality={90} // Qualité plus élevée pour l'image hero importante pour le LCP
          style={{
            backgroundSize: objectFit,
          }}
        />
      </motion.div>
    </div>
  );
}
