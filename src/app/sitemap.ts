import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

const BASE = "https://oryzon-lake.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                 lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/construire`,                 lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/renover`,                    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/agrandir`,                   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/realisations`,               lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/notre-histoire`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,                    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/mentions-legales`,           lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/politique-confidentialite`,  lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${BASE}/realisations/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
