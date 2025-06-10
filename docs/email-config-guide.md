# Guide de configuration du service d'email

Ce projet utilise Nodemailer pour envoyer des emails directement depuis le serveur Next.js. Voici comment configurer correctement le service d'email.

## Configuration du serveur SMTP

### 1. Modifier les paramètres de connexion

Ouvrez le fichier `/lib/mail-config.ts` et remplacez les informations de connexion SMTP par celles de votre fournisseur d'email:

```typescript
export const mailConfig: MailConfigType = {
  host: 'smtp.votrefournisseur.com', // Serveur SMTP
  port: 465, // Port (généralement 465 pour SSL, 587 pour TLS)
  secure: true, // true pour 465, false pour 587
  auth: {
    user: 'votre.email@example.com', // Votre adresse email
    pass: 'votre_mot_de_passe', // Votre mot de passe
  },
};

// Remplacez également l'adresse de destination
export const RECIPIENT_EMAIL = 'destinataire@example.com';
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

## Utilisation de variables d'environnement (recommandé)

Pour une meilleure sécurité, il est recommandé d'utiliser des variables d'environnement pour stocker vos identifiants:

1. Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

```
EMAIL_HOST=smtp.exemple.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=votre.email@exemple.com
EMAIL_PASS=votre_mot_de_passe
RECIPIENT_EMAIL=destinataire@exemple.com
```

2. Utilisez la configuration suivante dans `mail-config.ts`:

```typescript
export const mailConfig: MailConfigType = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};
export const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'destinataire@exemple.com';
```

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
