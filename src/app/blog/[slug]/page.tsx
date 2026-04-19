import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPostBySlug, getAllPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { PostCard } from "@/sanity/types";
import GoldButton from "@/components/ui/GoldButton";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

export const revalidate = 60;

const BASE = "https://oryzon.fr";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const ogImage = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt ?? `Article de blog Oryzon : ${post.title}`,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? `Article de blog Oryzon : ${post.title}`,
      type: "article",
      url: `${BASE}/blog/${slug}`,
      locale: "fr_FR",
      siteName: "Oryzon",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : ["Oryzon"],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Portable Text ─────────────────────────────────────────────────────────────

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[1.8] text-black/65 mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        className="font-display text-black/85 mt-14 mb-5 relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#C49A5A]"
        style={{ fontSize: "clamp(1.35rem, 2vw, 1.7rem)", letterSpacing: "-0.025em", lineHeight: 1.2 }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-display text-black/75 mt-10 mb-4"
        style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: 1.3 }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 px-8 py-6 rounded-2xl bg-[#C49A5A]/6 border-l-2 border-[#C49A5A]">
        <p
          className="font-display text-black/70 not-italic"
          style={{ fontSize: "1.2rem", lineHeight: 1.6, letterSpacing: "-0.015em" }}
        >
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-black/85">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C49A5A] underline underline-offset-4 decoration-[#C49A5A]/40 hover:decoration-[#C49A5A] transition-all"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1200).fit("max").url();
      return (
        <figure className="my-10 -mx-6 md:-mx-12 lg:mx-0">
          <div className="rounded-none lg:rounded-[1.25rem] overflow-hidden">
            <Image
              src={src}
              alt={value.alt ?? ""}
              width={1200}
              height={700}
              className="w-full object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-black/30 mt-3 px-6 lg:px-0">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// ── Related card ──────────────────────────────────────────────────────────────

function RelatedCard({ post }: { post: PostCard }) {
  const img = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(600).height(400).fit("crop").url()
    : null;
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="rounded-[1.5rem] overflow-hidden bg-white ring-1 ring-black/6 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300">
        <div className="relative aspect-[3/2] overflow-hidden bg-[#0D1117]/5">
          {img && (
            <Image
              src={img}
              alt={post.title}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
        </div>
        <div className="p-5">
          <time className="text-[11px] text-black/30 block mb-2">{formatDate(post.publishedAt)}</time>
          <h3
            className="font-display text-black/80 group-hover:text-[#C49A5A] transition-colors duration-300"
            style={{ fontSize: "1rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}
          >
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const heroImg = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1600).height(800).fit("crop").url()
    : null;

  const ogImage = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? "",
    url: `${BASE}/blog/${post.slug.current}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: ogImage ? [ogImage] : undefined,
    author: post.author
      ? { "@type": "Person", name: post.author.name, jobTitle: post.author.role }
      : { "@type": "Organization", name: "Oryzon", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Oryzon",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug.current}` },
    ...(post.categories?.length
      ? { keywords: post.categories.map((c) => c.title).join(", ") }
      : {}),
  };

  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#0D1117] overflow-hidden" style={{ minHeight: "65vh" }}>

        {heroImg ? (
          <>
            <Image
              src={heroImg}
              alt={post.mainImage?.alt ?? post.title}
              fill priority sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/55 to-[#0D1117]/10" />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        )}

        <div className="relative z-10 flex flex-col justify-end min-h-[65vh] px-6 md:px-12 pb-16 pt-32">
          <div className="max-w-3xl mx-auto w-full">



            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.categories?.map((c) => (
                <span key={c._id} className="rounded-full border border-white/20 bg-white/8 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/70">
                  {c.title}
                </span>
              ))}
              <time className="text-white/30 text-xs">{formatDate(post.publishedAt)}</time>
              {post.readingTime && (
                <>
                  <span className="text-white/15">·</span>
                  <span className="text-white/30 text-xs">{post.readingTime} min de lecture</span>
                </>
              )}
            </div>

            <h1
              className="font-display text-white mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {post.title}
            </h1>

            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C49A5A]/25 ring-1 ring-[#C49A5A]/40 flex items-center justify-center font-display text-[#C49A5A] text-sm">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium">{post.author.name}</p>
                  {post.author.role && <p className="text-white/30 text-[10px]">{post.author.role}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body + Sidebar ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-16">

          {/* Article */}
          <article className="max-w-[680px]">

            {/* Lead / excerpt */}
            {post.excerpt && (
              <p
                className="text-black/70 leading-relaxed mb-10 pb-10 border-b border-black/8"
                style={{ fontSize: "1.2rem", letterSpacing: "-0.01em", lineHeight: 1.7 }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Body */}
            <PortableText value={post.body} components={components} />

            {/* Author card */}
            {post.author && (
              <div className="mt-16 rounded-2xl bg-white ring-1 ring-black/6 p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#C49A5A]/15 ring-1 ring-[#C49A5A]/30 flex items-center justify-center font-display text-[#C49A5A] text-lg shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display text-black/80 text-base mb-0.5" style={{ letterSpacing: "-0.02em" }}>
                    {post.author.name}
                  </p>
                  {post.author.role && (
                    <p className="text-[#C49A5A] text-xs mb-3">{post.author.role}</p>
                  )}
                  <p className="text-black/40 text-sm leading-relaxed">
                    Équipe Oryzon — constructeur de maisons individuelles en Calvados depuis 1994.
                  </p>
                </div>
              </div>
            )}

            {/* Footer nav */}
            <div className="mt-10 pt-8 border-t border-black/8 flex items-center justify-between flex-wrap gap-4">
              <Link href="/blog" className="inline-flex items-center gap-2 text-black/35 text-sm hover:text-black/60 transition-colors group">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Retour au blog
              </Link>
              <GoldButton href="/contact" size="md">Démarrer mon projet</GoldButton>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-4">

              {/* Article meta */}
              <div className="rounded-2xl bg-white ring-1 ring-black/6 p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/25 mb-5">À propos de cet article</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-black/30 uppercase tracking-[0.12em] mb-1">Publié le</p>
                    <p className="text-sm text-black/70 font-medium">{formatDate(post.publishedAt)}</p>
                  </div>
                  {post.readingTime && (
                    <div>
                      <p className="text-[10px] text-black/30 uppercase tracking-[0.12em] mb-1">Lecture</p>
                      <p className="text-sm text-black/70 font-medium">{post.readingTime} min</p>
                    </div>
                  )}
                  {post.categories && post.categories.length > 0 && (
                    <div>
                      <p className="text-[10px] text-black/30 uppercase tracking-[0.12em] mb-2">Catégories</p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.categories.map((c) => (
                          <span key={c._id} className="rounded-full border border-black/10 bg-black/4 px-2.5 py-1 text-[11px] text-black/50">
                            {c.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA sidebar */}
              <div className="rounded-2xl bg-[#0D1117] p-6 relative overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }} />
                <div className="relative z-10">
                  <div className="w-6 h-6 rounded-lg bg-[#C49A5A]/15 flex items-center justify-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#C49A5A]" />
                  </div>
                  <p className="font-display text-white text-base mb-2" style={{ letterSpacing: "-0.02em" }}>
                    Votre projet vous attend
                  </p>
                  <p className="text-white/35 text-xs leading-relaxed mb-5">
                    Premier rendez-vous gratuit, sans engagement.
                  </p>
                  <GoldButton href="/contact" size="sm" className="w-full justify-center">
                    Prendre rendez-vous
                  </GoldButton>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* ── Related posts ──────────────────────────────────────────── */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="border-t border-black/6 bg-white px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/25">À lire aussi</p>
              <Link href="/blog" className="text-xs text-black/35 hover:text-black/60 transition-colors">
                Voir tous les articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {post.relatedPosts.map((p) => (
                <RelatedCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
