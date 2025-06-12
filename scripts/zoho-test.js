// scripts/zoho-test.js
// Script simplifié pour tester la connexion à Zoho Mail

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// Configuration avec les valeurs en dur pour le test
const config = {
  host: 'smtppro.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@i-tsika.site',
    pass: process.env.EMAIL_PASS || 'E#gb7lzl'
  }
};

console.log('Tentative de connexion à Zoho Mail...');
console.log('Configuration:', {
  host: config.host,
  port: config.port,
  secure: config.secure,
  user: config.auth.user,
  pass: '********' // Masqué pour la sécurité
});

// Créer un transporteur et vérifier la connexion
const transporter = nodemailer.createTransport(config);

transporter.verify()
  .then(success => {
    console.log('Connexion réussie à Zoho Mail:', success);
    
    // Maintenant, essayons d'envoyer un email de test
    console.log('Tentative d\'envoi d\'un email de test...');
    
    return transporter.sendMail({
      from: `"Test Script" <noreply@i-tsika.site>`,
      to: 'contact@i-tsika.site',
      subject: 'Test de connexion Zoho Mail',
      text: 'Si vous recevez ce message, la connexion à Zoho Mail fonctionne correctement.',
      html: '<p>Si vous recevez ce message, la connexion à Zoho Mail fonctionne correctement.</p>'
    });
  })
  .then(info => {
    console.log('Email envoyé avec succès:', info.messageId);
  })
  .catch(error => {
    console.error('Erreur lors du test de connexion à Zoho Mail:', error);
    console.log('\nRecommandations:');
    console.log('1. Vérifiez que le mot de passe dans .env.local est correct');
    console.log('2. Vérifiez que les accès SMTP sont activés dans votre compte Zoho');
    console.log('3. Vérifiez si Zoho nécessite un mot de passe d\'application spécifique');
    console.log('4. Visitez le panneau d\'administration de Zoho pour vérifier les paramètres SMTP');
  });
