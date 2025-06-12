'use client';

import { useEffect } from 'react';

/**
 * Composant pour initialiser l'application
 * Ce composant est utilisé pour exécuter le code d'initialisation côté client
 */
export default function AppInitializer() {
  useEffect(() => {
    // Dans un environnement de développement, nous pouvons afficher des messages de débogage
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Initialisation de l\'application I-Tsika');
      
      // Vérification des variables d'environnement côté client
      // Note: Ces variables doivent être exposées via next.config.mjs avec le préfixe NEXT_PUBLIC_
      const publicEnvVars = Object.keys(process.env)
        .filter(key => key.startsWith('NEXT_PUBLIC_'))
        .reduce((acc, key) => {
          acc[key] = process.env[key];
          return acc;
        }, {} as Record<string, string | undefined>);
        
      console.log('📊 Variables d\'environnement publiques disponibles:', 
        Object.keys(publicEnvVars).length > 0 
          ? Object.keys(publicEnvVars).join(', ') 
          : 'Aucune'
      );
    }
    
    // Cette partie ne s'exécute qu'une seule fois
    return () => {};
  }, []);

  // Ce composant ne rend rien visuellement
  return null;
}
