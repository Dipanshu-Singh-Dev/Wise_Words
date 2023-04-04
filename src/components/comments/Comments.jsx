import React from "react";
const Comments = ({ comments }) => {
  // console.log(comments);
  return (
    <div>
      <h1>Comments : </h1>
      {comments &&
        comments.map((e) => {
          return (
            <>
              <h6>{e.username} said </h6>
              <p>{e.comment}</p>
            </>
          );
        })}
    </div>
  );
};

export default Comments;
