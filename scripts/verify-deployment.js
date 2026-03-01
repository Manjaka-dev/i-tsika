#!/usr/bin/env node

/**
 * Script de vérification avant déploiement
 * Vérifie que toutes les dépendances et configurations sont correctes
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification du projet avant déploiement...\n');

let errors = [];
let warnings = [];

// Vérifier package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

  // Vérifier que bcrypt n'est pas présent
  if (packageJson.dependencies?.bcrypt || packageJson.devDependencies?.bcrypt) {
    errors.push('❌ bcrypt trouvé dans package.json - doit être remplacé par bcryptjs');
  }

  // Vérifier que bcryptjs est présent
  if (!packageJson.dependencies?.bcryptjs) {
    errors.push('❌ bcryptjs manquant dans les dépendances');
  }

  console.log('✅ package.json vérifié');
} catch (error) {
  errors.push('❌ Erreur lors de la lecture de package.json');
}

// Vérifier les fichiers d'authentification
const authFiles = [
  './app/api/auth/[...nextauth]/route.ts',
  './app/api/auth/register/route.ts'
];

authFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    if (content.includes("from 'bcrypt'")) {
      errors.push(`❌ Import bcrypt trouvé dans ${file} - doit être bcryptjs`);
    }

    if (content.includes("from 'bcryptjs'")) {
      console.log(`✅ ${file} utilise correctement bcryptjs`);
    }
  } catch (error) {
    warnings.push(`⚠️  Impossible de vérifier ${file}`);
  }
});

// Vérifier la configuration Vercel
try {
  const vercelConfig = fs.readFileSync('./vercel.json', 'utf8');
  console.log('✅ Configuration Vercel présente');
} catch (error) {
  warnings.push('⚠️  vercel.json manquant - recommandé pour optimiser le déploiement');
}

// Vérifier le build
console.log('\n🔨 Test du build...');
const { execSync } = require('child_process');

try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build réussi');
} catch (error) {
  errors.push('❌ Échec du build - vérifiez les erreurs TypeScript');
}

// Résumé
console.log('\n📋 RÉSUMÉ DE VÉRIFICATION\n');

if (errors.length === 0) {
  console.log('🎉 Aucune erreur détectée ! Le projet est prêt pour le déploiement.');
} else {
  console.log('❌ ERREURS À CORRIGER:');
  errors.forEach(error => console.log(`   ${error}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️  AVERTISSEMENTS:');
  warnings.forEach(warning => console.log(`   ${warning}`));
}

console.log('\n📚 Pour déployer sur Vercel:');
console.log('   1. Connectez votre repo GitHub à Vercel');
console.log('   2. Ajoutez les variables d\'environnement requises');
console.log('   3. Déployez !');
console.log('\n📖 Consultez VERCEL_DEPLOYMENT_FIX.md pour plus de détails.');

process.exit(errors.length > 0 ? 1 : 0);
