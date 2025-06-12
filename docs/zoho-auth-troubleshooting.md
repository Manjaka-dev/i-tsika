# Guide de dépannage pour l'authentification Zoho Mail

## Problème constaté
Vous rencontrez une erreur d'authentification lors de l'envoi d'emails via Zoho Mail :
```
Échec de l'envoi : Invalid login: 535-5.7.8 Username and Password not accepted.
```

## Causes possibles et solutions

### 1. Mot de passe incorrect
Vérifiez que le mot de passe dans le fichier `.env.local` est correct. Le mot de passe actuel (`E#gb7lzl`) pourrait ne pas être le bon ou avoir été modifié récemment.

### 2. Utiliser un mot de passe d'application (recommandé)
Si votre compte Zoho Mail utilise l'authentification à deux facteurs, vous devrez créer un mot de passe d'application spécifique :

1. Connectez-vous à votre compte Zoho Mail
2. Accédez à "Compte" > "Sécurité" > "Mots de passe d'application"
3. Créez un nouveau mot de passe d'application pour "Autres applications"
4. Utilisez ce mot de passe généré dans votre fichier `.env.local` au lieu de votre mot de passe principal

### 3. Activer l'accès SMTP
Assurez-vous que l'accès SMTP est activé sur votre compte Zoho Mail :

1. Connectez-vous à votre console d'administration Zoho
2. Accédez à "Email" > "Contrôle" > "Accès Email"
3. Activez l'accès SMTP pour votre domaine et votre utilisateur

### 4. Vérifier les restrictions de sécurité
Zoho Mail peut avoir des restrictions sur les appareils ou les adresses IP qui peuvent se connecter à votre compte :

1. Vérifiez s'il y a des alertes de sécurité dans votre compte Zoho Mail
2. Désactivez temporairement les restrictions d'adresses IP si nécessaire
3. Vérifiez si vous avez reçu des emails de sécurité de Zoho concernant des tentatives de connexion bloquées

### 5. Configuration du port et du chiffrement
Vérifiez que vous utilisez la bonne configuration pour Zoho Mail :

- **Configuration correcte pour Zoho Mail Pro :**
```bash
EMAIL_HOST=smtppro.zoho.com
EMAIL_PORT=465
EMAIL_SECURE=true
```

- **Alternative :**
```bash
EMAIL_HOST=smtppro.zoho.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### 6. Tester directement avec le client de messagerie

Pour vérifier si le problème vient des identifiants ou de la configuration de votre application, essayez de configurer un client de messagerie standard (comme Thunderbird, Outlook, etc.) avec les mêmes identifiants :

- Serveur SMTP : smtppro.zoho.com
- Port : 465 (SSL) ou 587 (TLS)
- Nom d'utilisateur : noreply@i-tsika.site
- Mot de passe : Votre mot de passe actuel

Si le client de messagerie parvient à s'authentifier mais pas votre application, le problème pourrait être lié à la configuration de votre application.

### 7. Contacter le support Zoho

Si rien ne fonctionne, contactez le support Zoho Mail avec les informations suivantes :
- Le message d'erreur complet
- L'heure à laquelle vous avez essayé de vous connecter
- Votre adresse email et domaine

## Étapes immédiates recommandées

1. **Créer un mot de passe d'application** dans votre compte Zoho Mail
2. **Mettre à jour le fichier `.env.local`** avec ce nouveau mot de passe
3. **Redémarrer le serveur** de développement
4. **Tester l'envoi d'email** depuis la page d'administration
