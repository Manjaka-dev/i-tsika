import nodemailer from 'nodemailer';
import { mailConfig, RECIPIENT_EMAIL } from './mail-config';

// Création du transporteur d'email
const transporter = nodemailer.createTransport(mailConfig);

/**
 * Vérifie que le transporteur est correctement configuré
 */
export const verifyMailConnection = async () => {
  try {
    const verification = await transporter.verify();
    console.log('Connexion au serveur email réussie:', verification);
    return verification;
  } catch (error) {
    console.error('Erreur lors de la connexion au serveur email:', error);
    throw error;
  }
};

/**
 * Envoie un email via le formulaire de contact
 */
export const sendContactEmail = async (name: string, email: string, message: string) => {
  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
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
    console.log('Email envoyé: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi'
    };
  }
};

/**
 * Envoie un email via le formulaire de demande de devis
 */
export const sendQuoteEmail = async (
  projectName: string,
  domain: string,
  email: string,
  description: string,
  budget: string
) => {
  try {
    const mailOptions = {
      from: email,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Nouvelle demande de devis : ${projectName}`,
      text: `
        Nom du projet: ${projectName}
        Domaine: ${domain}
        Email de contact: ${email}
        Budget: ${budget}
        
        Description du projet:
        ${description}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouvelle demande de devis</h2>
          
          <div style="margin-bottom: 20px;">
            <p><strong>Nom du projet:</strong> ${projectName}</p>
            <p><strong>Domaine:</strong> ${domain}</p>
            <p><strong>Email de contact:</strong> ${email}</p>
            <p><strong>Budget estimé:</strong> ${budget}</p>
          </div>
          
          <div>
            <p><strong>Description du projet:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${description.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Cette demande a été envoyée depuis le formulaire de devis de votre site web.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de demande de devis envoyé: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de devis:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi'
    };
  }
};
