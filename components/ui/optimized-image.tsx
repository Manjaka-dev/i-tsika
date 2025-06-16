"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
  withPlaceholder?: boolean;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "custom";
  withBlur?: boolean;
};

/**
 * Composant d'image optimisé qui gère automatiquement:
 * - La conversion en WebP si disponible
 * - Le lazy loading intelligente
 * - Le responsive loading
 * - Les placeholders pendant le chargement
 * - Le fallback en cas d'erreur
 */
export default function OptimizedImage({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  withPlaceholder = false,
  aspectRatio = "auto",
  withBlur = false,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Vérifier si une version WebP existe et l'utiliser
  useEffect(() => {
    // Convertir automatiquement les extensions png, jpg, jpeg en webp si elles existent
    if (src.match(/\.(png|jpe?g)$/)) {
      const webpSrc = src.replace(/\.(png|jpe?g)$/, '.webp');
      
      // Vérifier si l'image WebP existe
      fetch(webpSrc, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            setImgSrc(webpSrc);
          }
        })
        .catch(() => {
          // En cas d'erreur, garder la source originale
        });
    }
  }, [src]);
  
  // Gérer les erreurs de chargement
  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };
  
  // Différents ratios d'aspect
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]", 
    custom: "",
  };
  
  return (
    <div className={cn(
      "relative overflow-hidden",
      aspectRatio !== "custom" && aspectRatioClasses[aspectRatio],
      className
    )}>
      {(withPlaceholder && isLoading) && (
        <div className="absolute inset-0 bg-gray-200/20 animate-pulse" />
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          withBlur && "blur-sm transition-all duration-500"
        )}
        onLoad={() => {
          setIsLoading(false);
          if (withBlur) {
            // Retire le flou après un court délai pour une transition plus fluide
            setTimeout(() => {
              const img = document.querySelector(`img[src="${imgSrc}"]`);
              if (img) {
                img.classList.remove("blur-sm");
              }
            }, 500);
          }
        }}
        onError={handleError}
        priority={priority}
        {...props}
      />
    </div>
  );
}
