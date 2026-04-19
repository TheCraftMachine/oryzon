import { authorSchema } from "./author";
import { categorySchema } from "./category";
import { postSchema } from "./post";

export const schema = {
  types: [postSchema, authorSchema, categorySchema],
};
