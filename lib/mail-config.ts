/**
 * Configuration du service de messagerie
 * Cette configuration utilise les variables d'environnement pour sécuriser les informations sensibles
 */

export interface MailConfigType {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized?: boolean;
    minVersion?: string;
  };
}

/**
 * Configuration du service d'email basée sur les variables d'environnement
 * Pour la sécurité, aucune donnée sensible n'est stockée en dur dans le code
 */
export const mailConfig: MailConfigType = {
  host: process.env.EMAIL_HOST || 'smtppro.zoho.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE !== 'false', // Par défaut à true pour le port 465
  auth: {
    user: process.env.EMAIL_USER || 'noreply@i-tsika.site',
    pass: process.env.EMAIL_PASS || '',
  },
  // Options spécifiques pour Zoho Mail
  tls: {
    rejectUnauthorized: true, // Valider le certificat SSL
    minVersion: 'TLSv1.2' // Utiliser au moins TLS 1.2
  }
};

/**
 * Adresse email de réception des messages
 * Cette adresse est utilisée comme destinataire des emails envoyés via les formulaires
 */
export const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'contact@i-tsika.site';

/**
 * Adresse email d'envoi des messages
 * Cette adresse est utilisée comme expéditeur des emails envoyés automatiquement
 */
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'noreply@i-tsika.site';
