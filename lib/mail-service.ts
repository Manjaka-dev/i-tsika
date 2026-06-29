import nodemailer from 'nodemailer';
import { mailConfig, RECIPIENT_EMAIL, SENDER_EMAIL } from './mail-config';

// Création du transporteur d'email avec les paramètres Zoho Mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.zoho.com',
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'noreply@i-tsika.site',
    pass: process.env.EMAIL_PASS?.replace(/\s+/g, '') // Retire les espaces si Zoho les a rajoutés
  }
});

/**
 * Vérifie que le transporteur est correctement configuré
 */
export const verifyMailConnection = async () => {
  try {
    const verification = await transporter.verify();
    console.log('Connexion au serveur email réussie');
    return verification;
  } catch (error: any) {
    console.error('Erreur lors de la connexion au serveur email:', error.message || 'Erreur inconnue');
    
    if (error.message && error.message.includes('Authentication')) {
      console.error('Problème d\'authentification détecté. Vérifiez vos identifiants Zoho Mail.');
    }
    
    throw error;
  }
};

/**
 * Envoie un email via le formulaire de contact
 */
export const sendContactEmail = async (name: string, email: string, message: string) => {
  try {
    const mailOptions = {
      from: `"Site I-Tsika" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Nouveau message de contact de ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi'
    };
  }
};

/**
 * Interface pour les données du formulaire de devis multi-étapes
 */
interface QuoteData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  description: string;
  features: string[];
  budget: string;
  deadline: string;
  hasSpecification: string;
}

/**
 * Envoie un email via le formulaire de demande de devis (multi-étapes)
 */
export const sendQuoteEmail = async (data: QuoteData) => {
  try {
    const featuresHtml = data.features.length > 0
      ? `<ul style="margin: 0; padding-left: 20px;">${data.features.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}</ul>`
      : '<span style="color: #999;">Aucune fonctionnalité spécifique sélectionnée</span>';

    const mailOptions = {
      from: `"Site I-Tsika" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `Nouvelle demande de devis — ${data.projectType}`,
      text: `
Nouvelle demande de devis

INFORMATIONS DE CONTACT
Nom: ${data.lastName} ${data.firstName}
Email: ${data.email}
Téléphone: ${data.phone || 'Non renseigné'}
Entreprise: ${data.company || 'Non renseignée'}

PROJET
Type: ${data.projectType}
Description: ${data.description}
Fonctionnalités: ${data.features.length > 0 ? data.features.join(', ') : 'Aucune sélectionnée'}

BUDGET & DÉLAI
Budget estimé: ${data.budget}
Délai souhaité: ${data.deadline}
Cahier des charges: ${data.hasSpecification}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #070602; padding: 30px; text-align: center;">
            <h1 style="color: #fbc63d; margin: 0; font-size: 24px;">Nouvelle demande de devis</h1>
            <p style="color: #d9d9d9; margin: 10px 0 0 0; font-size: 14px;">Reçue depuis le formulaire en ligne</p>
          </div>
          
          <div style="padding: 30px;">
            <!-- Contact -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #fbc63d; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #fbc63d; padding-bottom: 8px;">
                Informations de contact
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 140px;">Nom complet</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold;">${data.lastName} ${data.firstName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${data.email}" style="color: #0066cc;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Téléphone</td>
                  <td style="padding: 8px 0; color: #333;">${data.phone || '<span style="color: #999;">Non renseigné</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Entreprise</td>
                  <td style="padding: 8px 0; color: #333;">${data.company || '<span style="color: #999;">Non renseignée</span>'}</td>
                </tr>
              </table>
            </div>

            <!-- Projet -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #fbc63d; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #fbc63d; padding-bottom: 8px;">
                Le projet
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 140px;">Type de projet</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold;">${data.projectType}</td>
                </tr>
              </table>
              <div style="margin-top: 12px;">
                <p style="color: #666; margin: 0 0 8px 0;">Description :</p>
                <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; border-left: 3px solid #fbc63d; color: #333; line-height: 1.6;">
                  ${data.description.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div style="margin-top: 12px;">
                <p style="color: #666; margin: 0 0 8px 0;">Fonctionnalités souhaitées :</p>
                ${featuresHtml}
              </div>
            </div>

            <!-- Budget & Délai -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #fbc63d; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #fbc63d; padding-bottom: 8px;">
                Budget & Délai
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 140px;">Budget estimé</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold;">${data.budget}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Délai souhaité</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold;">${data.deadline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Cahier des charges</td>
                  <td style="padding: 8px 0; color: #333;">${data.hasSpecification}</td>
                </tr>
              </table>
            </div>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              Cette demande a été envoyée depuis le formulaire de devis du site <a href="https://www.i-tsika.site" style="color: #fbc63d;">i-tsika.site</a>
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi'
    };
  }
};
