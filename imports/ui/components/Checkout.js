// Framework
import React from "react";

const Checkout = ({
  cart,
  children,
  onClick,
  className = "",
  ...extraProps
}) => {
  return (
    <div>
      <div className="checkout">
        {`Cart : ${cart && cart.products
          ? cart.products.reduce((acc, product) => acc + product.quantity, 0)
          : 0} Items`}
      </div>
      <button
        {...extraProps}
        className={`bonsai-button ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Checkout;
