import { NextRequest, NextResponse } from 'next/server';
import { verifyMailConnection } from '@/lib/mail-service';
import nodemailer from 'nodemailer';
import { mailConfig, RECIPIENT_EMAIL, SENDER_EMAIL } from '@/lib/mail-config';

export async function POST(request: NextRequest) {
  try {
    // Tester la connexion email avec les paramètres actuels
    await verifyMailConnection();
    
    // Envoyer un email de test
    const emailResult = await sendTestEmail();
    
    // Retourner le résultat
    if (emailResult.success) {
      return NextResponse.json({ 
        success: true,
        message: 'Email de test envoyé avec succès'
      });
    } else {
      return NextResponse.json({ 
        success: false,
        error: emailResult.error
      }, { status: 500 });
    }
    
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error?.message || 'Erreur lors de l\'envoi de l\'email de test'
    }, { status: 500 });
  }
}

/**
 * Fonction pour envoyer un email de test
 */
async function sendTestEmail() {
  try {
    // Utiliser le transporteur importé au lieu d'en créer un nouveau
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'noreply@i-tsika.site',
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Options de l'email
    const mailOptions = {
      from: `"Test Email" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject: 'Test de fonctionnement du service d\'email',
      text: 'Si vous recevez ce message, votre service d\'email fonctionne correctement.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4;">
          <h2 style="color: #333;">Test du service d'email</h2>
          <p>Si vous recevez ce message, votre service d'email fonctionne correctement.</p>
          <hr style="border: none; border-top: 1px solid #e4e4e4; margin: 20px 0;">
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <p><strong>Configuration utilisée :</strong></p>
            <ul>
              <li>Serveur: ${mailConfig.host}:${mailConfig.port}</li>
              <li>Sécurisé: ${mailConfig.secure ? 'Oui' : 'Non'}</li>
              <li>Utilisateur: ${mailConfig.auth.user}</li>
              <li>Adresse d'envoi: ${SENDER_EMAIL}</li>
              <li>Adresse de réception: ${RECIPIENT_EMAIL}</li>
              <li>Date du test: ${new Date().toLocaleString('fr-FR')}</li>
            </ul>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Ce message a été envoyé automatiquement depuis la page de test de votre site web.
          </p>
        </div>
      `
    };
    
    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    
    return { success: true, info };
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}
