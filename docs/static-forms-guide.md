# Guide d'utilisation des formulaires statiques

Ce guide explique comment configurer et utiliser des formulaires statiques qui fonctionnent sans back-end pour votre site portfolio déployé sur Vercel ou tout autre hébergement statique.

## Service utilisé : FormSubmit

Dans cet exemple, nous utilisons [FormSubmit](https://formsubmit.co/), un service gratuit qui permet d'envoyer des emails depuis des formulaires HTML statiques sans avoir besoin de code côté serveur.

### Comment ça fonctionne

1. **Formulaire HTML standard** : Nous utilisons des formulaires HTML classiques avec la méthode POST.
2. **Action vers un service externe** : L'action du formulaire pointe vers FormSubmit, qui traitera l'envoi d'email.
3. **Redirection automatique** : Après soumission, l'utilisateur est redirigé vers une page de remerciement.

## Configuration

### 1. Activation de votre email

La première fois que quelqu'un soumet un formulaire à votre adresse email via FormSubmit, vous recevrez un email d'activation. Vous devez cliquer sur le lien d'activation pour autoriser la réception d'emails de ce formulaire.

### 2. Personnalisation des formulaires

Chaque formulaire utilise les champs cachés suivants pour la configuration :

```html
<input type="hidden" name="_subject" value="Nouveau message du portfolio" />
<input type="hidden" name="_next" value="https://votre-domaine.com/merci" />
<input type="hidden" name="_captcha" value="false" />
```

- `_subject` : Objet de l'email que vous recevrez
- `_next` : URL de redirection après soumission (page de remerciement)
- `_captcha` : Active/désactive le captcha de protection contre les spams

## Personnalisation avancée

### Anti-spam

Si vous souhaitez ajouter une protection anti-spam, modifiez :

```html
<input type="hidden" name="_captcha" value="true" />
```

### Formatage personnalisé

Vous pouvez utiliser un template HTML pour les emails reçus :

```html
<input type="hidden" name="_template" value="table" />
```

### CC et BCC

Pour envoyer une copie de l'email à d'autres adresses :

```html
<input type="hidden" name="_cc" value="autre@email.com,autre2@email.com" />
<input type="hidden" name="_bcc" value="copie@email.com" />
```

## Important : Mise à jour pour la production

Avant de déployer en production, assurez-vous de :

1. Remplacer `votre-email@example.com` par votre adresse email réelle dans tous les formulaires :
   ```html
   action="https://formsubmit.co/votre-email@example.com"
   ```

2. Mettre à jour l'URL de redirection avec votre domaine réel :
   ```html
   <input type="hidden" name="_next" value="https://votre-domaine-reel.com/merci" />
   ```

## Alternatives à FormSubmit

Si vous préférez d'autres services similaires, voici quelques alternatives :

- [Formspree](https://formspree.io/) - Offre un plan gratuit limité et des plans payants avec plus de fonctionnalités
- [Basin](https://usebasin.com/) - Interface élégante et analyse de formulaires
- [Web3Forms](https://web3forms.com/) - Solution simple avec fonction anti-spam
- [99Inbound](https://www.99inbound.com/) - Propose des notifications Slack et des intégrations

## Tests

Testez vos formulaires en les soumettant avec des données de test. Assurez-vous de vérifier que :
1. Vous recevez bien l'email d'activation lors de la première utilisation
2. La redirection vers la page de remerciement fonctionne correctement
3. Les validations côté client fonctionnent comme prévu
