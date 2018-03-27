// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  handleBuyProduct = () => {
    alert("This button does nothing!");
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
      { label: "Price", value: price },
      { label: "In Stock", value: quantity ? quantity + " unit(s)": "Sold Out" }
    ];
        // <img alt={name} src={image} />

    return (
      <div className="product">
        <aside>{quantity ? null : "SOLD OUT"}</aside>
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
