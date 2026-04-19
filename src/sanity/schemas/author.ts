import { defineField, defineType } from "sanity";

export const authorSchema = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Rôle", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio courte", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
