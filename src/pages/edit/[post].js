import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { stateToHTML } from "draft-js-export-html";
import styles from "./index.module.css";
import { Editor, EditorState, convertFromHTML } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";
// const Editor = dynamic(
//   () => import("react-draft-wysiwyg").then((module) => module.Editor),
//   {
//     ssr: false,
//   }
// );
const toolbar = {
  options: ["inline", "list"],
  inline: {
    options: ["bold", "italic", "underline"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
};

const BlogPostForm = ({ post }) => {
  const { role, user } = useSelector((state) => state);
  const [editorState, setEditorState] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    console.log(data.title, html);
    const requestData = { author: user, title: data.title, body: html };
    try {
      const response = await axios.post(
        "http://localhost:4000/posts",
        requestData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // if (role && (role == "author" || role == "admin"))
  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a Blog</h1>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            defaultValue={post.title}
            style={{
              border: "1px solid lightgray",
              height: "30px",
              width: "300px",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
            {...register("title", { required: true })}
          />
          {errors.title && <span style={{ color: "red" }}>Required</span>}
        </div>
        <div>
          <label>Body</label>
          <Editor
            toolbar={toolbar}
            editorStyle={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              padding: "25px",
            }}
            editorState={editorState}
            onEditorStateChange={(state) => setEditorState(state)}
          />
          {errors.title && <span style={{ color: "red" }}>Required</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
  return <h1>Not Authorized</h1>;
};

export default BlogPostForm;
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
