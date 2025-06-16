const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  cssFiles: ['app/globals.css', 'styles/globals.css'],
  jsxExtensions: ['js', 'jsx', 'ts', 'tsx'],
  directories: ['app', 'components', 'pages']
};

// Récupérer tout le CSS
function getAllCSS() {
  let allCSS = '';
  config.cssFiles.forEach(file => {
    try {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        allCSS += fs.readFileSync(filePath, 'utf8');
      }
    } catch (err) {
      console.log(`Erreur lors de la lecture du CSS: ${err}`);
    }
  });
  return allCSS;
}

// Extraire toutes les classes CSS
function extractCSSClasses(cssText) {
  // Regex pour extraire les classes de Tailwind et autres classes CSS
  const regex = /\.([a-zA-Z0-9_-]+)/g;
  const matches = cssText.match(regex);
  if (!matches) return new Set();
  
  // Supprimer le point au début et créer un ensemble unique
  return new Set(matches.map(match => match.substring(1)));
}

// Récupérer toutes les classes utilisées dans les fichiers JSX
function getUsedClasses() {
  const usedClasses = new Set();
  
  // Créer les patterns de recherche pour glob
  const patterns = config.directories.map(dir => 
    `${path.join(__dirname, '..')}/${dir}/**/*.{${config.jsxExtensions.join(',')}}`
  );
  
  // Trouver tous les fichiers correspondants
  const files = patterns.reduce((acc, pattern) => {
    return [...acc, ...glob.sync(pattern)];
  }, []);
  
  // Analyser chaque fichier pour les classes CSS
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Rechercher les classes dans className=""
      const classNameRegex = /className=["']([^"']+)["']/g;
      let match;
      while ((match = classNameRegex.exec(content)) !== null) {
        const classString = match[1];
        
        // Diviser les classes et les ajouter à l'ensemble
        const classes = classString
          .split(/\s+/)
          .map(c => c.trim())
          .filter(c => c && !c.includes('{') && !c.includes('$'));  // Filtrer les expressions
        
        classes.forEach(cls => usedClasses.add(cls));
      }
    } catch (err) {
      console.log(`Erreur lors de la lecture de ${file}: ${err}`);
    }
  });
  
  return usedClasses;
}

// Fonction principale pour analyser et afficher les classes CSS inutilisées
function analyzeUnusedCSS() {
  console.log('Analyse des classes CSS inutilisées...');
  
  const allCSS = getAllCSS();
  const cssClasses = extractCSSClasses(allCSS);
  const usedClasses = getUsedClasses();
  
  // Calculer les classes inutilisées
  const unusedClasses = [...cssClasses].filter(cls => !usedClasses.has(cls));
  const usedClassesCount = [...usedClasses].filter(cls => cssClasses.has(cls)).length;
  
  console.log(`\nRésultats de l'analyse CSS:`);
  console.log(`- Total des classes CSS définies: ${cssClasses.size}`);
  console.log(`- Classes CSS utilisées: ${usedClassesCount}`);
  console.log(`- Classes CSS inutilisées: ${unusedClasses.length}`);
  console.log(`- Pourcentage d'utilisation: ${Math.round((usedClassesCount / cssClasses.size) * 100)}%`);
  
  if (unusedClasses.length > 0) {
    console.log('\nTop 20 des classes CSS potentiellement inutilisées:');
    unusedClasses.slice(0, 20).forEach(cls => console.log(`- ${cls}`));
  }
  
  console.log('\nNote: Cette analyse est approximative. Vérifiez manuellement avant de supprimer du CSS.');
}

// Exécuter l'analyse
analyzeUnusedCSS();
