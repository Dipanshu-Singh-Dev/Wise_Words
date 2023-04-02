import { useForm } from "react-hook-form";
import styles from "./AddCommentForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
const AddCommentForm = ({ post }) => {
  console.log(post);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, comment }) => {
    post.comments.push({
      username,
      comment,
    });
    axios
      .patch(`http://localhost:4000/posts/${post.id}`, {
        ...post,
        comments: post.comments,
      })
      .then((response) => {
        router.replace(router.asPath);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h2>Add a comment</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Username:
          <input
            className={styles.input}
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && <span>This field is required</span>}
        </label>
        <label className={styles.label}>
          Comment:
          <input
            className={styles.textarea}
            {...register("comment", { required: true })}
          />
          {errors.comment && <span>This field is required</span>}
        </label>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
export default AddCommentForm;
