// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
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
          <Button
            onClick={() => {
              this.props.history.push("/confirmation");
            }}
          >
            Add {name} to cart
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
