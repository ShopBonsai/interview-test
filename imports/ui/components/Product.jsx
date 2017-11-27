// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Components
import Button from "./Button.jsx";
import QuantitySelector from "./QuantitySelector.jsx";

//database
import { Orders } from "../../api/orders/collection";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quanitity: 0,
      currentOrder: {}
    };
  }

  onQuantitySelect(quantity) {
    this.setState({ quanitity: quantity });
  }

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

    let order = { title: "Ricky is awesome" };

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
          <span>
            quantity {this.state.quanitity}
          </span>
          <span>
            name {name}
          </span>
          <span>
            price {price}
          </span>

          <MuiThemeProvider>
            <QuantitySelector
              onQuantitySelect={this.onQuantitySelect.bind(this)}
            />
          </MuiThemeProvider>
          <br />
          <Button
            onClick={() => {
              try {
                return Orders.insert(order);
              } catch (error) {
                throw new Meteor.Error("there was an error", error);
              }
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
