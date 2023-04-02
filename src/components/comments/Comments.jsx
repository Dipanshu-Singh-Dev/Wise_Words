import React from "react";
const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div>
      <h1>Comments : </h1>
      {comments.map((e) => {
        return (
          <>
            <h5>{e.username} said </h5>
            <p>{e.comment}</p>
          </>
        );
      })}
    </div>
  );
};

export default Comments;
