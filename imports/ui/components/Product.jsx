// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

const OUT_OF_STOCK = "Out of Stock";
const QUANTITY_THRESHOLD = 5;

class Product extends PureComponent {
  handleBuyProduct = (outOfStock = false) => {
    if (outOfStock) {
      alert("Sorry! This product is out of stock!");
    } else {
      this.props.addtocart(this.props);
    }
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
            {!this.props.readOnly
              ? quantity > 0 && quantity < QUANTITY_THRESHOLD
                ? <div
                    className="info-row orange"
                    key={`${name}-quantity-${quantity}`}
                  >
                    {`Only ${quantity} left in stock`}
                  </div>
                : ""
              : <div
                  className="info-row"
                  key={`${name}-quantity-${this.props.quantity}`}
                >
                  <div className="label">Quantity:</div>
                  <div className="value">
                    {this.props.quantity}
                  </div>
                </div>}
          </div>
          {!this.props.readOnly
            ? <Button
                className={quantity > 0 ? "" : "inactive"}
                onClick={
                  quantity > 0
                    ? () => this.handleBuyProduct(false)
                    : () => this.handleBuyProduct(true)
                }
              >
                {quantity > 0 ? `Buy ${name}` : OUT_OF_STOCK}
              </Button>
            : ""}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Product;
