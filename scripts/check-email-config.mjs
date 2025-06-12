/**
 * Script de vérification de la configuration email
 * Vous pouvez exécuter ce script avec "npm run check:email"
 */

import { checkEmailConfig, logEmailConfigStatus } from '../lib/env-check';

console.log('🔍 Vérification de la configuration email...\n');

// Exécuter la vérification
logEmailConfigStatus();

// Afficher un résumé
const { isConfigured, missingVars } = checkEmailConfig();

if (isConfigured) {
  console.log('\n✅ La configuration email est complète!');
  console.log('   Vous pouvez tester l\'envoi d\'emails via les formulaires du site.');
} else {
  console.log('\n❌ Configuration email incomplète!');
  console.log(`   Variables manquantes: ${missingVars.join(', ')}`);
  console.log('   Veuillez créer ou mettre à jour le fichier .env.local avec ces variables.');
  process.exit(1);
}
