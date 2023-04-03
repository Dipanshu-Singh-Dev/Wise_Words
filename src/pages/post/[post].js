import React from "react";
import axios from "axios";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { Comments as CommentsSection, AddCommentForm } from "@/components";

const postComponent = ({ post }) => {
  console.log("postComponent");
  if (post) {
    return (
      <Flex direction="row" justifyContent="center" bg="gray.100" gap={10}>
        <Box
          p={50}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          border="1px solid black"
          bg="white"
          minWidth="400px"
          maxW="800px"
        >
          <Heading as="h1" size="xl" mt={8} mb={16}>
            {post.title}
          </Heading>
          <Text fontSize="lg" mt={8} mb={16}>
            {post.body}
          </Text>
        </Box>
        <Flex gap={10} direction="column">
          <Box
            p={50}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            border="1px solid black"
            bg="white"
            minWidth="400px"
            maxW="800px"
          >
            <AddCommentForm post={post} />
          </Box>

          <Box
            p={50}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            border="1px solid black"
            bg="white"
            minWidth="400px"
            maxW="800px"
          >
            <CommentsSection comments={post.comments} />
          </Box>
        </Flex>
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
