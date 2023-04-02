import React from "react";
import axios from "axios";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { Comments as CommentsSection, AddCommentForm } from "@/components";

const postComponent = ({ post }) => {
  console.log("postComponent");
  if (post) {
    return (
      <Flex alignItems="center" justifyContent="center" bg="gray.100">
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
          <Heading as="h1" size="xl" mb={12}>
            {post.title}
          </Heading>
          <Text fontSize="lg" mb={4}>
            {post.body}
          </Text>
          <AddCommentForm post={post} />
          <CommentsSection comments={post.comments} />
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
