/**
 * Configuration initiale de l'application
 * Ce fichier est importé par le serveur lors du démarrage de l'application
 */

import { logEmailConfigStatus, checkEmailConfig } from './env-check';

// Vérification des variables d'environnement au démarrage uniquement en développement
if (process.env.NODE_ENV === 'development') {
  // Vérification de la configuration email
  logEmailConfigStatus();
}

// Exporter la fonction de vérification pour l'utiliser ailleurs si nécessaire
export const verifyEmailConfiguration = checkEmailConfig;
