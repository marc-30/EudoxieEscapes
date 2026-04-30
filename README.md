# Eudoxie Escapes — Site Web Officiel

> Agence de voyage spécialisée Ghana · Accra, Ghana & Abidjan, Côte d'Ivoire

---

## Présentation

**Eudoxie Escapes** est une agence de voyage haut de gamme spécialisée dans les séjours au Ghana. Ce dépôt contient le code source du site web officiel, développé avec React et Vite.

Le site présente les offres de l'agence (voyages privés, séjours de groupe, séjours linguistiques), les destinations phares du Ghana, et intègre un formulaire de réservation complet connecté à EmailJS.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| React | 18 | Interface utilisateur |
| Vite | 5 | Build tool & dev server |
| EmailJS | @emailjs/browser | Envoi de formulaire sans backend |
| Google Fonts | — | Montserrat + Dancing Script |
| Vercel | — | Hébergement & déploiement continu |

---

## Structure du projet

```
EudoxieEscapes/
├── public/                       # Images (servies statiquement en prod)
│   ├── akosombo.jpg
│   ├── big-ada.jpeg
│   ├── bojo-beach.jpg
│   ├── cascades.jpeg
│   ├── entreprise ou groupe.jpg
│   ├── hero-2.jpg
│   ├── offre 2personnes.jpg
│   └── offre couple.jpg
├── src/
│   ├── App.jsx                   # Application complète (toutes les pages)
│   ├── App.css                   # Styles globaux
│   └── main.jsx                  # Point d'entrée React
├── index.html
├── vercel.json                   # Configuration Vercel + headers sécurité
└── vite.config.js
```

---

## Pages

| Page | Contenu |
|---|---|
| **Accueil** | Hero plein écran, slider destinations, cards services, aperçu À Propos, CTA |
| **Nos Services** | 3 flyers d'offres, section 6 avantages inclus, grille destinations Ghana |
| **À Propos** | Histoire de l'agence, statistiques, valeurs, section destinations |
| **Réservation** | Formulaire complet de demande de devis + coordonnées + conditions |

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

Le formulaire de réservation utilise EmailJS (aucun backend requis).

| Paramètre | Valeur |
|---|---|
| Service ID | `service_vbaoc55` |
| Template ID | `template_77umfvp` |
| Public Key | `CAjMLkujLgjLK0cTz` |

**Variables du template** à configurer sur emailjs.com :

```
{{from_name}}      — Nom complet du demandeur
{{from_email}}     — Adresse email
{{phone}}          — Numéro WhatsApp
{{stay_type}}      — Type de séjour
{{participants}}   — Nombre de participants
{{travel_month}}   — Mois souhaité
{{travel_year}}    — Année souhaitée
{{duration}}       — Durée du séjour
{{accommodation}}  — Type d'hébergement souhaité
{{budget}}         — Budget estimé (optionnel)
{{message}}        — Message libre (optionnel)
```

**Subject suggéré :** `Réservation : {{stay_type}} — {{from_name}}`

---

## Formulaire de réservation

Le formulaire collecte toutes les informations nécessaires à l'établissement d'un devis :

1. Nom et prénom
2. Email
3. Numéro WhatsApp
4. Nombre de participants
5. Type de séjour
6. Période souhaitée (mois + année)
7. Durée du séjour
8. Type d'hébergement
9. Budget estimé (optionnel)
10. Message libre (optionnel)

Les conditions de réservation (acompte 50 % non remboursable, solde à l'arrivée) sont affichées dans le formulaire avant le bouton d'envoi.

---

## Sécurité

### Headers HTTP (vercel.json)

Les headers suivants sont appliqués sur toutes les routes en production :

| Header | Protection |
|---|---|
| `X-Frame-Options: DENY` | Clickjacking |
| `X-Content-Type-Options: nosniff` | MIME sniffing |
| `X-XSS-Protection: 1; mode=block` | XSS basique |
| `Referrer-Policy` | Fuite d'URL |
| `Strict-Transport-Security` | Force HTTPS (HSTS) |
| `Content-Security-Policy` | Sources autorisées uniquement |
| `Permissions-Policy` | Caméra, micro, géolocalisation désactivés |

### Mesures en place

- Aucun `dangerouslySetInnerHTML` dans le code
- Tous les liens externes ont `rel="noreferrer"`
- `maxLength` sur tous les champs texte libres
- Champs à choix contraints via `<select>` (pas d'injection possible)
- Validation HTML5 native (`required`, `type="email"`, `type="tel"`)

### Note esbuild

`npm audit` signale une vulnérabilité modérée dans `esbuild` ≤ 0.24.2 (via Vite 5). Elle concerne uniquement le **serveur de développement local** — aucun impact en production. La correction nécessite une migration vers Vite 8 (changement majeur).

---

## Déploiement

Hébergé sur **Vercel** avec déploiement automatique à chaque push sur `master`.

```
Dépôt GitHub   →   Vercel (auto-deploy)   →   eudoxieescapes.com
```

---

## Contact agence

- **WhatsApp** : +233 530 645 509
- **Email** : contact@eudoxieescapes.com
- **Bureaux** : Accra, Ghana · Abidjan, Côte d'Ivoire

---

## Auteur

Développé par **MARC DEV**  
© 2026 Eudoxie Escapes — Tous droits réservés
