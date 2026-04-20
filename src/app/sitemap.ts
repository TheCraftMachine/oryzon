import type { MetadataRoute } from "next";
import { getAllPosts } from "@/sanity/queries";
import { PROJECTS } from "@/data/projects";

const BASE = "https://oryzon.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/construire`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/renover`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/agrandir`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/realisations`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/notre-histoire`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,               lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/contact`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${BASE}/realisations/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug.current}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
