const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const settings = {
  webp: {
    quality: 80,  // Qualité webp (0-100)
  },
  resize: {
    maxWidth: 1920,  // Largeur maximale des images
    maxHeight: 1080, // Hauteur maximale des images
    fit: 'inside',   // Conserver les proportions
  },
  // Tailles responsives pour les images importantes
  responsive: {
    // Clés = nom du fichier source, valeurs = array des largeurs
    'hero.png': [640, 1024, 1920],
    'portfolio-hero.png': [640, 1024, 1920],
    // Ajoutez d'autres images selon vos besoins
  }
};

// Dossier public (racine et sous-dossiers)
const publicDir = path.join(__dirname, '..', 'public');

// Types d'images à traiter
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.heic'];

// Fonction pour créer des versions responsives d'une image
async function createResponsiveImages(filePath, filename) {
  const basename = path.basename(filename, path.extname(filename));
  // Vérifier si cette image a besoin de versions responsives
  const responsiveSizes = settings.responsive[filename];
  if (!responsiveSizes) return;

  console.log(`Création de versions responsives pour ${filename}...`);

  const outputDir = path.dirname(filePath);

  for (const width of responsiveSizes) {
    const outputWebp = path.join(outputDir, `${basename}-${width}.webp`);

    try {
      await sharp(filePath)
        .resize({ width, height: null, withoutEnlargement: true })
        .webp(settings.webp)
        .toFile(outputWebp);

      console.log(`  ✓ Créé: ${basename}-${width}.webp`);
    } catch (err) {
      console.error(`  ✗ Erreur lors de la création de ${basename}-${width}.webp:`, err.message);
    }
  }
}

// Fonction pour optimiser une image individuelle
async function optimizeImage(filePath, outputWebp) {
  const metadata = await sharp(filePath).metadata();
  
  let pipeline = sharp(filePath);
  
  // Redimensionner si l'image est plus grande que les limites
  if (metadata.width > settings.resize.maxWidth || metadata.height > settings.resize.maxHeight) {
    pipeline = pipeline.resize({
      width: settings.resize.maxWidth,
      height: settings.resize.maxHeight,
      fit: settings.resize.fit,
      withoutEnlargement: true
    });
  }
  
  // Convertir en WebP
  return pipeline
    .webp(settings.webp)
    .toFile(outputWebp);
}

// Fonction pour traiter tous les fichiers dans un répertoire de manière récursive
async function processDirectory(directory) {
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    
    // Si c'est un répertoire, on le traite de manière récursive
    if (fs.statSync(itemPath).isDirectory()) {
      // Ignorer les dossiers node_modules et .git
      if (item !== 'node_modules' && item !== '.git') {
        await processDirectory(itemPath);
      }
      continue;
    }
    
    // Vérifier si c'est un fichier image et non déjà en webp
    const ext = path.extname(item).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext) || ext === '.webp') continue;
    
    const baseName = path.basename(item, ext);
    const webpPath = path.join(directory, `${baseName}.webp`);
    
    // Si le fichier WebP existe déjà et qu'il est plus récent que l'original, on skip
    if (fs.existsSync(webpPath)) {
      const originalStat = fs.statSync(itemPath);
      const webpStat = fs.statSync(webpPath);
      
      if (webpStat.mtimeMs > originalStat.mtimeMs) {
        console.log(`Fichier WebP déjà à jour: ${baseName}.webp`);
        continue;
      }
    }
    
    console.log(`Optimisation de ${item}...`);
    
    try {
      await optimizeImage(itemPath, webpPath);
      console.log(`  ✓ Converti en WebP: ${baseName}.webp`);
      
      // Créer des versions responsives si nécessaire
      await createResponsiveImages(itemPath, item);
    } catch (err) {
      console.error(`  ✗ Erreur lors de l'optimisation de ${item}:`, err.message);
    }
  }
}

// Fonction principale
async function optimizeAllImages() {
  try {
    console.log('Début de l\'optimisation des images...');
    await processDirectory(publicDir);
    console.log('Optimisation des images terminée!');
  } catch (err) {
    console.error('Une erreur est survenue:', err);
  }
}

// Exécuter l'optimisation
optimizeAllImages();
