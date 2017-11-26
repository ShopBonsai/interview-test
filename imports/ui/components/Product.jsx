// Framework
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import * as Currency from "currency-formatter";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  handleBuyProduct = (e) => {
    e.stopPropagation();
    this.props.addToCart(1);
  };

  render() {
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: Currency.format(price, { locale: "en-CA" }) }
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

Product.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  brand: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  size: PropTypes.string
};

export default Product;
