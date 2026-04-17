# Oryzon — Plan du projet

## Société
**Oryzon** — Constructeur de maisons individuelles sur mesure
Zone : Calvados, périphérie de Caen
Fondateur : Olivier (30+ ans de métier dans la construction)
Différenciateur clé : **Visite en réalité virtuelle** du projet avant construction

---

## Objectif du site
**Une seule action cible** : Prendre rendez-vous (Calendly)
Tout le site converge vers ce CTA. Le RDV doit être présenté comme "découverte sans engagement" pour lever la friction.

---

## Sitemap

```
/                         → Homepage
/construire               → Construction sur mesure
/renover                  → Rénovation
/agrandir                 → Agrandissement
/realisations             → Portfolio des projets
/notre-histoire           → À propos (Oryzon + Olivier)
/blog                     → Blog SEO
/blog/[slug]              → Article de blog
/contact                  → Prise de RDV (Calendly embed)
/mentions-legales         → Mentions légales
/politique-confidentialite → Politique de confidentialité
```

---

## Architecture technique

### Stack
- **Framework** : Next.js 16 (App Router)
- **CSS** : Tailwind CSS v4 (CSS-first config via `@theme`)
- **Animations** : GSAP + ScrollTrigger (scroll-driven storytelling) + Framer Motion (micro-interactions, transitions de pages)
- **Fonts** : Cinzel (headlines — architectural, premium) + Plus Jakarta Sans (body/UI) via `next/font/google`
- **RDV** : Calendly embed
- **CMS** : Sanity (headless) — Sanity Studio pour qu'Olivier écrive sans toucher au code

### Patterns SEO
- Structured data : `LocalBusiness`, `Service`, `FAQPage`, `BlogPosting`
- Métadonnées OG complètes sur chaque page
- Sitemap XML dynamique
- ISR pour le blog, SSG pour pages statiques

---

## Design System

### Palette
| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-blue-deep` | `#0D3559` | Couleur principale, nav, CTA secondaire |
| `--color-blue` | `#124C7C` | Bleu logo |
| `--color-gold` | `#C49A5A` | Accent premium, CTA principal, highlights |
| `--color-bg` | `#F9F7F4` | Fond off-white chaud |
| `--color-bg-dark` | `#0D1117` | Sections sombres (hero, VR, CTA final) |
| `--color-text` | `#111111` | Texte principal (jamais #000 pur) |
| `--color-text-muted` | `#6B6B6B` | Texte secondaire |
| `--color-border` | `rgba(0,0,0,0.06)` | Bordures ultra-légères |

### Typographie
- **Headlines** : Cinzel — architecture romaine, premium, parfait pour la construction
- **Body / UI** : Plus Jakarta Sans — géométrique, élégant (Inter est banni)
- Taille hero : `clamp(3rem, 7vw, 8rem)` — jamais plus de 3 lignes
- Tracking headlines : `-0.03em`
- Line-height body : `1.6`

### Rythme couleur au scroll (homepage)
```
Hero         → bg-dark       — impact immédiat, confiance
Services     → bg (off-white) — respiration, lecture
VR           → bg-dark       — re-immersion, wow moment
Processus    → bg-dark       — clarity via contraste
Réalisations → bg (off-white) — photos qui parlent
Why Oryzon   → surface-warm  — chaleur, confiance
FAQ + CTA    → bg-dark       — clôture forte
```

### Système de motion — Les 3 moments cinématiques

#### Partout ailleurs (entrées de section)
- `translateY(24px) → translateY(0)` + `opacity 0 → 1`
- Durée : 700ms, `cubic-bezier(0.16, 1, 0.3, 1)`
- Via Framer Motion `whileInView` — jamais `addEventListener('scroll')`
- Stagger sur les listes/grilles : `delay: index * 80ms`

#### Moment 1 — Hero
- Ken Burns très lent sur l'image de fond (scale 1.0 → 1.05, 8s, linear)
- Reveal du texte ligne par ligne avec clip-mask (GSAP)
- CTA : button-in-button avec arrow circle interne

#### Moment 2 — Section VR (le WOW)
- Section pinnée (GSAP ScrollTrigger `pin: true`)
- Scrubbing : vidéo/image-sequence jouée au scroll
- Transition : plan 2D → rendu VR 3D → maison finie
- Texte qui se révèle par couche pendant le scrub

#### Moment 3 — Processus
- Timeline scroll-driven (GSAP)
- Trait vertical qui se dessine au scroll
- Chaque étape s'allume à son déclencheur
- Clips vidéo courts (3-5s, autoplay, muted, loop) par étape — générés par IA

### Composants premium — règles
- **Navbar** : floating pill, `mt-4 mx-auto w-max`, hamburger morph → X, overlay fullscreen
- **Cards** : Double-bezel (outer shell `p-1.5 ring-1 ring-black/5` + inner core avec radii concentriques)
- **CTA buttons** : `rounded-full`, arrow dans cercle interne flush au bord droit
- **Eyebrow tags** : pill `px-3 py-1 text-[10px] uppercase tracking-[0.2em]` avant chaque H2
- **Sections** : `py-24` à `py-40` minimum — respirer lourdement
- **Heights** : `min-h-[100dvh]` jamais `h-screen` (iOS Safari)

### Règles d'animation GPU-safe
- Animer uniquement `transform` et `opacity`
- `backdrop-blur` uniquement sur éléments fixed/sticky
- `will-change: transform` uniquement sur éléments en cours d'animation
- Respecter `prefers-reduced-motion`

---

## Statut des pages

| Page | Statut | Priorité |
|------|--------|----------|
| `/` Homepage | 🔲 À faire | P0 |
| `/construire` | 🔲 À faire | P1 |
| `/renover` | 🔲 À faire | P1 |
| `/agrandir` | 🔲 À faire | P1 |
| `/realisations` | 🔲 À faire | P2 |
| `/notre-histoire` | 🔲 À faire | P2 |
| `/blog` | 🔲 À faire | P3 |
| `/contact` | 🔲 À faire | P1 |
| Navbar | 🔲 À faire | P0 |
| Footer | 🔲 À faire | P0 |

---

## Contenu & Assets

### Visuels
- Pas de photos propriétaires pour l'instant → images stock web haute qualité (Unsplash/Pexels)
- Vidéos de progression (construction par étapes) → générées par IA (image start/end)
- Logo : `design-system/brand/logo.png`
- Images placeholder : `https://images.unsplash.com/...` (architecturales, maisons haut de gamme)

### Assets à demander à l'utilisateur
- [ ] Vidéo IA : esquisse plan 2D → render 3D (section VR)
- [ ] Clips IA x5 : une par étape du processus (réunion, casque VR, pelleteuse, murs, clés)
- [ ] Photo Olivier sur chantier (page Notre histoire)

### Stats à afficher
- +30 ans de métier (Olivier)
- +800 réalisations
- 100% sur mesure

### Arguments clés
1. Réalité virtuelle — visualiser avant de construire
2. Interlocuteur unique du plan à la remise des clés
3. Devis fixe, sans mauvaises surprises
4. Délais contractuellement garantis
5. Garanties décennales
6. Matériaux éco-responsables
