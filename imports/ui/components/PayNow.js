// Framework
import React from "react";

const PayNow = ({
  cart,
  children,
  onClick,
  className = "",
  goBack,
  ...extraProps
}) => {
  let totalPrice = 0.0;

  if (cart && cart.products) {
    totalPrice = cart.products.reduce(
      (acc, product) => acc + product.price,
      0.0
    );
  } else {
    totalPrice = 0.0;
  }

  totalPrice = parseFloat(totalPrice).toFixed(2);

  return (
    <div>
      <div className="checkout">
        {`Cart : CA$${totalPrice}`}
      </div>
      {cart.status && cart.status === "Success"
        ? <div>
            Order Successfully Placed
            <button className={`bonsai-button ${className}`} onClick={goBack}>
              Shop More
            </button>
          </div>
        : <button
            {...extraProps}
            className={`bonsai-button ${className}`}
            onClick={onClick}
          >
            {children}
          </button>}
    </div>
  );
};

export default PayNow;
