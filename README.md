# Listen Magazine — Shopify Theme

Thème Shopify custom pour le lancement de l'Opus 1 de Listen Magazine.

## Stack

- **Shopify CLI** v3.93.2
- **GSAP** 3.12.5 (ScrollTrigger, SplitText) via CDN
- **Inter** (Google Fonts) — 400 / 500 / 600 / 700 / 800 / 900
- Liquid, CSS custom (pas de framework CSS)

## Structure

```
assets/          → CSS, JS
config/          → settings_schema.json, settings_data.json
layout/          → theme.liquid (layout principal)
locales/         → fr.default.json, en.json
sections/        → header, footer, hero, main-product, about, contributors
snippets/        → grain-overlay, cursor-custom, intro-loader, audio-player, cart-drawer
templates/       → index.json, product.json
```

## Connexion au store Shopify

### 1. Login

```bash
shopify auth login --store VOTRE-STORE.myshopify.com
```

### 2. Démarrer le dev

```bash
shopify theme dev --store VOTRE-STORE.myshopify.com
```

### 3. Pusher le thème

```bash
shopify theme push --store VOTRE-STORE.myshopify.com
```

### 4. Puller les changements (depuis admin)

```bash
shopify theme pull --store VOTRE-STORE.myshopify.com
```

## À configurer dans Shopify Admin après push

1. **Produit Opus 1** — créer le produit, prix 25 €, activer la gestion du stock
2. **Images** — uploader les photos de couverture dans la section Hero et galerie produit
3. **Métafields produit** — `custom.audio_url`, `custom.audio_track_name`, `custom.opus_number`
4. **Réseaux sociaux** — renseigner dans Theme Settings > Réseaux sociaux
5. **Footer** — lier les pages légales (mentions légales, CGV, confidentialité)
6. **Shopify Payments** — activer dans Settings > Payments
7. **Livraison** — configurer les zones dans Settings > Shipping

## Suivi du projet

Voir [`plan.md`](plan.md) pour l'avancement des tâches.
