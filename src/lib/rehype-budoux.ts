import type { HTMLProcessingParser } from "budoux";
import { loadDefaultJapaneseParser } from "budoux";
import type { Root } from "hast";
import { h } from "hastscript";
import { visit } from "unist-util-visit";

const defaultExcludeTagNames: string[] = ["pre", "code"];

interface Options {
  /**
   * The list of tag names to exclude from processing.
   * @default ["pre", "code"]
   */
  excludeTagNames?: string[];
}

let parser: HTMLProcessingParser | null = null;

const rehypeBudoux = ({
  excludeTagNames = defaultExcludeTagNames,
}: Options = {}) => {
  return (tree: Root) => {
    visit(tree, "text", (node, index, parent) => {
      if (
        index === undefined ||
        !parent ||
        node.value.trim().length <= 0 ||
        parent.type !== "element" ||
        excludeTagNames.includes(parent.tagName)
      ) {
        return;
      }
      if (!parser) {
        parser = loadDefaultJapaneseParser();
      }
      const parsed = parser
        .parse(node.value)
        .flatMap((value, i) => [
          ...(i > 0 ? [h("wbr")] : []),
          { type: "text" as const, value },
        ]);
      parent.children.splice(index, 1, ...parsed);
      if (parsed.length > 1) {
        parent.properties = {
          ...parent.properties,
          dataBudoux: true,
        };
      }
    });
  };
};

export default rehypeBudoux;
