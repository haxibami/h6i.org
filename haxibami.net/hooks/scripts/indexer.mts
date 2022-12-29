import fs from "fs";

import prettier from "prettier";

import { getPostsData } from "./lib/fs.js";

import type { PostData } from "./lib/interface.js";

const articleIndexer = async () => {
  const blogs = await getPostsData("articles/blog");
  const grads = await getPostsData("articles/grad_essay");
  const blogIndex = blogs.map((item) => {
    const indexitem: PostData = {
      preview: item.preview,
      data: {
        slug: `${item.data?.slug}`,
        title: `${item.data?.title}`,
        date: item.data?.date,
        description: `${item.data?.description}`,
        tags: item.data?.tags,
      },
    };
    return indexitem;
  });
  const gradIndex = grads.map((item) => {
    const indexitem: PostData = {
      preview: item.preview,
      data: {
        slug: `${item.data?.slug}`,
        title: `${item.data?.title}`,
        date: item.data?.date,
        description: `${item.data?.description}`,
        tags: item.data?.tags,
      },
    };
    return indexitem;
  });

  const index = {
    articles: {
      blog: blogIndex,
      grad_essay: gradIndex,
    },
  };

  const formatted = (json: string) => prettier.format(json, { parser: "json" });

  fs.writeFileSync("src/share/index.json", formatted(JSON.stringify(index)));
};

const exp = () => {
  return new Promise<void>((resolve) => {
    articleIndexer();
    resolve();
  });
};

export default exp;
