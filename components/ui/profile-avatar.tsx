"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileAvatarProps {
  name: string;
  src: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}

export default function ProfileAvatar({
  name,
  src,
  width = 200,
  height = 250,
  className = "",
  fallback = "/placeholder-user.jpg"
}: ProfileAvatarProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fonction pour obtenir l'extension du fichier
  const getFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    if (parts.length <= 1) return '';
    return parts[parts.length - 1].toLowerCase();
  };

  // Si l'image originale est en jpg, essayer d'utiliser la version webp
  const tryWebP = (imgSrc: string): string => {
    const ext = getFileExtension(imgSrc);
    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      return imgSrc.replace(`.${ext}`, '.webp');
    }
    return imgSrc;
  };

  // Source à utiliser (avec gestion d'erreur)
  const imageSrc = error ? fallback : tryWebP(src);

  // Gestion des erreurs
  const handleError = () => {
    console.warn(`Erreur de chargement pour l'image: ${src}`);
    
    // Si on a déjà essayé webp et que ça a échoué, essayer l'original
    if (imageSrc !== src && !error) {
      console.log('Tentative avec image originale...');
      setError(false); // On ne met pas error à true pour essayer l'original
      return;
    }
    
    setError(true);
  };

  // Fonction de gestion du chargement réussi
  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      {loading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}>
          <div className="w-1/2 h-1/2 rounded-full animate-pulse bg-gray-300 dark:bg-gray-600"></div>
        </div>
      )}
      <Image
        src={imageSrc}
        alt={`Photo de ${name}`}
        width={width}
        height={height}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoadComplete}
        priority={true}
      />
    </div>
  );
}
