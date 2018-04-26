// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderQuantity: 1
    };
  };

  handleBuyProduct = () => {
    alert("This button does nothing!");
  };

  //MARK: handle purchase quantity of each product
  reduceQuantityNum = () => {
    let orderQuantity = this.state.orderQuantity - 1;
    //VALIDATION: order quantity cannot be less than or equal to 0
    if (orderQuantity > 0) {
      this.setQuantityToState(orderQuantity);
    }
  }

  increaseQuantityNum = () => {
    let orderQuantity = this.state.orderQuantity + 1;
    //VALIDATION: cannot order more than stock
    if (orderQuantity <= this.props.quantity) {
      this.setQuantityToState(orderQuantity);
    }
  }

  setQuantityToState = ( orderQuantity ) => {
    this.setState(() => ({ orderQuantity: orderQuantity }));
  };

  render() {
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size,
      quantity
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];

    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <div className="info">
            {info.map(({ label, value }) =>
              <div className="info-row" key={`${name}-${label}-${value}`}>
                <div className="label">
                  {label}:
                </div>
                <div className="value">
                  {value}
                </div>
              </div>
            )}
          </div>
          <div className="quantity">
            <Button className="quan-btn btn btn-info" onClick={this.reduceQuantityNum}>
              --
            </Button>
            <div className="quantity-num">
              {this.state.orderQuantity}
            </div>
            <Button className="quan-btn btn btn-info" onClick={this.increaseQuantityNum}>
              +
            </Button>
            <div className="max-quantity">
              {quantity} available
            </div>
          </div>
          <Button onClick={this.handleBuyProduct}>
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
