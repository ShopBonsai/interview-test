// Framework
import React, { PureComponent } from "react";
import NumericInput from "react-numeric-input";
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
      {
        label: "Qty",
        value: <NumericInput min={1} max={quantity} value={1} />
      }
    ];

    const hasQty = quantity && quantity > 0;

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
          <Button
            disabled={!hasQty}
            className={`${hasQty ? "" : "disabled"}`}
            onClick={this.handleBuyProduct}
          >
            {hasQty ? `Buy ${name}` : `${name} Out of Stock`}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
