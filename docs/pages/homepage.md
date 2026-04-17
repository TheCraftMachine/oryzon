# Page : Homepage `/`

## Objectif
Convaincre un visiteur qui ne connaît pas Oryzon de prendre rendez-vous. Il arrive souvent via une recherche Google ("constructeur maison Caen"). On a 5 secondes pour l'accrocher, puis on le guide à travers une narration qui lève ses objections une par une.

## Structure des sections

### 1. Hero
- **Objectif** : Accrocher immédiatement, poser l'identité premium
- **Contenu** : Grande image ou vidéo plein écran d'une belle maison, titre puissant
- **Titre suggéré** : *"Votre maison, telle que vous l'imaginez."* ou *"Bâtissez la maison de votre vie."*
- **Sous-titre** : "Construction sur mesure en Calvados. De l'esquisse à la remise des clés."
- **CTA** : "Parlons de votre projet →"
- **Motion** : Reveal du texte à l'entrée (GSAP), parallax léger sur l'image de fond

### 2. Chiffres / Social proof rapide
- **Objectif** : Crédibilité immédiate, rassurer
- **Contenu** : +30 ans de métier | +800 réalisations | 100% sur mesure | Zone Calvados
- **Motion** : Counter animation au scroll (GSAP)

### 3. Les 3 services
- **Objectif** : Orienter le visiteur vers son besoin
- **Contenu** : Cards Construction / Agrandissement / Rénovation
- **Titre** : *"Ce que nous construisons pour vous"*
- **Motion** : Stagger reveal des cards

### 4. Section VR — Le différenciateur flagship
- **Objectif** : Créer un effet "wow", poser la différence face aux concurrents
- **Contenu** : Mise en scène immersive de la VR
- **Titre** : *"Voyez votre maison avant qu'elle existe."*
- **Copy** : Expliquer la VR comme outil unique — visualiser, ajuster, valider avant le premier coup de pelle
- **Motion** : Section scroll-jacked (GSAP ScrollTrigger), transition immersive
- **Visuel** : Vidéo ou animation montrant la transition plan 2D → rendu VR 3D

### 5. Notre processus
- **Objectif** : Lever l'objection "ça va être compliqué" — montrer la clarté du parcours
- **Contenu** : Timeline animée en 5 étapes
  1. Premier rendez-vous découverte
  2. Conception des plans
  3. Visualisation VR
  4. Chantier & suivi
  5. Remise des clés
- **Motion** : Scroll-driven timeline (GSAP)

### 6. Réalisations (preview)
- **Objectif** : Preuve sociale visuelle
- **Contenu** : 3-4 projets en grille ou carrousel
- **CTA** : "Voir toutes nos réalisations →"
- **Motion** : Hover reveal de détails sur les photos

### 7. Pourquoi Oryzon
- **Objectif** : Lever les objections sur la confiance
- **Contenu** : 5 arguments (interlocuteur unique, devis fixe, délais garantis, garantie décennale, matériaux éco)
- **Design** : Liste numérotée style éditorial, fond sombre ou fond chaud alternant

### 8. Témoignages
- **Objectif** : Preuve sociale humaine
- **Contenu** : 2-3 témoignages clients
- **Note** : À remplir avec de vrais témoignages au moment du lancement

### 9. FAQ
- **Objectif** : Lever les dernières objections avant le CTA final
- **Questions clés** :
  - Combien de temps dure la construction ?
  - Proposez-vous un contrat à prix fixe ?
  - Peut-on personnaliser les plans ?
  - Quelles garanties après travaux ?
  - Vous déplacez-vous dans tout le Calvados ?
- **Motion** : Accordéon animé (Framer Motion)

### 10. CTA Final
- **Objectif** : Convertir — dernier push avant la sortie
- **Titre** : *"Parlons de votre projet."*
- **Copy** : Message rassurant sur le sans-engagement du premier RDV
- **CTA** : "Prendre rendez-vous" → Calendly
- **Design** : Section plein fond sombre (--color-bg-dark), typographie large

---

## Objections adressées par la page
| Objection | Réponse dans la page |
|-----------|---------------------|
| "Prendre un RDV c'est s'engager" | Copy du CTA : RDV découverte sans engagement |
| "Je ne peux pas faire confiance à une entreprise que je connais pas" | Stats, témoignages, garanties, processus transparent |
| "C'est compliqué / stressant" | Section processus en 5 étapes claires |
| "Je ne sais pas à quoi ressemblera ma maison" | Section VR flagship |

---

## Notes / Brainstorm
- [ ] Trouver un angle éditorial fort pour le headline hero (A/B test possible)
- [ ] Le mot "découverte" dans le CTA est important pour désamorcer la friction d'engagement
- [ ] La section VR doit être le moment le plus mémorable du scroll — lui consacrer vraiment du soin
- [ ] Pour les témoignages : si pas encore de clients, envisager une citation d'Olivier lui-même sur sa philosophie
