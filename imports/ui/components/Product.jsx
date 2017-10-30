// Framework
import React, { PureComponent } from "react";
import { connect } from "react-redux";

// Actions
import * as actions from "../actions";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  render() {
    const {
      name = "Product",
      id,
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props.product;

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
          <Button onClick={() => this.props.addToCart(this.props.product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Product);
