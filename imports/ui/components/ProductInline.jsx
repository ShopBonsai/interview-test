// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";
import Quantity from "../components/Quantity.jsx";

class ProductInline extends PureComponent {

  onMinusClick = (item) => {
    console.log("need to reduce quantity by 1")
    this.props.onMinusClick();
  }

  onPlusClick = (item) => {
    console.log("need to increase quantity by 1")
    this.props.onPlusClick();
  }

  render() {
    const {
      name = "Product",
      brand,
      price,
      quantityInCart
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Price", value: price },
      { lable: "Total Cost", value:price*quantityInCart}
    ];

    return (
      <div className="product">
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
          <Quantity onPlusClick={this.onPlusClick} onMinusClick={this.onMinusClick} quantityInCart={quantityInCart}  />
        </div>
        <hr/>
      </div>
    );
  }
}

export default ProductInline;
