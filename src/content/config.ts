import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image(),

      // relation
      author: z.string(),
      // relation
      tags: z.array(z.string()),
    }),
});

export const collections = {
  blog: blogCollection,
};
