import React from "react";
import axios from "axios";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { Comments as CommentsSection } from "@/components";
const postComponent = ({ post }) => {
  if (post) {
    return (
      <Flex
        height="95vh"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <Box
          p={150}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          border="1px solid black"
          bg="white"
          minWidth="400px"
          maxW="800px"
        >
          <Heading as="h1" size="xl" mb={4}>
            {post.title}
          </Heading>
          <Text fontSize="lg">{post.body}</Text>
          <CommentsSection />
        </Box>
      </Flex>
    );
  } else {
    return <h1>Post Not Found</h1>;
  }
};

export default postComponent;
export async function getServerSideProps({ params }) {
  const postId = params.post;

  try {
    const response = await axios.get(`http://localhost:4000/posts/${postId}`);
    const post = await response.data;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}
