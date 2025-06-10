const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Dossier public
const publicDir = path.join(__dirname, '..', 'public');

// Fonction pour convertir les images en WebP
async function convertImagesToWebP() {
  try {
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
      // Ignorer les dossiers et les fichiers qui ne sont pas des images
      if (fs.statSync(path.join(publicDir, file)).isDirectory()) continue;
      
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) continue;
      
      const baseName = path.basename(file, ext);
      const webpPath = path.join(publicDir, `${baseName}.webp`);
      
      console.log(`Conversion de ${file} en WebP...`);
      
      try {
        await sharp(path.join(publicDir, file))
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        console.log(`Conversion réussie : ${baseName}.webp`);
      } catch (err) {
        console.error(`Erreur lors de la conversion de ${file} : ${err.message}`);
      }
    }
    
    console.log('Toutes les conversions sont terminées!');
  } catch (err) {
    console.error('Une erreur est survenue :', err);
  }
}

// Exécuter la conversion
convertImagesToWebP();
