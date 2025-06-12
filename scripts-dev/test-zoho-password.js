#!/usr/bin/env node
// scripts/test-zoho-password.js
// Outil pour tester rapidement un mot de passe Zoho Mail

const nodemailer = require('nodemailer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration Zoho Mail
const config = {
  host: 'smtppro.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@i-tsika.site',
    pass: '' // Sera demandé à l'utilisateur
  }
};

// Fonction pour tester la connexion
async function testConnection(password) {
  const transporter = nodemailer.createTransport({
    ...config,
    auth: {
      user: config.auth.user,
      pass: password
    }
  });

  try {
    console.log('\nTentative de connexion à Zoho Mail...');
    const result = await transporter.verify();
    console.log('✅ Connexion réussie! La configuration fonctionne correctement.');
    return true;
  } catch (error) {
    console.error('❌ Échec de la connexion:');
    console.error(`   ${error.message}`);
    return false;
  }
}

// Fonction pour envoyer un email de test
async function sendTestEmail(password) {
  const transporter = nodemailer.createTransport({
    ...config,
    auth: {
      user: config.auth.user,
      pass: password
    }
  });

  try {
    console.log('\nEnvoi d\'un email de test...');
    const info = await transporter.sendMail({
      from: `"Test Script" <${config.auth.user}>`,
      to: 'contact@i-tsika.site',
      subject: 'Test de connexion Zoho Mail',
      text: 'Si vous recevez ce message, la connexion à Zoho Mail fonctionne correctement.',
      html: '<p>Si vous recevez ce message, la connexion à Zoho Mail fonctionne correctement.</p>'
    });
    
    console.log('✅ Email envoyé avec succès:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Échec de l\'envoi d\'email:');
    console.error(`   ${error.message}`);
    return false;
  }
}

// Fonction principale
async function run() {
  console.log('======= Test d\'authentification Zoho Mail =======');
  console.log('Cet outil va tester la connexion à Zoho Mail avec');
  console.log(`l'adresse ${config.auth.user}\n`);
  
  rl.question('Entrez le mot de passe Zoho Mail à tester: ', async (password) => {
    if (!password.trim()) {
      console.error('❌ Aucun mot de passe fourni. Opération annulée.');
      rl.close();
      return;
    }
    
    const connectionSuccess = await testConnection(password);
    
    if (connectionSuccess) {
      rl.question('\nVoulez-vous envoyer un email de test? (o/N): ', async (answer) => {
        if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'oui') {
          await sendTestEmail(password);
        }
        
        console.log('\n✏️ Si cette configuration fonctionne, ajoutez ce mot de passe à votre fichier .env.local:');
        console.log(`EMAIL_PASS=${password}`);
        
        rl.close();
      });
    } else {
      console.log('\n📋 Recommandations:');
      console.log('1. Vérifiez que le mot de passe est correct');
      console.log('2. Si vous utilisez l\'authentification à deux facteurs dans Zoho, créez un mot de passe d\'application');
      console.log('3. Vérifiez que l\'accès SMTP est activé dans votre compte Zoho Mail');
      console.log('4. Consultez docs/zoho-auth-troubleshooting.md pour plus d\'informations');
      
      rl.close();
    }
  });
}

// Lancer le script
run();
