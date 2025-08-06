import path from "node:path";
import type { Image, Root } from "mdast";
import type { FormatEnum } from "sharp";
import { visit } from "unist-util-visit";

import { getBlur } from "./api";

interface Options {
  /**
   * The directory where the images are stored, relative to `src` directory.
   * @default "./assets/image"
   * */
  imgDir: string;
  /**
   * The size of the placeholder image.
   * @default 8
   * */
  size: number;
  /**
   * The format of the placeholder image.
   * @default "webp"
   * */
  format: keyof FormatEnum;
}

const remarkImagePlaceholder = ({
  imgDir = "./assets/image",
  size = 8,
  format = "webp",
}: Partial<Options> = {}) => {
  return async (tree: Root) => {
    const imgs: Image[] = [];

    visit(tree, "image", (node) => {
      if (node.url.startsWith("http")) {
        return;
      }
      imgs.push(node);
    });

    await Promise.all(
      imgs.map(async (node) => {
        const basename = path.basename(node.url);
        const buffer = await Bun.file(
          path.join(process.cwd(), "./src", imgDir, basename),
        ).arrayBuffer();

        const base64 = await getBlur(Buffer.from(buffer), size, format);

        // attributes for <img>
        node.data = {
          ...node.data,
          hProperties: {
            placeholder: base64,
          },
        };
      }),
    );
  };
};

export default remarkImagePlaceholder;
