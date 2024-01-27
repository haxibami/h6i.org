import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import purgecss from "astro-purgecss";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkRuby from "remark-denden-ruby";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";

import rehypeAstroImageFigure from "./src/lib/rehype-astro-image-figure";
import rehypePagefind from "./src/lib/rehype-pagefind";
import remarkAstroImageOpt from "./src/lib/remark-astro-image-opt";
import remarkFootnoteTitle from "./src/lib/remark-footnote-title";
import remarkLinkcard from "./src/lib/remark-link-card";

export default defineConfig({
  integrations: [
    mdx(),
    solid({
      exclude: ["**/OgImage/**"],
    }),
    sitemap(),
    purgecss({
      fontFace: true,
    }),
  ],
  build: {
    format: "file",
  },
  prefetch: {
    defaultStrategy: "viewport",
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [
      remarkGemoji,
      remarkMath,
      remarkRuby,
      remarkLinkcard,
      //         [
      //           remarkToc,
      //           {
      //             heading: "目次",
      //             tight: true,
      //             maxDepth: 3,
      //             parents: ["root", "listItem"],
      //           },
      //         ],
      remarkFootnoteTitle,
      remarkAstroImageOpt,
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: "戻る",
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: h("span.heading-link-icon", {
            title: "リンク",
          }),
        },
      ],
      [
        rehypeMermaid,
        {
          strategy: "inline-svg",
          mermaidConfig: {
            fontFamily: "monospace",
          },
          launchOptions: {
            channel: "chrome",
          },
        },
      ],
      rehypeKatex,
      rehypeAstroImageFigure,
      [
        rehypePrettyCode,
        {
          theme: {
            light: "poimandres",
            dark: "rose-pine",
          },
          grid: true,
        },
      ],
      rehypePagefind,
    ],
  },
  site: "https://www.haxibami.net",
});
