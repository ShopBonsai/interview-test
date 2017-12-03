// Framework
import React, { PureComponent } from "react";

// React-Redux
import { connect } from "react-redux";

// Redux action
import { buyProduct } from "../redux/actions/purchase";
import { addToFavorites } from "../redux/actions/user";

// Components
import Button from "../components/Button.jsx";
import Like from "../components/Like.jsx";
class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      purchased: false,
      purchasedFailed: null
    };
  }

  handleBuyProduct = id => {
    this.props.buyProduct(id).then(res => {
      if (!res.error) {
        // Set state to show user that he has bought a product
        this.setState({ purchased: true });
        // Set default state
        setTimeout(this.setState.bind(this, { purchased: false }), 4000);
      } else {
        // Set state to show user that his purchased has failed
        this.setState({ purchasedFailed: true });
        // Set default state
        setTimeout(this.setState.bind(this, { purchasedFailed: false }), 4000);
      }
    });
  };

  handleLike = product => {
    this.props.likeProduct(product);
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
      liked,
      id
    } = this.props;

    const { purchased } = this.state;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];

    // Button name depends on user action
    const buttonName = purchased ? `Purchased` : `Buy ${name}`;

    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <Like liked={liked} onClick={this.handleLike.bind(this, id)} />
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
            className={purchased ? "success" : ""}
            onClick={this.handleBuyProduct.bind(this, { name, brand, size })}
          >
            {buttonName}
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyProduct: product => dispatch(buyProduct(product)),
    likeProduct: product => dispatch(addToFavorites(product))
  };
};

export default connect(null, mapDispatchToProps)(Product);
