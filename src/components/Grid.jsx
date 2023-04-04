import { Grid, GridItem, Button, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPostGrid({ posts, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <Grid
        style={{ marginTop: "25px" }}
        templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={6}
      >
        {posts.slice(startIndex, endIndex).map((post) => (
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
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Button
          disabled={currentPage === 1}
          onClick={handlePreviousClick}
          mr={2}
        >
          Previous
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          ml={2}
        >
          Next
        </Button>
        <Box ml={2}>{`Page ${currentPage} of ${totalPages}`}</Box>
      </Box>
    </>
  );
}
