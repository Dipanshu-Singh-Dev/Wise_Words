import { useForm } from "react-hook-form";
import styles from "./AddCommentForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
const AddCommentForm = ({ post }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, comment }) => {
    const commentsArr = post.comments || [];
    commentsArr.push({
      username,
      comment,
    });
    axios
      .patch(`http://localhost:4000/posts/${post.id}`, {
        ...post,
        comments: commentsArr,
      })
      .then(() => {
        router.replace(router.asPath);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h2 className={styles.h2}>Add a comment</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && <span style={{ color: "red" }}>Required</span>}
        </label>
        <label className={styles.label}>
          Comment:
          <input
            className={styles.textarea}
            {...register("comment", { required: true })}
          />
          {errors.comment && <span style={{ color: "red" }}>Required</span>}
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default AddCommentForm;
