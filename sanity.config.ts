import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Oryzon")
          .items([
            S.listItem().title("Articles").schemaType("post").child(S.documentTypeList("post")),
            S.divider(),
            S.listItem().title("Auteurs").schemaType("author").child(S.documentTypeList("author")),
            S.listItem().title("Catégories").schemaType("category").child(S.documentTypeList("category")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
