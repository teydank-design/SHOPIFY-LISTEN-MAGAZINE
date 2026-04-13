# plan.md — Listen Magazine Shopify : Suivi d'avancement

> Tracker vivant du projet. Mettre à jour à chaque tâche terminée (`[ ]` → `[x]`).
> Toute nouvelle fonctionnalité demandée doit être ajoutée ici **et** dans `claude.md`.
> Voir `claude.md` pour le contexte complet et `design.md` pour l'identité visuelle.

---

## Légende

| Statut | Signification |
|--------|--------------|
| `[ ]`  | À faire |
| `[~]`  | En cours |
| `[x]`  | Terminé |

---

## Phase 0 — Fondations

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[ ]` | Valider le moodboard (voir `design.md`) | 🔴 Haute | Palette, typo, grain, références visuelles |
| `[ ]` | Finaliser le logo Listen Magazine | 🔴 Haute | Nécessaire avant tout développement front |
| `[ ]` | Créer les wireframes des pages principales | 🔴 Haute | Landing, Produit, À propos, Contributeurs |
| `[x]` | Initialiser le thème Shopify custom | 🔴 Haute | Structure complète créée |
| `[x]` | Installer Shopify CLI (v3.93.2) | 🔴 Haute | `npm install -g @shopify/cli` |
| `[x]` | Intégrer Inter (Google Fonts) dans le thème | 🟡 Moyenne | Intégré dans `layout/theme.liquid` |
| `[x]` | Mettre en place le grain overlay CSS/canvas global | 🟡 Moyenne | `snippets/grain-overlay.liquid` + CSS animé |

---

## Phase 1 — Développement des pages

### 1.1 Landing Page / Hero Section

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[x]` | Structurer la section Hero (HTML/Liquid) | 🔴 Haute | `sections/hero.liquid` |
| `[x]` | Intégrer le CTA principal ("Commander maintenant") | 🔴 Haute | Paramétrable via Shopify admin |
| `[ ]` | Ajouter l'image de couverture en hero | 🔴 Haute | À uploader dans Shopify admin |
| `[x]` | Afficher la date de sortie (20 juin) | 🟡 Moyenne | Paramètre `release_date` dans le schema |

### 1.2 Page Produit — Opus 1

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[ ]` | Créer le produit Shopify "Opus 1" | 🔴 Haute | À créer dans Shopify admin — 25 €, édition limitée |
| `[x]` | Galerie photo immersive (couverture, spreads, détails) | 🔴 Haute | `sections/main-product.liquid` avec thumbs |
| `[ ]` | Rédiger la description éditoriale | 🟡 Moyenne | À rédiger dans Shopify admin |
| `[x]` | Ajouter le bouton d'achat + infos livraison | 🔴 Haute | Intégré avec form Shopify natif |
| `[x]` | Badge "Édition limitée" + compteur de stock visible | 🔴 Haute | Badge animé + `data-stock-count` JS |
| `[ ]` | Afficher le numéro d'exemplaire | 🟡 Moyenne | Via metafield `custom.edition_number` |

### 1.3 Section "À propos de Listen"

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[x]` | Structurer la section À propos | 🟡 Moyenne | `sections/about.liquid` |
| `[ ]` | Rédiger le manifeste final | 🟡 Moyenne | À saisir dans Shopify admin |
| `[x]` | Format hybride + liens réseaux | 🟢 Basse | Paramètres Instagram / TikTok dans le schema |

### 1.4 Section Contributeurs / Contenu

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[x]` | Structurer la section contributeurs | 🟡 Moyenne | `sections/contributors.liquid` avec blocs |
| `[ ]` | Ajouter les contributeurs réels | 🟡 Moyenne | Via blocs dans Shopify admin |
| `[x]` | Support extraits visuels | 🟡 Moyenne | Blocs `visual_extract` dans le schema |

### 1.5 Footer

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[x]` | Newsletter signup (Shopify natif) | 🟡 Moyenne | `sections/footer.liquid` |
| `[x]` | Liens réseaux sociaux | 🟢 Basse | Paramètres Instagram / TikTok / X |
| `[ ]` | Mentions légales | 🟡 Moyenne | Créer la page dans Shopify admin |

---

## Phase 2 — Animations & Interactions

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[x]` | Installer GSAP dans le thème | 🔴 Haute | Via CDN dans `layout/theme.liquid` (GSAP 3.12.5) |
| `[x]` | Intro animée au chargement (grain + reveal typographique) | 🔴 Haute | `snippets/intro-loader.liquid` + GSAP dans `theme.js` |
| `[x]` | Scroll parallax sur l'image de couverture hero | 🟡 Moyenne | `initHeroParallax()` avec ScrollTrigger |
| `[x]` | Transitions entre images de la galerie produit | 🟡 Moyenne | `initProductGallery()` avec fade |
| `[x]` | Micro-animations CTA au survol (inversion couleurs) | 🟡 Moyenne | CSS pur dans `theme.css` |
| `[x]` | Apparition des sections au scroll (fade-in / slide-up) | 🟡 Moyenne | `[data-reveal]` + `initScrollReveals()` |
| `[x]` | Curseur custom | 🟡 Moyenne | `snippets/cursor-custom.liquid` + `initCursor()` JS |
| `[x]` | Grain overlay animé en fond | 🔴 Haute | `snippets/grain-overlay.liquid` + CSS keyframes |

---

## Phase 3 — Intégrations

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[x]` | Lecteur audio custom pour les extraits | 🔴 Haute | `snippets/audio-player.liquid` + `initAudioPlayers()` JS |
| `[x]` | Compteur de stock JS | 🔴 Haute | `updateStockDisplay()` + badge rouge si ≤ 10 |
| `[ ]` | Configurer Shopify Payments (Stripe) | 🔴 Haute | Dans Shopify admin |
| `[ ]` | Configurer les zones de livraison et frais de port | 🔴 Haute | Dans Shopify admin — France + International |
| `[ ]` | Gérer les taxes et TVA | 🟡 Moyenne | Dans Shopify admin |
| `[ ]` | Prévoir l'architecture multi-opus (Opus 2, Opus 3…) | 🟡 Moyenne | Collections Shopify — structure prête dans le thème |

---

## Phase 4 — Lancement

| Statut | Tâche | Priorité | Notes |
|--------|-------|----------|-------|
| `[ ]` | Tests cross-browser et responsive (mobile/desktop) | 🔴 Haute | |
| `[ ]` | Tests de parcours d'achat complet | 🔴 Haute | Ajout panier → paiement → confirmation |
| `[ ]` | Optimisation des performances (Core Web Vitals) | 🟡 Moyenne | Images, GSAP non bloquant |
| `[ ]` | SEO de base (meta, og:image, titre) | 🟡 Moyenne | |
| `[ ]` | Mise en ligne sur domaine final | 🔴 Haute | Avant le 20 juin |
| `[ ]` | Stratégie de lancement — réseaux sociaux | 🟡 Moyenne | |
| `[ ]` | Stratégie de lancement — email | 🟡 Moyenne | |
| `[ ]` | Stratégie de lancement — presse / médias | 🟢 Basse | |

---

## Questions ouvertes (bloquantes)

Ces points doivent être résolus pour avancer sur certaines tâches :

| # | Question | Impact |
|---|----------|--------|
| 1 | Tirage exact de l'Opus 1 ? | Compteur de stock, numérotation |
| 2 | Numérotation à la main ou imprimée ? | Page produit |
| 3 | Logo Listen Magazine finalisé ? | Tout le front |
| 4 | Thème(s) et contributeurs de l'Opus 1 ? | Section contributeurs, description produit |

---

## Backlog — Nouvelles fonctionnalités

> Cette section est mise à jour dynamiquement. Toute nouvelle fonctionnalité demandée est ajoutée ici **et** documentée dans `claude.md`.

| Statut | Fonctionnalité | Demandée le | Notes |
|--------|---------------|-------------|-------|
| | *(aucune pour l'instant)* | | |
