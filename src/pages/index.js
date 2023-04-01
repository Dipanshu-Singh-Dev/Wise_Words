import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import BlogPostGrid from "@/components/Grid";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Wise Words</title>
        <meta name="description" content="Blogs of wise people" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <BlogPostGrid posts={posts} />
      </main>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "http://localhost:4000/posts?_page=1&_limit=12"
    );
    const posts = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts,
      },
    };
  }
}
