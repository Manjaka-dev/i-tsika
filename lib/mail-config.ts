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
}

/**
 * Configuration du service d'email basée sur les variables d'environnement
 * Pour la sécurité, aucune donnée sensible n'est stockée en dur dans le code
 */
export const mailConfig: MailConfigType = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

/**
 * Adresse email de réception des messages
 * Cette adresse est utilisée comme destinataire des emails envoyés via les formulaires
 */
export const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'destinataire@example.com';
