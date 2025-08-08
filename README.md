# Portfolio Website

Un site vitrine moderne et responsive développé avec Next.js et Tailwind CSS.

## Aperçu du projet

Ce portfolio présente mes compétences, projets et services proposés. Il inclut des pages suivantes :
- Page d'accueil avec présentation
- Formulaire de contact
- Formulaire de demande de devis
- Pages de présentation de projets
- Système d'authentification utilisateur
- Espace personnel (dashboard)
- Panneau d'administration

## Technologies utilisées

- [Next.js 15](https://nextjs.org/) - Framework React pour le rendu côté serveur
- [React 19](https://reactjs.org/) - Bibliothèque JavaScript pour la construction d'interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation typé basé sur JavaScript
- [Nodemailer](https://nodemailer.com/) - Module pour l'envoi d'emails depuis Node.js
- [NextAuth.js](https://next-auth.js.org/) - Solution d'authentification pour Next.js
- [Prisma](https://www.prisma.io/) - ORM pour l'accès à la base de données
- [PostgreSQL](https://www.postgresql.org/) - Système de gestion de base de données relationnelle

## Fonctionnalités

- Design responsive et moderne
- Formulaires interactifs avec validation côté client
- Envoi d'emails pour les formulaires de contact et de devis
- Animations et transitions fluides
- Optimisation SEO
- Système d'authentification complet (inscription, connexion, gestion de session)
- Espace utilisateur personnalisé (dashboard)
- Panneau d'administration avec gestion des utilisateurs
- Protection des routes par rôle (utilisateur, administrateur)

## Installation et configuration

### Prérequis

- Node.js 18+ et npm/pnpm

### Installation

1. Clonez le dépôt :
```bash
git clone <url-du-repo>
cd portfolio-website
```

2. Installez les dépendances :
```bash
npm install
# ou
pnpm install
```

3. Créez un fichier `.env.local` à partir du fichier `.env.example` :
```bash
cp .env.example .env.local
```

4. Mettez à jour les variables d'environnement dans le fichier `.env.local` :
```
# Configuration du service d'email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app

# Adresse de destination des emails
RECIPIENT_EMAIL=destinataire@example.com

# Configuration NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret_nextauth_très_sécurisé

# URL de connexion à la base de données PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
```

### Développement local

Lancez le serveur de développement :

```bash
npm run dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Configuration des emails

Le site utilise Nodemailer pour envoyer des emails à partir des formulaires de contact et de devis. Consultez le guide détaillé dans `docs/email-nodemailer-guide.md` pour la configuration.

### Points clés pour la configuration des emails :

1. Créez un fichier `.env.local` avec les informations de votre service de messagerie
2. Pour Gmail, utilisez un mot de passe d'application (pas votre mot de passe principal)
3. Configurez l'adresse de réception des emails avec la variable `RECIPIENT_EMAIL`

## Déploiement

Consultez le guide complet de déploiement dans `docs/deployment-guide.md`.

### Options de déploiement recommandées :

1. **Vercel** (recommandé pour Next.js) - Déploiement automatique à partir de GitHub
2. **Netlify** - Alternative populaire avec un bon support pour Next.js
3. **Hébergement traditionnel** - Possible avec export statique (limitations sur les API Routes)

## Structure des formulaires

### Formulaire de contact

Le formulaire de contact (`components/sections/contact-form.tsx`) collecte :
- Nom
- Email
- Message

### Formulaire de devis

Le formulaire de devis (`app/devis/page.tsx`) collecte :
- Nom du projet
- Domaine d'activité
- Email
- Description détaillée du projet
- Budget estimé

Les deux formulaires utilisent la même API centralisée (`app/api/send-email/route.ts`) mais avec des types différents pour distinguer le traitement.

## Documentation

- `docs/email-nodemailer-guide.md` - Guide complet pour la configuration des emails
- `docs/deployment-guide.md` - Guide pour le déploiement du site
- `.env.example` - Exemple de configuration des variables d'environnement

## Licence

Tous droits réservés.
