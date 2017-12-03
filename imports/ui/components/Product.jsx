// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";

// Components
import { Button } from "material-ui";

class Product extends Component {
  state = { loading: false };

  addToCart = () => {
    const { dispatch, cart } = this.props;
    this.setState({ loading: true });

    const product = {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      description: this.props.description,
      color: this.props.color,
      size: this.props.size,
      image: this.props.image,
      merchant: this.props.merchant,
      brand: this.props.brand,
      quantity: 1
    };

    if (cart.products.map(item => item.id).includes(this.props.id)) {
      Meteor.call(
        "carts.changeCartItemQuantity",
        cart._id,
        this.props.id,
        1,
        (err, response) => {
          if (!err) {
            dispatch({ type: "ADD_TO_CART", product });
            dispatch({
              type: "ALERT",
              message: `${product.name} has been added to your cart!`
            });
            this.setState({ loading: false });
          }
        }
      );
    } else {
      Meteor.call("carts.addToCart", cart._id, product, (err, response) => {
        if (!err) {
          dispatch({ type: "ADD_TO_CART", product });
          dispatch({
            type: "ALERT",
            message: `${product.name} has been added to your cart!`
          });
          this.setState({ loading: false });
        }
      });
    }
  };

  render() {
    const { name = "Product", image, brand, price, merchant } = this.props;
    const { loading } = this.state;

    const info = [
      { label: "Merchant", value: merchant },
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Price", value: price }
    ];

    return (
      <div className="product">
        <div className="details">
          <img alt={name} src={image} />
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
        </div>
        <Button color="primary" raised onClick={this.addToCart} disabled={loading}>
          Add to cart
        </Button>
      </div>
    );
  }
}

export default connect(state => state)(Product);
