import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

import type { APIRoute } from "astro";
import MarkdownIt from "markdown-it";

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogPosts = await getCollection("blog");
  return rss({
    stylesheet: "/styles/rss.xsl",
    // `<title>` field in output xml
    title: "Fernando’s Blog",
    // `<description>` field in output xml
    description: "Un simple blog sobre mis pensamientos y experiencias",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map(({ data, slug, body }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `posts/${slug}`,
      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),

    // (optional) inject custom xml
    customData: `<language>es-mx</language>`,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
  });
};
