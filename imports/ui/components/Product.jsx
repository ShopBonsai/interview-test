// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

const cartOrders = []

class Product extends PureComponent {

  handleBuyProduct = (e) => {
    e.preventDefault();
    sweetAlert(this.props.name + ' has been added to your cart.')
    cartOrders.push(this.props)
    console.log(cartOrders)
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
      quantity,
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price },
      { label: "Quantity", value: quantity },
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
          <Button onClick={this.handleBuyProduct}>
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
