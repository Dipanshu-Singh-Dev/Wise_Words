import { useForm } from "react-hook-form";
import styles from "./AddCommentForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const AddCommentForm = ({ post }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ comment }) => {
    const commentsArr = post.comments || [];
    commentsArr.push({
      username: user,
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
