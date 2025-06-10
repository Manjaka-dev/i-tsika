const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Vérifier si sips (outil macOS pour la conversion d'images) est disponible
function checkSipsAvailable() {
  try {
    execSync('sips --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Fonction principale pour convertir les images
function convertHEICtoJPG() {
  const publicDir = path.join(__dirname, '..', 'public');
  const files = fs.readdirSync(publicDir);
  
  if (!checkSipsAvailable()) {
    console.log('La commande sips n\'est pas disponible sur ce système.');
    console.log('Vous devez convertir manuellement les images HEIC en JPG.');
    return;
  }

  files.forEach(file => {
    if (file.toLowerCase().endsWith('.heic')) {
      const filePath = path.join(publicDir, file);
      const newFileName = file.replace(/\.heic$/i, '.jpg');
      const newFilePath = path.join(publicDir, newFileName);
      
      try {
        console.log(`Conversion de ${file} en ${newFileName}...`);
        execSync(`sips -s format jpeg "${filePath}" --out "${newFilePath}"`, { stdio: 'inherit' });
        console.log(`Conversion réussie: ${newFileName}`);
      } catch (error) {
        console.error(`Erreur lors de la conversion de ${file}:`, error.message);
      }
    }
  });
}

// Exécuter la conversion
convertHEICtoJPG();
