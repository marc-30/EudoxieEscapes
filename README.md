# Eudoxie Escapes — Site Web Officiel

> Agence de voyage spécialisée Ghana · Accra, Ghana & Abidjan, Côte d'Ivoire

---

## Présentation

**Eudoxie Escapes** est une agence de voyage haut de gamme spécialisée dans les séjours au Ghana. Ce dépôt contient le code source du site web officiel, développé avec React et Vite.

Le site présente les offres de l'agence (voyages privés, séjours de groupe, séjours linguistiques), les destinations phares du Ghana, et intègre un formulaire de réservation connecté à EmailJS.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| React | 18 | Interface utilisateur |
| Vite | 5 | Build tool & dev server |
| EmailJS | @emailjs/browser | Envoi de formulaire sans backend |
| Google Fonts | — | Montserrat + Dancing Script |
| Vercel | — | Hébergement & déploiement |

---

## Structure du projet

```
EudoxieEscapes/
├── public/                 # Images locales (servies statiquement)
│   ├── offre couple.jpg
│   ├── offre 2personnes.jpg
│   ├── entreprise ou groupe.jpg
│   ├── goma.jpg
│   ├── hero-2.jpg
│   ├── APART.jpg
│   ├── kwame.jpg
│   └── sejour groupe.jpg
├── src/
│   ├── App.jsx             # Application complète (toutes les pages)
│   ├── App.css             # Styles globaux
│   └── main.jsx            # Point d'entrée React
├── index.html
├── vercel.json             # Configuration Vercel + headers sécurité
└── vite.config.js
```

---

## Pages

- **Accueil** — Hero plein écran, destinations phares, services résumés, CTA
- **Nos Services** — 3 offres (flyers), section avantages inclus, destinations Ghana
- **À Propos** — Histoire de l'agence, chiffres clés, valeurs
- **Contact** — Formulaire de réservation complet + coordonnées

---

## Installation et développement

### Prérequis

- Node.js 18+
- npm 9+

### Lancer en local

```bash
# Cloner le dépôt
git clone https://github.com/marc-30/EudoxieEscapes.git
cd EudoxieEscapes

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`.

### Build de production

```bash
npm run build
```

Les fichiers compilés sont générés dans le dossier `dist/`.

---

## Configuration EmailJS

Le formulaire de contact utilise EmailJS (aucun backend requis).

| Paramètre | Valeur |
|---|---|
| Service ID | `service_vbaoc55` |
| Template ID | `template_77umfvp` |
| Public Key | `CAjMLkujLgjLK0cTz` |

**Variables du template** à configurer sur emailjs.com :

```
{{from_name}}     — Nom du demandeur
{{from_email}}    — Email du demandeur
{{participants}}  — Nombre de participants
{{stay_type}}     — Type de séjour
{{travel_month}}  — Mois du voyage
{{travel_year}}   — Année du voyage
{{budget}}        — Budget estimé (optionnel)
{{message}}       — Message libre (optionnel)
```

---

## Sécurité

### Headers HTTP (vercel.json)

Les headers suivants sont appliqués sur toutes les routes en production :

| Header | Valeur |
|---|---|
| `X-Frame-Options` | `DENY` — protection clickjacking |
| `X-Content-Type-Options` | `nosniff` — protection MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | HTTPS forcé (HSTS) |
| `Content-Security-Policy` | Sources autorisées uniquement |
| `Permissions-Policy` | Caméra, micro, géolocalisation désactivés |

### Mesures en place

- Aucun `dangerouslySetInnerHTML` dans le code
- Tous les liens externes ont `rel="noreferrer noopener"`
- Inputs texte limités (`maxLength`) pour éviter les payloads excessifs
- Champs à choix libres remplacés par des `<select>` contrôlés
- Validation HTML5 native (`required`, `type="email"`)

### Note sur la dépendance esbuild

`npm audit` signale une vulnérabilité modérée dans `esbuild` ≤ 0.24.2 (via Vite 5).
Cette vulnérabilité concerne uniquement le **serveur de développement local** et n'affecte pas le site déployé en production. La correction nécessite une migration vers Vite 8 (changement majeur).

---

## Déploiement

Le site est hébergé sur **Vercel** avec déploiement automatique à chaque push sur la branche `master`.

```
Dépôt GitHub   →   Vercel (auto-deploy)   →   eudoxieescapes.com
```

---

## Contact client

- **Téléphone / WhatsApp** : +233 530 645 509
- **Email** : contact@eudoxieescapes.com
- **Adresses** : Accra, Ghana · Abidjan, Côte d'Ivoire

---

## Auteur

Développé par **MARC DEV**  
© 2026 Eudoxie Escapes — Tous droits réservés
