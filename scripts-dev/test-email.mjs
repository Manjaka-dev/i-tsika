// scripts/test-email.mjs
// Script pour tester l'envoi d'un email avec les paramètres Zoho Mail

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

// Configuration des variables d'environnement
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Fonction pour lire et afficher le contenu du fichier .env.local
function readEnvFile() {
  try {
    const envPath = resolve(__dirname, '../.env.local');
    const envContent = readFileSync(envPath, 'utf8');
    console.log('Contenu du fichier .env.local:');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      // Masquer les mots de passe dans l'affichage
      if (line.includes('PASS=')) {
        const parts = line.split('=');
        console.log(`${parts[0]}=******`);
      } else {
        console.log(line);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier .env.local:', error);
  }
}

// Afficher le contenu du fichier .env.local
readEnvFile();

// Configuration du transporteur
console.log('\nConfiguration du transporteur:');
const config = {
  host: process.env.EMAIL_HOST || 'smtppro.zoho.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE !== 'false',
  auth: {
    user: process.env.EMAIL_USER || 'noreply@i-tsika.site',
    pass: process.env.EMAIL_PASS
  }
};
console.log({
  host: config.host,
  port: config.port,
  secure: config.secure,
  user: config.auth.user,
  pass: '******'
});

// Création du transporteur
const transporter = nodemailer.createTransport(config);

// Test de connexion au serveur SMTP
async function testConnection() {
  try {
    console.log('\nTest de connexion au serveur SMTP...');
    const verification = await transporter.verify();
    console.log('Connexion au serveur SMTP réussie:', verification);
    return true;
  } catch (error) {
    console.error('Erreur lors de la connexion au serveur SMTP:', error);
    return false;
  }
}

// Envoi d'un email de test
async function sendTestEmail() {
  try {
    console.log('\nEnvoi d\'un email de test...');
    
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'contact@i-tsika.site';
    const senderEmail = process.env.SENDER_EMAIL || 'noreply@i-tsika.site';
    
    const mailOptions = {
      from: `"Test Script" <${senderEmail}>`,
      to: recipientEmail,
      subject: 'Test depuis script Node.js',
      text: 'Si vous recevez ce message, votre service d\'email fonctionne correctement.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Test d'envoi d'email</h2>
          <p>Si vous recevez ce message, votre service d'email fonctionne correctement.</p>
          <p>Date et heure du test: ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès: %s', info.messageId);
    console.log('Aperçu:', nodemailer.getTestMessageUrl(info));
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      success: false,
      error: error.message || String(error)
    };
  }
}

// Exécution des tests
async function runTests() {
  const connectionSuccess = await testConnection();
  if (connectionSuccess) {
    await sendTestEmail();
  }
  console.log('\nTests terminés.');
}

runTests();
