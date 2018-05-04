// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      liked: false
    };
  }

  handleBuyProduct = () => {
    alert("This button does nothing!");
  };

  likeProduct = event => {
    const { name, brand, price } = this.props;
    event.preventDefault();
    if (!this.state.liked) {
      this.setState(() => ({
        liked: true
      }));
      Meteor.call("likedProducts.addLikedProduct", name, brand, price);
    } else {
      this.setState(() => ({
        liked: false
      }));
      Meteor.call("likedProducts.removeLikedProduct", name, brand, price);
    }
  };

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
          <Button name={name} onClick={this.handleBuyProduct}>
            Buy {name}
          </Button>
        </div>
        <Button onClick={this.likeProduct}>
          {!this.state.liked ? "Like" : "Unlike"}
        </Button>
      </div>
    );
  }
}

export default Product;
