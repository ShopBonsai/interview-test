// Framework
import React from "react";

const Button = ({ children, onClick, className = "", ...extraProps }) => {
  return (
    <button
      {...extraProps}
      className={`bonsai-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
