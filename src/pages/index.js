import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { Pagination, BlogPostGrid, Navbar } from "@/components";
export default function Home({ posts }) {
  const [page, setPage] = React.useState(1);
  const updatePage = (num) => {
    setPage(num);
  };
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
        <BlogPostGrid page={page} posts={posts} />
        <Pagination updatePage={updatePage} page={page} />
      </main>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const response = await axios.get("http://localhost:4000/posts");
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
