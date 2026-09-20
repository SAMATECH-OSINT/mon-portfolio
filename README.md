# Portfolio — Mamadou Sarr

Cybersecurity · Cloud · Data Engineering · Big Data · AI · Digital Transformation.

React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · Three.js (natif, globe du Hero).

## Commandes

```bash
npm install             # installation des dépendances

npm run dev             # serveur de développement
npm run typecheck       # tsc -b
npm run lint            # ESLint
npm run build           # typecheck + build de production (dist/)
npm run preview         # prévisualiser le build de production

npm run generate:globe   # régénère le masque terrestre du globe (Natural Earth, domaine public)
npm run optimize:images  # génère les variantes AVIF/WebP/JPEG depuis assets-src/
npm run generate:social  # régénère favicons PNG, apple-touch-icon, image Open Graph et manifest
npm run generate:sitemap # génère public/sitemap.xml une fois profile.siteUrl renseigné
```

## Modifier le contenu

Tout le contenu vit dans [`src/data/`](src/data) : aucun composant à toucher.

| Fichier | Contenu |
| --- | --- |
| `profile.ts` | nom, positionnement, texte du Hero, `stats`, À propos, photo, URL du site |
| `projects.ts` | case studies (Problem, Solution, Architecture, Results, liens) |
| `skills.ts` | domaines, technologies, périmètres |
| `experience.ts`, `education.ts`, `certifications.ts` | parcours |
| `research.ts`, `teaching.ts` | axes de recherche, enseignements |
| `socials.ts` | email, LinkedIn, GitHub |
| `architecture.ts`, `valueChain.ts` | contenu des diagrammes |
| `navigation.ts` | ordre des sections et navigation |

### Règle : ne rien inventer

Une donnée non validée vaut `TODO` (constante de `data/types.ts`). L'interface affiche alors
« À compléter », masque l'élément, ou désactive le bouton : aucun lien, chiffre ou résultat fictif.
Les indicateurs du Hero (`stats`) n'apparaissent qu'une fois renseignés.

Pour trouver ce qui reste à compléter : `grep -rn "TODO" src/data`.

### Images

Déposer l'original dans `assets-src/` (ex. `portrait.jpg`), lancer `npm run optimize:images`, puis référencer
son nom (ex. `photo: 'portrait'` dans `profile.ts`) ou utiliser `<ResponsiveImage name="…" alt="…" sizes="…" />`.
Le script produit des variantes AVIF / WebP / JPEG, supprime les métadonnées EXIF et enregistre les dimensions
(aucun décalage de mise en page). Les variantes sont versionnées : la CI n'a pas besoin de `sharp`.

### CV public

`public/cv/Mamadou-Sarr-CV.pdf` est dérivé du CV d'origine : les numéros de téléphone et tout le bloc « Références »
(données de tiers) en ont été **réellement supprimés** du PDF, pas simplement masqués. Pour le remplacer, déposer un
autre PDF au même chemin. Le bouton disparaît si `profile.cv` vaut `TODO`.

## Architecture

```text
src/
├── components/
│   ├── background/   fond dynamique global (Canvas 2D) — lazy
│   ├── hero/         Hero + globe WebGL (lazy) et son fallback Canvas 2D
│   ├── architecture/ diagrammes animés (ChainExplorer, LayeredFlow, FlowRail)
│   ├── ui/           design system (Button, Card, Badge, Reveal, SectionHeading…)
│   └── …             un dossier par section
├── sections/         une section = une composition de composants + de données
├── data/             contenu (voir ci-dessus)
├── hooks/  lib/      logique sans rendu
└── styles/index.css  design tokens (Tailwind @theme)
```

## SEO

`index.html` porte le title, la meta description et les balises Open Graph de base. Le plugin
`seoHead` (`vite.config.ts`) complète à chaque build, à partir de `src/data/profile.ts` et
`src/data/socials.ts` :

- `<meta name="robots">`, Twitter Card, `og:image` (image générée par `generate:social`) ;
- `<link rel="manifest">`, `<link rel="apple-touch-icon">` ;
- un JSON-LD `Person` (nom, poste, localisation, `sameAs` LinkedIn/GitHub).

Tant que `profile.siteUrl` vaut `TODO` (aucun domaine choisi), le `<link rel="canonical">` et les
URLs absolues (`og:url`, `og:image`, JSON-LD `url`) sont **omis** plutôt que de publier un domaine
provisoire. Dès que `profile.siteUrl` est renseigné, le build suivant les ajoute automatiquement —
voir « Domaine personnalisé » ci-dessous. `public/robots.txt` autorise l'indexation ; le sitemap
n'est généré (`npm run generate:sitemap`) qu'une fois le domaine connu, pour la même raison.

## Déploiement

Le site est 100 % statique (aucune API, aucune base de données, aucune variable d'environnement) :
`npm run build` produit `dist/`, à servir tel quel par n'importe quel hébergeur statique.

### Plateformes comparées

| | Coût | Simplicité | HTTPS / CDN | Déploiement Git | Domaine perso | Maintenance |
| --- | --- | --- | --- | --- | --- | --- |
| **Cloudflare Pages** | Gratuit | Élevée | Auto, CDN Cloudflare | Push GitHub → build auto | Oui | Quasi nulle |
| **Vercel** | Gratuit (usage perso) | Élevée | Auto, CDN | Push GitHub → build auto | Oui | Quasi nulle |
| **Netlify** | Gratuit (usage perso) | Élevée | Auto, CDN | Push GitHub → build auto | Oui | Quasi nulle |
| **GitHub Pages** | Gratuit | Moyenne | Auto (CDN Fastly) | Action ou branche dédiée | Oui | Quasi nulle |
| **VPS** (ex. Hostinger) | Payant | Faible | À configurer (certificat, reverse proxy) | À mettre en place (CI) | Oui | Récurrente (OS, sécurité, renouvellement) |

**Recommandation :** Cloudflare Pages (ou, à défaut, Vercel/Netlify — trois options quasi
équivalentes pour un site statique Vite). Build et déploiement automatiques à chaque push GitHub,
HTTPS et CDN inclus sans configuration, domaine personnalisé gratuit, et aucune maintenance
serveur. Un VPS n'apporte aucun bénéfice ici : le site n'a ni backend ni base de données, et
demanderait à gérer soi-même certificat, reverse proxy et mises à jour système pour un résultat
équivalent.

Configuration de build à renseigner sur la plateforme retenue :

- **Commande de build** : `npm run build`
- **Dossier de sortie** : `dist`
- **Version de Node** : 20 ou plus

Cette phase ne déploie rien : elle prépare uniquement la configuration et cette documentation.

### Domaine personnalisé

Une fois un domaine choisi (ex. `mamadousarr.com`) et l'hébergeur retenu :

1. Ajouter le domaine dans les réglages de l'hébergeur (« Custom domain » / « Domains »).
2. Créer l'enregistrement DNS demandé (CNAME, ou A/ALIAS pour un domaine racine) chez le
   registrar ou dans la zone DNS utilisée.
3. Attendre la propagation DNS et l'émission automatique du certificat HTTPS.
4. Renseigner `siteUrl` dans `src/data/profile.ts` avec l'URL définitive (`https://domaine.tld`).
5. Lancer `npm run generate:sitemap` (génère `public/sitemap.xml` et ajoute la ligne `Sitemap:`
   dans `public/robots.txt`).
6. Reconstruire (`npm run build`) et redéployer : canonical, Open Graph, Twitter Card et JSON-LD
   passent alors automatiquement en URLs absolues.
7. Soumettre le sitemap à Google Search Console et Bing Webmaster Tools (action manuelle, hors
   périmètre technique).

### Variables d'environnement

Aucune. Le site ne consomme aucune variable d'environnement ni secret au build ou à l'exécution.

## Performance et accessibilité

- Le fond et le globe sont chargés après le premier rendu (`requestIdleCallback`) et n'entravent jamais le contenu.
- Fond : Canvas 2D (parallaxe souris / scroll, halos en calques CSS composités), densité adaptée à l'écran,
  dégradation automatique si les images sont lentes, pause quand l'onglet est masqué.
- Globe : Three.js natif chargé en différé, suspendu hors écran, **remplacé par un rendu Canvas 2D** sur mobile (< 768 px),
  en `prefers-reduced-motion`, si WebGL est indisponible, en mode économie de données ou en cas d'erreur.
- Apparitions au scroll en CSS pur (un seul `IntersectionObserver` partagé) ; aucune bibliothèque d'animation.
- Polices auto-hébergées, sous-ensembles latin et latin-ext uniquement, avec préchargement des deux polices du premier écran.
- `prefers-reduced-motion` : image fixe pour le fond, globe 2D, apparitions et défilement fluide désactivés.
- Navigation clavier complète, lien d'évitement, focus visible, structure sémantique.
