# claude.md — Projet Shopify : Lancement Listen Magazine Opus 1

> **Suivi d'avancement** : voir [`plan.md`](plan.md) pour le tracker de tâches par phase.
> **Règle** : toute nouvelle fonctionnalité demandée doit être ajoutée simultanément dans ce fichier (section dédiée) **et** dans `plan.md` (section Backlog).

---

## Vue d'ensemble

Ce projet consiste à concevoir et développer un **site Shopify** pour le lancement du **premier opus hybride de Listen Magazine** — un objet éditorial entre magazine imprimé et expérience digitale. Le site doit refléter l'identité visuelle forte du magazine : brut, vivant, urbain, jeune et énergique.

---

## Objectif principal

Créer une expérience de lancement en ligne qui :
- **Présente et vend** l'Opus 1 de Listen Magazine
- **Transmet l'énergie et l'univers** du magazine dès les premières secondes
- **Donne envie** d'acheter, de partager, de revenir
- **Marque les esprits** comme un événement culturel, pas un simple e-commerce

---

## Structure du site

### 1. Landing Page / Hero Section
- Animation d'intro au chargement (grain, texture, typographie animée)
- Titre fort : nom du magazine + "Opus 1" + date de sortie
- CTA principal : "Commander maintenant" ou "Obtenir l'Opus 1"
- Ambiance immédiate : noir, blanc, images brutes, son optionnel

### 2. Page Produit — Opus 1
- Galerie photo immersive du magazine (couverture, spreads, détails)
- Description éditoriale : de quoi parle cet opus, qui y contribue
- Prix + bouton d'achat
- Informations de livraison

### 3. Section "À propos de Listen"
- Manifeste court : qui est Listen, quelle est sa vision
- Format hybride expliqué : entre print et digital
- Liens vers les réseaux sociaux

### 4. Section Contributeurs / Contenu
- Présentation des artistes, photographes, rédacteurs de l'Opus 1
- Extraits visuels (pages, images, citations)

### 5. Footer
- Newsletter signup
- Réseaux sociaux
- Mentions légales

---

## Animations & Interactions prévues

| Zone | Animation |
|---|---|
| Chargement initial | Intro animée avec grain et reveal typographique |
| Hero | Scroll parallax sur l'image de couverture |
| Galerie produit | Transition fluide entre images, effet hover grain |
| CTA | Micro-animation au survol (inversion couleurs, déplacement) |
| Sections | Apparition au scroll (fade-in, slide-up) |
| Curseur | Curseur custom (cercle, croix ou logo Listen) |
| Fond | Grain animé en overlay subtil sur toute la page |

---

## Stack technique Shopify

- **Thème Shopify** : thème custom ou thème minimaliste (Dawn modifié)
- **Animations** : GSAP (GreenSock) pour les animations complexes
- **Grain & texture** : CSS + canvas ou SVG filter animé
- **Typographie** : Inter Bold (titres, UI) + Inter Regular (corps de texte) — via Google Fonts
- **Langues** : Français (principal), Anglais (optionnel)
- **Paiement** : Stripe via Shopify Payments
- **Livraison** : France + International

---

## Ton & Positionnement

Listen Magazine n'est **pas** un magazine comme les autres. Ce n'est pas non plus une boutique en ligne ordinaire. Le site doit donner l'impression de tomber sur quelque chose **rare, vivant, fait à la main** — comme acheter un vinyle chez un disquaire underground ou récupérer un fanzine après un concert.

> Énergie : brut, sincère, collectif, jeune, urbain, culturel, non-commercial dans le geste, mais professionnel dans l'exécution.

---

## Livrables attendus

- [ ] Moodboard validé (voir `design.md`)
- [ ] Wireframes des pages principales
- [ ] Développement du thème Shopify custom
- [ ] Intégration des animations GSAP
- [ ] Mise en ligne et tests
- [ ] Stratégie de lancement (réseaux, email, presse)

---

## Informations confirmées

| Paramètre | Valeur |
|---|---|
| Prix de l'Opus 1 | **25 €** |
| Type d'édition | **Édition limitée** (numérotée) |
| Date de lancement | **20 juin** |
| Vie du site après lancement | **Actif en permanence** — archive + future vente |
| Extraits audio | **Oui** — intégrés sur le site |
| Livraison | **France + International** |

### Implications de ces choix

- **25 € / édition limitée** → créer un sentiment d'urgence sur le site (compteur de stock, badge "édition limitée", numéro d'exemplaire visible)
- **20 juin** → environ 2 mois pour développer et tester — planning serré, prioriser le MVP
- **Site actif en permanence** → penser l'architecture pour accueillir de futurs opus (Opus 2, Opus 3…)
- **Extraits audio** → intégrer un lecteur audio custom discret mais bien designé (pas Spotify embed basique)
- **Livraison internationale** → gérer les frais de port selon les zones, prévoir les taxes douanières

---

## Questions encore ouvertes

- Le tirage est de combien d'exemplaires exactement ?
- Est-ce que chaque exemplaire est numéroté à la main ou imprimé ?
- Y a-t-il un logo Listen Magazine finalisé ?
- Le contenu de l'Opus 1 — thème(s), contributeurs, univers ?