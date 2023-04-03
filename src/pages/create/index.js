import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const BlogPostForm = () => {
  const [editorState, setEditorState] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { role, user } = useSelector((state) => state);
  const onSubmit = (data) => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    console.log(data, html);
  };
  if (role && (role == "author" || role == "admin"))
    return (
      <>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <h1>Create a Blog</h1>
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
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
            <label>Body</label>{" "}
            <Editor
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
