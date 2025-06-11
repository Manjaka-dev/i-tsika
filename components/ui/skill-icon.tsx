"use client";

import { useState } from "react";
import Image from "next/image";
import { getIconByName } from "@/lib/skill-icons";

interface SkillIconProps {
  name: string;
  logo: string;
  size?: number;
  className?: string;
  withTooltip?: boolean;
}

export default function SkillIcon({ name, logo, size = 20, className = "", withTooltip = false }: SkillIconProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fonction pour extraire le nom du fichier à partir de l'URL ou du chemin
  const getIconNameFromPath = (path: string): string => {
    // Essayer d'extraire juste le nom du fichier sans extension
    const match = path.match(/\/([^/]+)\.[^.]+$/);
    if (match) return match[1];
    
    // Si l'URL contient devicon, extraire le nom de l'icône
    const deviconMatch = path.match(/devicon\/icons\/([^/]+)\//);
    if (deviconMatch) return deviconMatch[1];
    
    // Si pas de correspondance, retourner le chemin complet
    return path;
  };

  // Construction du chemin de l'icône locale
  const iconName = getIconNameFromPath(logo);
  const localIconPath = `/icons/${iconName}.svg`;
  
  // Chemin de l'icône de fallback
  const fallbackIcon = "/logo.webp";

  // Fonction de gestion d'erreur
  const handleError = () => {
    console.warn(`Erreur de chargement pour l'icône: ${logo}`);
    setError(true);
  };
  
  // Fonction de gestion du chargement réussi
  const handleLoadComplete = () => {
    setLoading(false);
  };

  // Déterminer l'URL à utiliser - essayer d'abord avec le mapping, puis avec le logo fourni
  const mappedIcon = getIconByName(name);
  const iconSrc = error ? fallbackIcon : (mappedIcon !== fallbackIcon ? mappedIcon : (logo.startsWith("/") ? logo : localIconPath));
  
  const imageComponent = (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
          <div className="w-3/4 h-3/4 rounded-full animate-pulse bg-gray-300 dark:bg-gray-600"></div>
        </div>
      )}
      <Image
        src={iconSrc}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={`${className} ${error ? "opacity-50" : "opacity-90"} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoadComplete}
      />
    </div>
  );
  
  // Si withTooltip est true, envelopper l'image dans une div avec un tooltip
  if (withTooltip) {
    return (
      <div className="group relative">
        {imageComponent}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {name}
        </div>
      </div>
    );
  }
  
  return imageComponent;
}
