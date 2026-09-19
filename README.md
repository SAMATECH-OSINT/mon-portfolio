# Portfolio — Mamadou Sarr

Cybersecurity · Cloud · Data Engineering · Big Data · AI · Digital Transformation.

React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · Framer Motion · Three.js / React Three Fiber.

## Commandes

```bash
npm run dev            # serveur de développement
npm run typecheck      # tsc -b
npm run lint           # ESLint
npm run build          # typecheck + build de production
npm run preview        # prévisualiser le build
npm run generate:globe # régénère le masque terrestre du globe (Natural Earth, domaine public)
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
- Globe : Three.js chargé en différé, suspendu hors écran, **remplacé par un rendu Canvas 2D** sur mobile,
  si WebGL est indisponible, si le mode économie de données est actif ou en cas d'erreur.
- `prefers-reduced-motion` : image fixe pour le fond et le globe, animations et défilement fluide désactivés.
- Navigation clavier complète, lien d'évitement, focus visible, structure sémantique.
