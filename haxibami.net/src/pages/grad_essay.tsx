import { NextPage, InferGetStaticPropsType } from "next";
import { BlogItem, getAllPosts, getPostTags } from "lib/api";
import Styles from "styles/Blog.module.scss";
import Link from "next/link";
import { MdStrip } from "modules/parser";
import BlogHeader from "components/blogheader";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";
import Tiling from "components/tiling";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPostsPre = getAllPosts(
    ["slug", "title", "date", "tags", "content"],
    "grad_essay"
  );

  const taglists = getPostTags("grad_essay");

  const CreatePreview = async (post: BlogItem) => {
    const result = await MdStrip(post.content);
    post.content = result;
    return post;
  };

  const allPosts = await Promise.all(
    allPostsPre.map(async (item) => {
      const processed = await CreatePreview(item);
      return processed;
    })
  );

  const metaprops: MetaProps = {
    title: "トップ",
    sitename: "卒業文集",
    description: "haxibamiの卒業文集",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=卒業文集`),
    pageRelPath: "grad_essay",
    pagetype: "website",
    twcardtype: "summary",
  };

  return {
    props: { allPosts, taglists, metaprops },
  };
};

const GradEssayTop: NextPage<Props> = ({ allPosts, metaprops }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader />
        <main>
          <h2 className={Styles.BlogMenu}>
            <div className={Styles.CurrentFocus}>
              <Link href={"/grad_essay"}>
                <a>Articles</a>
              </Link>
            </div>{" "}
            <div>
              <Link href={"/grad_essay/tags"}>
                <a>Tags</a>
              </Link>
            </div>
          </h2>
          <Tiling allPosts={allPosts} relPath="grad_essay" />
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default GradEssayTop;
