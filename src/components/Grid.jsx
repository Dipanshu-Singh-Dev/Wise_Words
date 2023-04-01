import { Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";

export default function BlogPostGrid({ posts }) {
  console.log(posts);
  return (
    <Grid
      style={{ marginTop: "25px" }}
      templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={6}
    >
      {posts.map((post) => (
        <GridItem
          key={post.id}
          border="1px solid black"
          style={{ borderRadius: "5px" }}
          p={6}
          transition="all 0.1s"
          _hover={{ transform: "translateY(-2px)", cursor: "pointer" }}
        >
          <Link href={"/" + post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
}
