import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostsByCategory, getAllCategories } from "@/sanity/queries";
import type { Category } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import type { PostCard } from "@/sanity/types";
import GoldButton from "@/components/ui/GoldButton";

export const revalidate = 60;

const BASE = "https://oryzon.fr";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}): Promise<Metadata> {
  const { categorie } = await searchParams;
  const categories = await getAllCategories();
  const activeCategory = categories.find(
    (c: Category) => c.slug?.current === categorie
  );

  const title = activeCategory
    ? `Blog ${activeCategory.title} – Conseils construction & rénovation en Calvados`
    : "Blog – Conseils construction, rénovation & maison individuelle en Calvados";
  const description =
    "Conseils, tendances et retours d'expérience de trente ans de chantiers en Calvados. Découvrez les articles d'Oryzon, constructeur de maisons individuelles à Caen.";
  const canonical = activeCategory
    ? `${BASE}/blog?categorie=${activeCategory.slug.current}`
    : `${BASE}/blog`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      locale: "fr_FR",
      siteName: "Oryzon",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── JSON-LD ───────────────────────────────────────────────────────────────────

function BlogJsonLd({ posts }: { posts: PostCard[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE}/blog`,
    name: "Blog Oryzon",
    description:
      "Conseils, tendances et retours d'expérience de trente ans de chantiers en Calvados.",
    url: `${BASE}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Oryzon",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.png`,
      },
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${BASE}/blog/${p.slug.current}`,
      datePublished: p.publishedAt,
      description: p.excerpt ?? "",
      author: p.author
        ? { "@type": "Person", name: p.author.name }
        : { "@type": "Organization", name: "Oryzon" },
      image: p.mainImage
        ? urlFor(p.mainImage).width(1200).height(630).url()
        : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Article à la une — image plein fond, texte superposé ──────────────────────

function FeaturedCard({ post }: { post: PostCard }) {
  const img = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(900).fit("crop").url()
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="relative rounded-[1.75rem] overflow-hidden bg-[#0D1117]" style={{ aspectRatio: "16/7" }}>

        {/* Image */}
        {img ? (
          <Image
            src={img}
            alt={post.mainImage?.alt ?? post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        )}

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/50 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <div className="flex items-end justify-between gap-6 w-full">
          <div className="max-w-2xl min-w-0">

            <div className="flex items-center gap-3 mb-4">
              {post.categories?.[0] && (
                <span className="rounded-full border border-white/20 bg-white/8 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/70">
                  {post.categories[0].title}
                </span>
              )}
              <time className="text-white/35 text-xs" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingTime && (
                <>
                  <span className="text-white/15 text-xs">·</span>
                  <span className="text-white/35 text-xs">{post.readingTime} min de lecture</span>
                </>
              )}
            </div>

            <h2
              className="font-display text-white mb-4 group-hover:text-[#C49A5A] transition-colors duration-300"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-6 max-w-lg">
                {post.excerpt}
              </p>
            )}

            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#C49A5A]/30 ring-1 ring-[#C49A5A]/40 flex items-center justify-center font-display text-[#C49A5A] text-[10px]" aria-hidden>
                  {post.author.name.charAt(0)}
                </div>
                <span className="text-white/45 text-xs">{post.author.name}</span>
              </div>
            )}
          </div>

          {/* Arrow — anchored to the right edge */}
          <span className="shrink-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:bg-[#C49A5A] group-hover:border-[#C49A5A] group-hover:text-white transition-all duration-300">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Carte standard ────────────────────────────────────────────────────────────

function PostCard({ post }: { post: PostCard }) {
  const img = post.mainImage
    ? urlFor(post.mainImage).width(700).height(460).fit("crop").url()
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block h-full">
      <div className="rounded-[1.5rem] overflow-hidden bg-white ring-1 ring-black/6 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col h-full">

        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden bg-[#0D1117]/5 shrink-0">
          {img ? (
            <Image
              src={img}
              alt={post.mainImage?.alt ?? post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] to-[#1a2332]" />
          )}
          {post.categories?.[0] && (
            <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-white/75">
              {post.categories[0].title}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-2 mb-3">
            <time className="text-[11px] text-black/30" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime && (
              <>
                <span className="text-black/15 text-[10px]">·</span>
                <span className="text-[11px] text-black/30">{post.readingTime} min</span>
              </>
            )}
          </div>

          <h2
            className="font-display text-black/85 mb-3 group-hover:text-[#C49A5A] transition-colors duration-300 flex-1"
            style={{ fontSize: "1.1rem", letterSpacing: "-0.025em", lineHeight: 1.25 }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-black/40 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-black/6 mt-auto">
            {post.author ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C49A5A]/15 flex items-center justify-center text-[9px] font-display text-[#C49A5A]" aria-hidden>
                  {post.author.name.charAt(0)}
                </div>
                <span className="text-xs text-black/35">{post.author.name}</span>
              </div>
            ) : <div />}
            <span className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-black/25 group-hover:bg-[#C49A5A] group-hover:border-[#C49A5A] group-hover:text-white transition-all duration-300 shrink-0">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;

  const [allPosts, categories] = await Promise.all([
    categorie ? getPostsByCategory(categorie) : getAllPosts(),
    getAllCategories(),
  ]);

  const activeCategory = categories.find(
    (c: Category) => c.slug?.current === categorie
  );

  const [featured, ...rest] = allPosts;

  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">
      <BlogJsonLd posts={allPosts} />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="bg-[#0D1117] px-6 md:px-12 pt-32 pb-20 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #C49A5A 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-8">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Le blog Oryzon
          </span>
          <h1 className="font-display text-white mb-5" style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Construire mieux,<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>comprendre pourquoi.</em>
          </h1>
          <p className="text-white/40 text-base max-w-lg leading-relaxed">
            Conseils, tendances et retours d'expérience de trente ans de chantiers en Calvados.
          </p>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">

        {/* Categories filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/25 mr-2">Thèmes</span>
            <Link
              href="/blog"
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                !activeCategory
                  ? "border-[#C49A5A] bg-[#C49A5A]/8 text-[#C49A5A]"
                  : "border-black/10 bg-black/4 text-black/50 hover:bg-black/8"
              }`}
            >
              Tous
            </Link>
            {categories.map((c: Category) => {
              const isActive = c.slug?.current === categorie;
              return (
                <Link
                  key={c._id}
                  href={`/blog?categorie=${c.slug?.current}`}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "border-[#C49A5A] bg-[#C49A5A]/8 text-[#C49A5A]"
                      : "border-black/10 bg-black/4 text-black/50 hover:bg-black/8"
                  }`}
                >
                  {c.title}
                </Link>
              );
            })}
          </div>
        )}

        {allPosts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-black/25 text-sm mb-2">
              {activeCategory
                ? `Aucun article dans la catégorie « ${activeCategory.title} ».`
                : "Aucun article pour le moment."}
            </p>
            {activeCategory && (
              <Link href="/blog" className="text-[#C49A5A] text-xs hover:underline">
                Voir tous les articles →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-16">

            {/* À la une */}
            {featured && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/25 mb-5">
                  {activeCategory ? `À la une — ${activeCategory.title}` : "À la une"}
                </p>
                <FeaturedCard post={featured} />
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/25 mb-6">
                  {activeCategory ? `Tous les articles — ${activeCategory.title}` : "Tous les articles"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div className="bg-[#0D1117] px-6 md:px-12 py-24 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-8">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Votre projet
          </span>
          <h2 className="font-display text-white mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Des questions sur<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>votre construction ?</em>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed mb-10">
            On répond à toutes vos questions en rendez-vous. Gratuit, sans engagement.
          </p>
          <GoldButton href="/contact" size="xl">Prendre rendez-vous</GoldButton>
        </div>
      </div>

    </div>
  );
}
