import React from "react";
import axios from "axios";
import Link from "next/link";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { Comments as CommentsSection, AddCommentForm } from "@/components";
import parse from "html-react-parser";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const PostComponent = ({ post }) => {
  let { title, body } = post;
  const router = useRouter();
  const { role, user } = useSelector((state) => state);
  const [Body, setBody] = React.useState(body);
  const edit =
    role == "admin" || (role == "author" && user == post.author) ? (
      <Link href={`/edit/${post.id}`}>
        <button>Edit</button>
      </Link>
    ) : null;
  const handleDelete = () => {
    try {
      axios
        .delete(`http://localhost:4000/posts/${post.id}`)
        .then(() => router.replace("/"));
    } catch (error) {
      console.error(error);
    }
  };
  const deleteBlog =
    role == "admin" || (role == "author" && user == post.author) ? (
      <button onClick={handleDelete}>Delete</button>
    ) : null;

  React.useEffect(() => {
    setBody(parse(body));
  }, []);
  if (post) {
    return (
      <>
        <Flex className={styles.flex} direction="row" bg="gray.100" gap={10}>
          <Box
            p={50}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            border="1px solid black"
            bg="white"
            minWidth="20vw"
            maxW="800px"
          >
            <Heading as="h1" size="xl" mt={8} mb={16}>
              {title} by <span style={{ color: "gray" }}>{post.author}</span>
            </Heading>
            {Body}
            <br />
            {deleteBlog}
            {edit}
          </Box>
          <Flex gap={10} direction="column">
            <Box
              p={50}
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
              border="1px solid black"
              bg="white"
              minWidth="200px"
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
              minWidth="200px"
              maxW="800px"
            >
              <CommentsSection comments={post.comments} />
            </Box>
          </Flex>
        </Flex>
      </>
    );
  } else {
    return <h1>Post Not Found</h1>;
  }
};

export default PostComponent;
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
