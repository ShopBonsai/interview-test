// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";
import Quantity from "../components/Quantity.jsx";

class ProductInline extends PureComponent {

  onMinusClick = (item) => {
    this.props.onMinusClick();
  }

  onPlusClick = (item) => {
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
      <div className="product" style={{width:"100%"}}>
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
