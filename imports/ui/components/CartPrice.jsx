// Framework
import React from "react";

// Components

const stringPrice = ( dollarsInt ) => {
  let workArr = [];
  workArr.unshift( dollarsInt % 1000 );
  let remaining = Math.floor( dollarsInt / 1000 );
  if ( remaining > 0 ) {
    workArr.unshift( ...stringPrice(remaining));
  }
  return workArr.join(",");
}

const CartPrice = ( { total, checkout } ) => {

  let finalPrice = "";

  if ( total !== 0 ) {
    let cents = total % 100,
        dollars = Math.floor( total / 100 );
    finalPrice = stringPrice(dollars) + "." + cents;
  }  

  return (
    <div className="text-center py-3 price-total" >
      { total === 0 
        ? 
        <h5 className="card-title">Your cart is empty</h5> 
        : 
        <div>
          <h5 className="card-title">Total: ${finalPrice}</h5>
          <button className="btn btn-danger" onClick={checkout} >Checkout</button>
        </div> }
    </div>
  );
}

export default CartPrice;
