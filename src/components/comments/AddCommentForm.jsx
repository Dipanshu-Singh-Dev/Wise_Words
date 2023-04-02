import { useForm } from "react-hook-form";

export default AddCommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.username, data.comment);
    // do something with the username and comment data, such as submitting it to a server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Username:
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <span>This field is required</span>}
      </label>
      <label>
        Comment:
        <textarea {...register("comment", { required: true })} />
        {errors.comment && <span>This field is required</span>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
