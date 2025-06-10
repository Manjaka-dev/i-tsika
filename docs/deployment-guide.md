# Guide de déploiement du site web portfolio

Ce guide vous explique les étapes nécessaires pour déployer votre site web portfolio Next.js sur différentes plateformes.

## Prérequis

Avant de déployer votre site, assurez-vous d'avoir :

1. Un compte GitHub pour héberger votre code source
2. Un compte sur la plateforme de déploiement de votre choix (Vercel, Netlify, etc.)
3. Configuré les variables d'environnement nécessaires (voir le guide d'email Nodemailer)
4. Poussé votre code sur GitHub

## Option 1: Déploiement sur Vercel (Recommandé pour Next.js)

Vercel est la plateforme créée par les développeurs de Next.js, elle offre donc une intégration parfaite.

### Étapes de déploiement sur Vercel

1. **Créez un compte Vercel** et connectez-vous
2. **Importez votre projet** depuis GitHub
   - Cliquez sur "New Project"
   - Autorisez Vercel à accéder à vos repositories GitHub
   - Sélectionnez le repository de votre portfolio
3. **Configurez le projet**
   - Framework Preset : Next.js (devrait être détecté automatiquement)
   - Build and Output Settings : Laissez les valeurs par défaut
   - Environment Variables : Ajoutez toutes les variables d'environnement nécessaires (EMAIL_HOST, EMAIL_USER, etc.)
4. **Déployez** en cliquant sur "Deploy"

Vercel va automatiquement construire et déployer votre site. Une fois terminé, vous recevrez une URL pour accéder à votre site.

### Personnalisation du domaine sur Vercel

1. Dans le tableau de bord de votre projet, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine personnalisé et suivez les instructions pour configurer les DNS

## Option 2: Déploiement sur Netlify

Netlify est une excellente alternative pour héberger des sites Next.js.

### Étapes de déploiement sur Netlify

1. **Créez un compte Netlify** et connectez-vous
2. **Importez votre projet**
   - Cliquez sur "New site from Git"
   - Connectez votre compte GitHub
   - Sélectionnez le repository de votre portfolio
3. **Configurez le build**
   - Build command : `npm run build`
   - Publish directory : `.next`
4. **Ajoutez les variables d'environnement**
   - Dans "Site settings" > "Environment variables", ajoutez toutes les variables nécessaires
5. **Déployez** en cliquant sur "Deploy site"

### Configuration spéciale pour Next.js sur Netlify

Il est recommandé d'ajouter un fichier `netlify.toml` à la racine de votre projet avec le contenu suivant :

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Et d'installer le plugin Next.js :

```
npm install -D @netlify/plugin-nextjs
```

## Option 3: Déploiement sur un hébergement traditionnel

Si vous préférez utiliser un hébergement traditionnel, vous devrez générer une version statique de votre site.

### Étapes pour exporter un site statique

1. Modifiez votre fichier `next.config.js` pour activer l'export statique :

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = nextConfig;
```

2. Construisez et exportez votre site :

```
npm run build
```

3. Les fichiers statiques seront générés dans le dossier `out`. Vous pouvez ensuite les télécharger sur votre serveur web.

> **Note importante** : L'export statique ne supportera pas les API Routes. Si vous utilisez des API Routes (comme `/api/send-email`), vous ne pourrez pas utiliser cette méthode de déploiement.

## Mise à jour du site

Pour mettre à jour votre site après des modifications :

1. **Vercel et Netlify** : Il suffit de pousser vos modifications sur GitHub, le déploiement se fera automatiquement
2. **Hébergement traditionnel** : Reconstruisez le site et téléchargez à nouveau les fichiers

## Vérification après déploiement

Après avoir déployé votre site, vérifiez les points suivants :

1. **Fonctionnement général** : Navigation, affichage des images, etc.
2. **Formulaires** : Testez l'envoi des formulaires de contact et de devis
3. **Responsive** : Testez votre site sur différentes tailles d'écran
4. **Performances** : Vérifiez les performances avec Lighthouse ou PageSpeed Insights

## Optimisation pour les moteurs de recherche

Pour améliorer votre référencement :

1. **Sitemap** : Générez un sitemap.xml avec `next-sitemap`
2. **Métadonnées** : Vérifiez que toutes les pages ont des balises meta appropriées
3. **robots.txt** : Assurez-vous que votre site possède un fichier robots.txt correct

## Ressources additionnelles

- [Documentation officielle de déploiement Next.js](https://nextjs.org/docs/deployment)
- [Guide de déploiement Vercel](https://vercel.com/docs/deployments/overview)
- [Guide de déploiement Netlify avec Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
- [Guide d'optimisation des performances Next.js](https://nextjs.org/docs/advanced-features/measuring-performance)
