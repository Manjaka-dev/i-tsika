"use client";

import { useEffect } from "react";

/**
 * Ce composant précharge les ressources critiques comme les webfonts, images et CSS
 * pour améliorer les performances de chargement et le LCP
 */
export default function ResourcePreloader() {
  useEffect(() => {
    // Précharger les images critiques
    const criticalImages = [
      '/logo.webp',
      '/hero.webp',
      '/hero-1024.webp',
    ];

    // Précharger les images
    criticalImages.forEach(image => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });

    // Précharger les webfonts
    const fontUrls: string[] = [
      // Ajoutez les URLs de vos polices ici
    ];

    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = url;
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
