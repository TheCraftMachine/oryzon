import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
};

export type Author = {
  _id: string;
  name: string;
  role?: string;
  image?: SanityImage;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
};

export type PostCard = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: Category[];
  author?: Author;
  readingTime?: number;
};

export type Post = PostCard & {
  body: PortableTextBlock[];
  relatedPosts?: PostCard[];
};
