import { client } from "./client";
import type { Post, PostCard } from "./types";

const postCardFields = `
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage { asset, alt, caption },
  "readingTime": round(length(pt::text(body)) / 5 / 180),
  categories[]-> { _id, title, slug },
  author-> { _id, name, role, image { asset, alt } }
`;

export async function getAllPosts(): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      ${postCardFields}
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postCardFields},
      body,
      "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0..2] {
        ${postCardFields}
      }
    }`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      ${postCardFields}
    }`,
    { categorySlug }
  );
}

export async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug }`
  );
}
