# Guide de test du service d'emails

Ce guide vous explique comment tester le service d'envoi d'emails pour s'assurer qu'il fonctionne correctement.

## Prérequis

1. Assurez-vous d'avoir configuré les variables d'environnement comme décrit dans le fichier `docs/email-config-guide.md`.
2. Vous devez avoir un compte email valide pour le test (Gmail, Outlook, etc.).

## Test en environnement de développement

### 1. Vérification de la configuration

Lorsque vous démarrez l'application en mode développement (`npm run dev`), vous devriez voir dans la console des messages indiquant si la configuration email est correcte :

```
📧 Configuration email : OK
   - Serveur: smtp.gmail.com:587
   - Utilisateur: votre.email@gmail.com
   - Adresse destinataire: configurée
   - Adresse expéditeur: configurée
```

Si vous voyez un message d'avertissement comme celui-ci, cela signifie que certaines variables d'environnement sont manquantes :

```
⚠️ Configuration email incomplète!
   Variables manquantes: EMAIL_USER, EMAIL_PASS
   Le service d'envoi d'emails pourrait ne pas fonctionner correctement.
```

### 2. Test via l'API directement

Vous pouvez tester l'API d'envoi d'emails directement avec cURL ou Postman :

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "name": "Test User",
    "email": "test@example.com",
    "message": "Ceci est un message de test"
  }'
```

### 3. Test via l'interface utilisateur

1. Lancez l'application avec `npm run dev`
2. Accédez à la page de contact
3. Remplissez le formulaire avec des informations de test
4. Soumettez le formulaire
5. Vérifiez votre boîte de réception configurée dans `RECIPIENT_EMAIL` pour voir si l'email a été reçu

## Test en production

### 1. Configuration des variables d'environnement sur Vercel

Avant de déployer sur Vercel, assurez-vous d'avoir configuré toutes les variables d'environnement nécessaires dans l'interface de Vercel :

1. EMAIL_HOST
2. EMAIL_PORT
3. EMAIL_SECURE
4. EMAIL_USER
5. EMAIL_PASS
6. RECIPIENT_EMAIL
7. SENDER_EMAIL

### 2. Test après déploiement

Une fois l'application déployée sur Vercel :

1. Accédez à votre site déployé
2. Testez le formulaire de contact et le formulaire de devis
3. Vérifiez que vous recevez les emails
4. Vérifiez que les emails sont envoyés depuis l'adresse configurée dans SENDER_EMAIL

## Résolution des problèmes

Si les emails ne sont pas envoyés correctement, vérifiez les points suivants :

1. **Logs sur Vercel** : Consultez les logs dans le tableau de bord Vercel pour voir les erreurs éventuelles
2. **Configuration SMTP** : Vérifiez que les informations de connexion au serveur SMTP sont correctes
3. **Authentification** : Vérifiez que vos identifiants sont corrects et que votre compte email autorise l'envoi via SMTP
4. **Pare-feu** : Vérifiez si des restrictions réseau empêchent la connexion au serveur SMTP
5. **Quota d'envoi** : Certains services limitent le nombre d'emails que vous pouvez envoyer par jour

## Alternatives en cas de problème

Si vous rencontrez des problèmes persistants avec le service d'email, vous pouvez envisager d'utiliser des services tiers comme :

1. SendGrid
2. Mailchimp
3. Amazon SES
4. Mailgun

Ces services offrent souvent des API plus fiables et des quotas d'envoi plus élevés.
