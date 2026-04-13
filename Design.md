# design.md — Identité Visuelle de Listen Magazine

## ADN Visuel

Listen Magazine est un objet éditorial **brut et vivant**. Son design ne cherche pas à être lisse ou rassurant — il cherche à **capter quelque chose de réel** : l'énergie d'une scène, l'urgence d'un moment, la texture d'une rue. Chaque choix visuel doit servir cette intention.

---

## Palette de couleurs

### Couleurs primaires

| Rôle | Couleur | Hex | Usage |
|---|---|---|---|
| Fond principal | Noir profond | `#0A0A0A` | Backgrounds, hero sections |
| Texte principal | Blanc pur | `#FFFFFF` | Headlines, body text sur fond sombre |
| Contraste fort | Noir absolu | `#000000` | Sur images claires |

### Couleurs secondaires

| Rôle | Couleur | Hex | Usage |
|---|---|---|---|
| Off-white | Blanc cassé | `#F2F0EB` | Fond alternatif, papier |
| Gris foncé | Anthracite | `#1C1C1C` | Cards, sections intermédiaires |
| Gris moyen | `#555555` | Texte secondaire, légendes |

### Accent (utiliser avec parcimonie)

- **Pas de couleur vive systématique** — si accent nécessaire : rouge vif `#E5001B` ou jaune électrique `#FFE600` pour des éléments ultra ciblés (badges, alertes, édition limitée)
- L'accent doit surprendre, pas décorer

> **Règle d'or** : Le site fonctionne en noir et blanc à 90%. Toute couleur ajoutée est une décision, pas un réflexe.

---

## Typographie

### Philosophie

La typographie de Listen est **éditoriale et tranchante**. Elle assume sa présence. Les titres prennent de la place, les corps de texte sont nets et lisibles. Pas de fantaisie gratuite.

### Titres (Display / Headlines)

- **Inter Bold** — 700 / 800 / 900
  - Usage : titres principaux, hero, couverture, labels
  - Caractère : propre, musclé, lisible à toutes les tailles
  - Source : Google Fonts (libre, rapide, pas de dépendance externe)

### Corps de texte

- **Inter Regular** — 400 / 500
  - Usage : paragraphes, descriptions, captions, UI
  - Excellente lisibilité sur écran noir ou blanc

### Règles typographiques

| Élément | Taille (desktop) | Graisse Inter | Casse |
|---|---|---|---|
| Hero Title | 80–120px | 900 (Black) | Majuscules ou mixte |
| Section Title | 48–64px | 800 (ExtraBold) | Libre |
| Sous-titre | 20–24px | 600 (SemiBold) | Libre |
| Body text | 16–18px | 400 (Regular) | Normale |
| Caption / Label | 11–13px | 700 (Bold) | Majuscules + letter-spacing |

- **Letter-spacing** sur les labels et petits éléments : `0.1em` à `0.15em`
- **Line-height** généreux sur les titres : `0.9` à `1.05`
- **Line-height** corps de texte : `1.5` à `1.65`

---

## Photographie & Images

### Style photographique

Les images de Listen sont **non retouchées, directes, documentaires**. Elles viennent du terrain. Pas de mise en scène artificielle, pas de post-prod excessive. L'image doit respirer et avoir des imperfections.

### Critères d'une image Listen

- ✅ Contraste naturel fort (ombres, lumières dures)
- ✅ Flou de bougé accepté si intentionnel
- ✅ Grain argentique ou simulation de grain numérique
- ✅ Composition asymétrique, non académique
- ✅ Sujets : personnes vraies, lieux urbains, corps en mouvement, culture de rue
- ❌ Pas de stock photo lisse
- ❌ Pas de preset Instagram/filtre évident
- ❌ Pas de fond blanc studio (sauf exception volontaire)

### Traitement des images

- **Grain** : ajout systématique d'un grain de film sur les images (via CSS filter, SVG feTurbulence, ou overlay PNG)
- **Contraste** : légère augmentation du contraste (`contrast: 1.1` à `1.2`)
- **Noir & Blanc** : certaines images passent en N&B via `grayscale(100%)` — mix avec couleur selon les sections
- **Saturation** : légèrement desaturée pour les images couleur (`saturate(0.85)`)

---

## Grain & Texture

Le grain est **l'âme visuelle de Listen**. Il est partout — pas comme un effet décoratif, mais comme une peau.

### Implémentation du grain

```css
/* Overlay grain animé — à appliquer sur body ou sections */
.grain-overlay {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("grain.png"); /* PNG grain tileable */
  opacity: 0.04;
  pointer-events: none;
  z-index: 9999;
  animation: grain 0.8s steps(2) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -3%); }
  30% { transform: translate(3%, 2%); }
  50% { transform: translate(-1%, 4%); }
  70% { transform: translate(4%, -1%); }
  90% { transform: translate(-3%, 2%); }
}
```

- Opacité du grain : entre `0.03` et `0.06` selon le fond (plus visible sur blanc, moins sur noir)
- Le grain **bouge légèrement** en permanence — il est vivant

---

## Énergie & Mouvement

### Principes d'animation

Listen ne fait pas dans le "smooth corporate". Les animations sont **rapides, précises, un peu brusques** — comme une photo de street ou un cut de montage vidéo.

| Type | Durée | Easing |
|---|---|---|
| Transition page | 400–600ms | `cubic-bezier(0.76, 0, 0.24, 1)` |
| Reveal au scroll | 500–700ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover CTA | 200ms | `ease-out` |
| Intro / loader | 1.2–2s | Custom GSAP |

### Animations clés

- **Reveal texte** : apparition lettre par lettre ou ligne par ligne (GSAP SplitText)
- **Image reveal** : un masque (clip-path) qui s'ouvre de gauche à droite ou de bas en haut
- **Parallax scroll** : images en fond qui scrollent légèrement plus lentement que le contenu
- **Curseur custom** : un cercle blanc/noir qui grossit au hover des liens et images
- **Inversion hover** : les CTAs s'inversent (fond noir → blanc, texte blanc → noir) au survol

---

## Mise en page & Grid

### Philosophie de grille

La mise en page de Listen est **asymétrique et respirante**. Des espaces vides volontaires. Des débordements contrôlés. La grille n'est pas une cage.

### Système

- **Grid de base** : 12 colonnes
- **Gouttières** : 24px mobile / 32px desktop
- **Margins** : 20px mobile / 80–120px desktop (larges pour créer de l'espace éditorial)
- **Max-width** : 1440px (mais certains éléments percent le cadre volontairement)

### Patterns de mise en page caractéristiques

- Titre géant qui déborde du cadre (overflow visible)
- Image pleine largeur sans marges
- Texte en décalage par rapport à l'image (pas de colonne parfaitement alignée)
- Numéros de section en très grand, en fond, presque transparents

---

## Ambiance générale — Moodwords

Ces mots doivent guider chaque décision de design :

> **Brut. Sincère. Vivant. Urbain. Jeune. Énergique. Collectif. Non-lisse. Documentaire. Tranchant. Rare. Authentique.**

---

## Ce qu'on évite absolument

- ❌ Dégradés colorés génériques
- ❌ Icônes rondes et "friendly UI"
- ❌ Animations qui durent trop longtemps (> 1s sans raison)
- ❌ Typographies serif romantiques ou décoratives
- ❌ Blanc pur partout (ça fait Apple Store, pas Listen)
- ❌ Grid trop sage et trop propre
- ❌ Illustrations vectorielles "flat design"
- ❌ Tout ce qui ressemble à un template Squarespace

---

## Références visuelles (esprit, pas copie)

- **i-D Magazine** (site web) — éditorial radical, noir/blanc
- **032c** — dense, typographique, sérieux
- **Études Studio** — grain, texture, monochrome
- **BRTHR** — site d'agence créative, animations brutales et précises
- **Celine (ancienne ère Hedi Slimane)** — minimalisme radical
- **Zine culture / risographie** — imperfection assumée, contrainte = style