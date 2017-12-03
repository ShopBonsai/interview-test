// Framework
import React from "react";

const Like = ({liked, className, onClick}) => {
  return <button className={`like-button ${liked} ? 'liked' : '' ${className}`} onClick={onClick}>
    ❤️
  </button>
}

export default Like;
