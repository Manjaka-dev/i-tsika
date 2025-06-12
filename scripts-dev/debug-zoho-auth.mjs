// scripts/debug-zoho-auth.mjs
// Script pour déboguer la connexion SMTP à Zoho Mail

import nodemailer from 'nodemailer';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Pour exécuter des commandes shell
const exec = promisify(execCallback);

// Configuration des variables d'environnement
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Récupérer les valeurs des variables d'environnement
const {
  EMAIL_HOST = 'smtppro.zoho.com',
  EMAIL_PORT = '465',
  EMAIL_SECURE = 'true', 
  EMAIL_USER = 'noreply@i-tsika.site',
  EMAIL_PASS = '' // Le mot de passe sera pris depuis .env.local
} = process.env;

console.log('=== Diagnostic de connexion SMTP Zoho Mail ===');

// 1. Vérifier la résolution DNS pour le serveur SMTP
async function checkDNS() {
  try {
    console.log('\n1. Vérification DNS pour', EMAIL_HOST);
    const { stdout } = await exec(`dig ${EMAIL_HOST} +short`);
    console.log('Résultats DNS:');
    console.log(stdout || 'Aucune adresse IP trouvée');
    return true;
  } catch (error) {
    console.log('Erreur lors de la vérification DNS:', error.message);
    return false;
  }
}

// 2. Vérifier l'accessibilité du port SMTP
async function checkPort() {
  try {
    console.log('\n2. Vérification de l\'accessibilité du port', EMAIL_PORT);
    const { stdout, stderr } = await exec(`nc -zv -w5 ${EMAIL_HOST} ${EMAIL_PORT} 2>&1 || echo "Échec de la connexion"`);
    console.log(stdout || stderr || 'Port inaccessible');
    return !stdout.includes('Échec') && !stderr.includes('Échec');
  } catch (error) {
    console.log('Erreur lors de la vérification du port:', error.message);
    return false;
  }
}

// 3. Tester l'authentification SMTP
async function testSMTPAuth(plainPassword = null) {
  const password = plainPassword || EMAIL_PASS;
  
  if (!password || password.trim() === '') {
    console.log('\n3. Erreur: Mot de passe manquant');
    return false;
  }
  
  console.log('\n3. Test d\'authentification SMTP avec', EMAIL_USER);
  console.log('   Serveur:', EMAIL_HOST);
  console.log('   Port:', EMAIL_PORT);
  console.log('   Secure:', EMAIL_SECURE);
  
  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT),
      secure: EMAIL_SECURE === 'true',
      auth: {
        user: EMAIL_USER,
        pass: password
      },
      debug: true // Activer les logs de débogage
    });
    
    console.log('Tentative de connexion...');
    const result = await transporter.verify();
    console.log('Authentification réussie!', result);
    return true;
  } catch (error) {
    console.log('Échec d\'authentification:', error.message);
    if (error.message.includes('535')) {
      console.log('\nConseil: L\'erreur 535 indique généralement un problème d\'identifiants.');
      console.log('- Vérifiez que le mot de passe est correct');
      console.log('- Pour Zoho Mail, vous devrez peut-être utiliser un mot de passe d\'application');
      console.log('- Vérifiez que les accès SMTP/IMAP sont activés dans votre compte Zoho');
    }
    return false;
  }
}

// 4. Demander un mot de passe manuellement pour tester
async function testWithManualPassword() {
  console.log('\n4. Test avec saisie manuelle de mot de passe');
  console.log('Pour tester avec un mot de passe différent, veuillez le saisir ci-dessous:');
  
  process.stdout.write('Mot de passe pour ' + EMAIL_USER + ': ');
  
  // Pour lire l'entrée utilisateur
  const readPassword = () => {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      
      let password = '';
      stdin.on('data', function handler(ch) {
        if (ch === '\r' || ch === '\n') {
          console.log('');
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener('data', handler);
          resolve(password);
          return;
        } else if (ch === '\u0003') {
          // Ctrl+C
          process.exit();
        } else if (ch === '\u007F') {
          // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b'); // Effacer un caractère
          }
        } else {
          password += ch;
          process.stdout.write('*');
        }
      });
    });
  };
  
  const manualPassword = await readPassword();
  if (manualPassword) {
    return await testSMTPAuth(manualPassword);
  }
  
  return false;
}

// Exécuter tous les tests
async function runAllTests() {
  await checkDNS();
  const portAccessible = await checkPort();
  
  if (portAccessible) {
    const authSuccess = await testSMTPAuth();
    
    if (!authSuccess) {
      console.log('\nLe test d\'authentification a échoué. Voulez-vous essayer avec un mot de passe saisi manuellement? (O/n)');
      
      process.stdin.setEncoding('utf8');
      process.stdin.once('data', async (data) => {
        const input = data.trim().toLowerCase();
        if (input === '' || input === 'o' || input === 'oui' || input === 'y' || input === 'yes') {
          await testWithManualPassword();
        }
        process.exit();
      });
    } else {
      process.exit();
    }
  } else {
    process.exit(1);
  }
}

runAllTests();
