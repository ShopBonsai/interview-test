// Framework
import React, { PureComponent } from "react";

// Components

class CartProduct extends PureComponent {

  render() {
    const { id, image, name, price, selected, delCartItem } = this.props;

    return (
      <div className="card" >
        <img className="card-img-top" src={image} alt={name} />
        <div className="card-body text-center py-3">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: {price}</p>
          <p className="card-text">Quantity: {selected}</p>          
          <button className="btn btn-primary" onClick={() => {delCartItem(id)}} >Remove Item</button>
        </div>
      </div>
    );
  }
}

export default CartProduct;
