# Guide d'utilisation du service d'email avec Nodemailer

Ce document explique comment configurer et utiliser le service d'email du site portfolio qui utilise Nodemailer pour envoyer les emails des formulaires de contact et de devis.

## Configuration des variables d'environnement

Pour que le service d'email fonctionne correctement, vous devez configurer les variables d'environnement suivantes dans un fichier `.env.local` à la racine du projet :

```bash
# Configuration du service d'email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app

# Adresse de destination des emails
RECIPIENT_EMAIL=destinataire@example.com
```

### Explication des variables

- `EMAIL_HOST` : Le serveur SMTP à utiliser (ex : smtp.gmail.com pour Gmail)
- `EMAIL_PORT` : Le port du serveur SMTP (généralement 465 pour SSL ou 587 pour TLS)
- `EMAIL_SECURE` : `true` pour une connexion sécurisée (SSL), `false` pour TLS
- `EMAIL_USER` : Votre adresse email
- `EMAIL_PASS` : Votre mot de passe ou mot de passe d'application
- `RECIPIENT_EMAIL` : L'adresse email qui recevra les messages

## Configuration spécifique par fournisseur de messagerie

### Gmail

Pour utiliser Gmail comme service d'envoi d'emails :

1. Utilisez les paramètres suivants :
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   ```

2. **Important** : Pour des raisons de sécurité, vous devez utiliser un "mot de passe d'application" spécifique :
   - Activez l'authentification à deux facteurs sur votre compte Google
   - Allez dans "Sécurité" > "Connexion à Google" > "Mots de passe des applications"
   - Créez une nouvelle application et utilisez le mot de passe généré comme valeur pour `EMAIL_PASS`

### Outlook / Office 365

Pour utiliser Outlook ou Office 365 :

```
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### OVH

Pour utiliser un email hébergé chez OVH :

```
EMAIL_HOST=ssl0.ovh.net
EMAIL_PORT=465
EMAIL_SECURE=true
```

## Déploiement

Lors du déploiement de votre application, vous devrez configurer les mêmes variables d'environnement sur votre plateforme d'hébergement.

### Déploiement sur Vercel

1. Sur votre tableau de bord Vercel, allez dans votre projet
2. Cliquez sur "Settings" > "Environment Variables"
3. Ajoutez toutes les variables d'environnement listées plus haut
4. Redéployez votre application pour appliquer les changements

### Déploiement sur Netlify

1. Sur votre tableau de bord Netlify, allez dans votre projet
2. Cliquez sur "Site settings" > "Environment variables"
3. Ajoutez toutes les variables d'environnement nécessaires
4. Redéployez votre site pour appliquer les changements

## Test du service d'email

Pour tester que le service d'email est correctement configuré :

1. Lancez l'application en mode développement : `npm run dev`
2. Remplissez et soumettez le formulaire de contact ou de devis
3. Vérifiez les logs de la console pour voir si des erreurs sont signalées
4. Vérifiez votre boîte de réception pour confirmer que l'email a bien été reçu

## Dépannage

Si vous rencontrez des problèmes avec l'envoi d'emails :

1. **Les emails ne sont pas envoyés** :
   - Vérifiez que vos identifiants sont corrects
   - Assurez-vous que votre fournisseur d'email autorise les connexions SMTP depuis des applications tierces
   - Pour Gmail, vérifiez que vous utilisez bien un mot de passe d'application

2. **Erreurs d'authentification** :
   - Double-vérifiez le nom d'utilisateur et le mot de passe
   - Assurez-vous que le port et les paramètres SSL/TLS sont corrects pour votre fournisseur

3. **Erreurs côté serveur** :
   - Vérifiez que Nodemailer est bien installé : `npm install nodemailer`
   - Vérifiez que les variables d'environnement sont correctement chargées

## Ressources additionnelles

- [Documentation officielle de Nodemailer](https://nodemailer.com/)
- [Guide de configuration des mots de passe d'application Google](https://support.google.com/accounts/answer/185833)
- [Documentation Next.js sur les variables d'environnement](https://nextjs.org/docs/basic-features/environment-variables)
