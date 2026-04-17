# Page : Blog `/blog` et `/blog/[slug]`

## Objectif
Traffic SEO organique via du contenu à valeur ajoutée. Les articles positionnent Oryzon comme expert local et captent des visiteurs en phase de recherche d'information (haut de funnel).

## Thèmes d'articles prioritaires

### Construction
- "Comment construire sa maison à Caen en 2025 : guide complet"
- "Prix de construction d'une maison individuelle en Calvados"
- "Permis de construire à Caen : tout ce qu'il faut savoir"
- "Maison sur mesure vs maison en kit : quelle différence ?"
- "Quelles zones sont constructibles autour de Caen ?"

### Rénovation
- "Rénover une maison ancienne en Normandie : par où commencer ?"
- "MaPrimeRénov 2025 : comment en profiter pour votre rénovation ?"
- "Acheter pour rénover à Caen : avantages et pièges à éviter"

### Agrandissement
- "Extension de maison en Calvados : ce que dit le PLU"
- "Surélévation vs extension de plain-pied : comment choisir ?"
- "Aménager ses combles à Caen : guide pratique"

### Réalité Virtuelle
- "La réalité virtuelle dans la construction : comment ça marche ?"
- "Pourquoi visualiser sa maison en VR avant de construire ?"

## Structure d'un article
- Introduction avec la question clé
- Corps structuré (H2/H3)
- Photos / illustrations
- CTA en milieu et fin d'article : "Vous avez un projet ? Parlons-en."
- Auteur : Olivier (crédibilité)

## Implémentation technique — Sanity

**Pourquoi Sanity :**
- Studio d'édition clé-en-main (Olivier écrit sans toucher au code)
- Free tier généreux (10k documents, CDN inclus)
- Support natif Next.js App Router (`next-sanity`)
- GROQ pour les requêtes typées
- Live preview en développement

**Setup :**
- `@sanity/client` + `next-sanity` dans le projet Next.js
- Sanity Studio déployé sur `studio.oryzon.fr` (ou `/studio` en route parallèle)
- Schema : `post` (titre, slug, auteur, date, contenu portable, image de couverture, catégorie, metadescription)
- Structured data : `BlogPosting` + `Person` (auteur)
- ISR : `revalidate` sur webhook Sanity → Next.js on-demand revalidation

**Workflow Olivier :**
1. Il se connecte sur `studio.oryzon.fr`
2. Il crée/modifie un article (éditeur WYSIWYG)
3. Il publie → webhook déclenche revalidation automatique du site

---

## Notes / Brainstorm
- [ ] Les articles locaux (Caen, Calvados) = meilleure opportunité SEO, concurrence modérée
- [ ] Catégories Sanity : Construction | Rénovation | Agrandissement | Guides | Réglementation
- [ ] Envisager des guides PDF téléchargeables pour la capture d'email (ex: "Guide de la construction en Calvados")
