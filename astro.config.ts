import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeD2 from "@beoe/rehype-d2";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import purgecss from "astro-purgecss";
import type { Element } from "hast";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkRuby from "remark-denden-ruby";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import { SITE } from "./src/lib/constant";
import rehypeBudoux from "./src/lib/rehype-budoux";
import remarkFootnoteTitle from "./src/lib/remark-footnote-title";
import remarkImagePlaceholder from "./src/lib/remark-image-placeholder";
import remarkLinkcard from "./src/lib/remark-link-card";

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ["github-dark-default", "github-light-default"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
      },
      styleOverrides: {
        borderRadius: "0",
        borderColor: "var(--item-border)",
        borderWidth: "1px",
        codeBackground: "var(--code-bg)",
      },
      shiki: {
        langs: [
          async () =>
            await fetch(
              "https://raw.githubusercontent.com/caddyserver/vscode-caddyfile/refs/heads/master/syntaxes/caddyfile.tmLanguage.json",
            ).then((res) => res.json()),
          async () =>
            await fetch(
              "https://raw.githubusercontent.com/omBratteng/vscode-nftables/refs/heads/main/src/nft.json",
            ).then((res) => res.json()),
        ],
      },
    }),
    mdx(),
    sitemap(),
    purgecss({
      fontFace: false,
      variables: false,
      keyframes: true,
      safelist: {
        standard: [/:hover$/],
        variables: [
          "--font-mono",
          "--code-bg",
          "--uchu-yang",
          "--uchu-yang-raw",
        ],
      },
    }),
  ],
  build: {
    format: "file",
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [
      remarkGemoji,
      remarkMath,
      remarkRuby,
      remarkLinkcard,
      remarkFootnoteTitle,
      remarkImagePlaceholder,
    ],
    remarkRehype: {
      footnoteLabel: " ",
      footnoteBackLabel: "戻る",
      footnoteLabelTagName: "hr",
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeUnwrapImages,
      (...args) =>
        rehypeAutolinkHeadings({
          ...args,
          behavior: "append",
          properties(node: Element) {
            return {
              "aria-labelledby": node.properties.id,
              class: "heading-link",
            };
          },
          content: h("span.heading-link-icon", {
            title: "リンク",
          }),
        }),
      rehypeBudoux,
      (...args) =>
        rehypeKatex({
          ...args,
          trust: true,
          strict: false,
        }),
      [
        rehypeD2,
        {
          strategy: "file",
          fsPath: "public/beoe",
          webPath: "/beoe",
          d2Options: {
            theme: 0,
            darkTheme: 200,
          },
        },
      ],
    ],
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  site: SITE.href,
});
