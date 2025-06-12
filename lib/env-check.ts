/**
 * Fonctions d'utilitaire pour vérifier les variables d'environnement
 * Ce fichier fournit des fonctions pour valider la configuration des services
 */

/**
 * Vérifie si les variables d'environnement nécessaires sont définies
 * @returns Un objet contenant le statut de la vérification
 */
export function checkEmailConfig(): { 
  isConfigured: boolean; 
  missingVars: string[];
  configSummary: {
    host: string;
    port: string;
    user: string;
    recipientConfigured: boolean;
    senderConfigured: boolean;
  }
} {
  // Liste des variables d'environnement obligatoires
  const requiredVars = [
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];

  // Vérifier les variables manquantes
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  // Résumé de la configuration (sans afficher les mots de passe)
  const configSummary = {
    host: process.env.EMAIL_HOST || '(non configuré)',
    port: process.env.EMAIL_PORT || '(non configuré)',
    user: process.env.EMAIL_USER || '(non configuré)',
    recipientConfigured: Boolean(process.env.RECIPIENT_EMAIL),
    senderConfigured: Boolean(process.env.SENDER_EMAIL)
  };

  return {
    isConfigured: missingVars.length === 0,
    missingVars,
    configSummary
  };
}

/**
 * Affiche un message de log sur la configuration des emails
 * Utilisé au démarrage de l'application pour faciliter le débogage
 */
export function logEmailConfigStatus(): void {
  const { isConfigured, missingVars } = checkEmailConfig();
  
  if (isConfigured) {
    console.log('Configuration email : OK');
  } else {
    console.warn('Configuration email incomplète!');
    console.warn(`Variables manquantes: ${missingVars.join(', ')}`);
  }
}
