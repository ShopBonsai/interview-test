// Framework
import React from "react";

const Like = ({ liked, onClick }) => {
  return (
    <button className={`like-button ${liked ? "liked" : ""}`} onClick={onClick}>
      ❤️
    </button>
  );
};

export default Like;
