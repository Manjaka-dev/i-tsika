/**
 * Configuration initiale de l'application
 * Ce fichier est importé par le serveur lors du démarrage de l'application
 */

import { logEmailConfigStatus, checkEmailConfig } from './env-check';

// Vérification des variables d'environnement au démarrage
if (process.env.NODE_ENV === 'development') {
  // Journal des variables d'environnement disponibles (sans valeurs sensibles)
  console.log('📊 Configuration du serveur I-Tsika');
  
  // Vérification de la configuration email
  logEmailConfigStatus();
}

// Exporter la fonction de vérification pour l'utiliser ailleurs si nécessaire
export const verifyEmailConfiguration = checkEmailConfig;
