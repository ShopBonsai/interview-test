// Framework
import React from "react";

// Components
import Button from "../components/Button.jsx";

const BuyForm = ({ name, quantity, handleBuyProduct, handleSelect, selected }) => {

  const options = ( quantity ) => {
    let output = [];
    for ( let i = 1 ; i <= quantity ; i ++ ) {
      output.push(<option key={i}>{i}</option>)
    };
    return output;
  }

  return (
    <form onSubmit={handleBuyProduct} >
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <select className="form-control" id="quantity" value={selected} onChange={handleSelect} >
          { options(quantity) }
        </select>
      </div>
      <Button>
        Add to cart
      </Button>
    </form>
  );
};

export default BuyForm;
