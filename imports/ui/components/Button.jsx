// Framework
import React from "react";

const Button = ({ children, onClick, className = "", block,...extraProps }) => {
  return (
    <button
      {...extraProps}
      className={`bonsai-button ${className} ${block? "block" : null}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
