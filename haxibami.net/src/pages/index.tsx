import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.scss'
//import  PlaceIcon from 'components/placeicon'
import { Tree } from 'components/tree'
import { Twitter, Instagram, Github, Bookmark, Book, Blog, Write, Poem, Spotify } from 'modules/svg'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>狂乱詞好: lyriqult</title>
        <meta name="description" content="haxibami's phylogenetic tree..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.tree}>
          <Tree></Tree>
          <div className={styles.icon_wrapper}>
            <Link href="/"><a>
              <Image className={styles.icon} src="/favicon.ico" alt="haxibami Logo" width={100} height={100} />
            </a></Link>
          </div>
          <div className={styles.Twitter_box}>
            <a href="https://twitter.com/haxibami">
              <div className={styles.Twitter_wrapper}>
                <Twitter className={styles.Twitter} alt="twitter" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Instagram_box}>
            <a href="https://instagram.com/haxibami">
              <div className={styles.Instagram_wrapper}>
                <Instagram className={styles.Instagram} alt="instagram" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Github_box}>
            <a href="https://github.com/haxibami">
              <div className={styles.Github_wrapper}>
                <Github className={styles.Github} alt="github" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Bookmark_box}>
            <a href="https://bookmeter.com/users/1025874">
              <div className={styles.Bookmark_wrapper}>
                <Bookmark className={styles.Bookmark} alt="bookmark" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Book_box}>
            <a href="https://haxibami.net/books">
              <div className={styles.Book_wrapper}>
                <Book className={styles.Book} alt="book" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Blog1_box}>
            <a href="https://haxibami.hatenablog.jp">
              <div className={styles.Blog1_wrapper}>
                <Blog className={styles.Blog1} alt="blog" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Blog2_box}>
            <a href="https://wowo-fishlife.hatenablog.jp">
              <div className={styles.Blog2_wrapper}>
                <Blog className={styles.Blog2} alt="blog" layout="fill" />
              </div>
            </a>
          </div>

          <div className={styles.Write_box}>
            <a href="https://kakuyomu.jp/users/haxibami">
              <div className={styles.Write_wrapper}>
                <Write className={styles.Write} alt="kakuyomu" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Poem_box}>
            <a href="https://utakatanka.jp/kajin/1102">
              <div className={styles.Poem_wrapper}>
                <Poem className={styles.Poem} alt="utakatanka" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Spotify_box}>
            <a href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w">
              <div className={styles.Spotify_wrapper}>
                <Spotify className={styles.Spotify} alt="spotify" layout="fill" />
              </div>
            </a>
          </div>
          {/*
          <PlaceIcon></PlaceIcon>*/}

        </div>
      </main>
      {/*
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/favicon.ico" alt="haxibami Logo" width={24} height={24} />
          </span>
        </a>
      </footer>*/}
    </div>
  )
}

export default Home
