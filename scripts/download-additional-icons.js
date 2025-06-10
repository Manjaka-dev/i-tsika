const fs = require('fs');
const path = require('path');
const https = require('https');

// Liste des icônes supplémentaires à télécharger
const additionalIcons = [
  { name: "typescript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "ruby", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  { name: "rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
  { name: "vuejs", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "angularjs", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "svelte", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
  { name: "nextjs", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "flask", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "fastapi", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "tailwindcss", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "mongodb", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
];

// Dossier de destination pour les icônes
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// S'assurer que le dossier d'icônes existe
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log(`Dossier créé : ${iconsDir}`);
}

// Fonction pour télécharger un fichier
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Téléchargement terminé : ${destination}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {}); // Supprimer le fichier en cas d'erreur
      console.error(`Erreur lors du téléchargement de ${url} : ${err.message}`);
      reject(err);
    });
  });
}

// Télécharger toutes les icônes supplémentaires
async function downloadAdditionalIcons() {
  console.log('Début du téléchargement des icônes supplémentaires...');
  
  const promises = additionalIcons.map(icon => {
    const destination = path.join(iconsDir, `${icon.name}.svg`);
    console.log(`Téléchargement de ${icon.name} depuis ${icon.url}`);
    return downloadFile(icon.url, destination);
  });
  
  try {
    await Promise.all(promises);
    console.log('Tous les téléchargements supplémentaires sont terminés!');
  } catch (error) {
    console.error('Une erreur est survenue lors du téléchargement des icônes supplémentaires:', error);
  }
}

// Exécuter le téléchargement
downloadAdditionalIcons();
