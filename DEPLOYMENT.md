# Guide de Déploiement

Ce document contient les instructions pour déployer le site web sur un environnement de production.

## Prérequis

- Node.js 18.17.0 ou version supérieure
- npm ou yarn ou pnpm

## Variables d'environnement

Avant le déploiement, assurez-vous de configurer les variables d'environnement suivantes dans votre environnement de production :

```bash
# Configuration Email
EMAIL_HOST=smtppro.zoho.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=noreply@i-tsika.site
EMAIL_PASS=votre_mot_de_passe_zoho

# Adresses email
RECIPIENT_EMAIL=contact@i-tsika.site
SENDER_EMAIL=noreply@i-tsika.site
```

## Étapes de déploiement

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd portfolio-website
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Construire l'application

```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

### 4. Démarrer l'application en mode production

```bash
npm run start
# ou
yarn start
# ou
pnpm start
```

## Déploiement sur Vercel

Pour un déploiement simple, nous recommandons l'utilisation de Vercel :

1. Créez un compte sur [Vercel](https://vercel.com/)
2. Connectez votre dépôt GitHub/GitLab/Bitbucket
3. Importez le projet
4. Configurez les variables d'environnement dans l'interface Vercel
5. Déployez !

## Configuration du serveur SMTP (Zoho Mail)

Pour que le formulaire de contact fonctionne correctement, vous devez configurer les variables d'environnement liées au service d'email.

Si vous utilisez Zoho Mail :

1. Assurez-vous que EMAIL_HOST est réglé sur "smtppro.zoho.com"
2. Utilisez le port 465 avec l'option secure=true
3. L'utilisateur doit être une adresse email complète (ex: noreply@i-tsika.site)
4. Pour le mot de passe, nous recommandons d'utiliser un mot de passe d'application spécifique généré depuis les paramètres de votre compte Zoho Mail.

## Résolution des problèmes courants

### Problèmes d'envoi d'emails

Si les emails ne sont pas envoyés correctement :

1. Vérifiez que toutes les variables d'environnement liées à la configuration email sont correctement définies
2. Assurez-vous que le mot de passe est valide
3. Si vous utilisez l'authentification à deux facteurs, vous devez utiliser un mot de passe d'application
4. Vérifiez que l'accès SMTP est activé dans votre compte Zoho Mail

Pour plus d'informations, consultez la documentation détaillée dans `/docs/zoho-auth-troubleshooting.md`

## Maintenance

Une fois le site déployé, effectuez régulièrement les opérations suivantes :

1. Mettre à jour les dépendances pour corriger les vulnérabilités de sécurité
2. Surveiller les performances et l'utilisation des ressources
3. Vérifier que le service d'envoi d'emails fonctionne correctement

## Support

Pour toute question relative au déploiement ou à la configuration, veuillez contacter :
- Email: contact@i-tsika.site
- Téléphone: +261 387939905
