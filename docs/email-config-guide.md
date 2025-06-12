# Guide de configuration du service d'email

Ce projet utilise Nodemailer pour envoyer des emails directement depuis le serveur Next.js. Voici comment configurer correctement le service d'email en utilisant les variables d'environnement.

## Configuration du serveur SMTP via variables d'environnement

### 1. Créer un fichier .env.local

Créez un fichier `.env.local` à la racine du projet (ce fichier ne sera pas commité dans le dépôt Git) et ajoutez les informations suivantes :

```bash
# Configuration Email
EMAIL_HOST=smtp.votrefournisseur.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=votre.email@example.com
EMAIL_PASS=votre_mot_de_passe

# Adresses email
RECIPIENT_EMAIL=contact@i-tsika.site
SENDER_EMAIL=noreply@i-tsika.site
```

Ces variables seront automatiquement utilisées par le fichier `/lib/mail-config.ts` :

```typescript
// La configuration est automatiquement prise depuis les variables d'environnement
export const mailConfig: MailConfigType = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

// Adresses email configurables
export const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'contact@i-tsika.site';
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'noreply@i-tsika.site';
```

### 2. Configuration selon le fournisseur d'email

#### Pour Gmail

Si vous utilisez Gmail, vous avez deux options:

1. **Mot de passe d'application** (Recommandé):
   - Activez l'authentification à deux facteurs sur votre compte Google
   - Créez un mot de passe d'application spécifique: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Utilisez ce mot de passe dans la configuration

2. **Applications moins sécurisées**:
   - Activez l'option "Autoriser les applications moins sécurisées" dans les paramètres de votre compte Google
   - Cette option est moins sécurisée et pourrait être désactivée par Google à l'avenir

#### Pour Outlook / Office 365

```typescript
export const outlookConfig: MailConfigType = {
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'votre.email@outlook.com',
    pass: 'votre_mot_de_passe',
  },
};
```

#### Pour OVH

```typescript
export const ovhConfig: MailConfigType = {
  host: 'ssl0.ovh.net',
  port: 465,
  secure: true,
  auth: {
    user: 'votre.email@votre-domaine.com',
    pass: 'votre_mot_de_passe',
  },
};
```

## Configuration pour déploiement sur Vercel

Lorsque vous déployez votre application sur Vercel, vous devrez configurer les variables d'environnement dans l'interface de Vercel :

1. Connectez-vous à votre tableau de bord Vercel
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez chaque variable d'environnement mentionnée précédemment :
   - EMAIL_HOST
   - EMAIL_PORT
   - EMAIL_SECURE
   - EMAIL_USER
   - EMAIL_PASS
   - RECIPIENT_EMAIL
   - SENDER_EMAIL

Assurez-vous que ces variables sont correctement configurées pour l'environnement de production. Vous pouvez également configurer différentes valeurs pour les environnements de développement, prévisualisation et production.

## Test de la configuration

Pour tester votre configuration, vous pouvez utiliser la fonction `verifyMailConnection()` importée depuis `mail-service.ts`:

```typescript
import { verifyMailConnection } from '@/lib/mail-service';

// Vérifier la connexion au serveur SMTP
verifyMailConnection()
  .then(() => console.log('Connexion réussie'))
  .catch((error) => console.error('Erreur:', error));
```

## Personnaliser les modèles d'emails

Les modèles d'emails HTML sont définis dans le fichier `mail-service.ts`. Vous pouvez les personnaliser selon vos besoins en modifiant les chaînes de template dans les fonctions `sendContactEmail` et `sendQuoteEmail`.
