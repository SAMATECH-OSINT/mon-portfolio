# Portfolio — Mamadou Sarr

Cybersecurity · Cloud · Data Engineering · Big Data · AI · Digital Transformation.

React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · Three.js (natif, globe du Hero).

## Commandes

```bash
npm run dev            # serveur de développement
npm run typecheck      # tsc -b
npm run lint           # ESLint
npm run build          # typecheck + build de production
npm run preview        # prévisualiser le build
npm run generate:globe # régénère le masque terrestre du globe (Natural Earth, domaine public)
npm run optimize:images # génère les variantes AVIF/WebP/JPEG depuis assets-src/
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
