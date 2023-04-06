import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { BlogPostGrid, Navbar } from "@/components";
import { useSelector } from "react-redux";
export default function Home({ posts }) {
  const router = useRouter();
  const { role, username } = useSelector((state) => state);

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
