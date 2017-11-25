import React from "react";

const Cart = ({ children, onClick, className = "", ...extraProps }) => {
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

export default Cart;
