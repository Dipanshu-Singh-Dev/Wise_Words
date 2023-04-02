import { Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";

export default function BlogPostGrid({ posts, page }) {
  const start = (page - 1) * 10;
  const end = page * 10 - 1;
  console.log(start, end);
  return (
    <Grid
      style={{ marginTop: "25px" }}
      templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={6}
    >
      {posts.map((post, index) => {
        if (index <= end && index >= start)
          return (
            <GridItem
              key={post.id}
              border="1px solid black"
              style={{ borderRadius: "5px" }}
              p={6}
              transition="all 0.1s"
              _hover={{ transform: "translateY(-2px)", cursor: "pointer" }}
            >
              <Link href={"/post/" + post.id}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </Link>
            </GridItem>
          );
      })}
    </Grid>
  );
}
