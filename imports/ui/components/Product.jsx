// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";
import IconButton from "material-ui/IconButton";

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
        <div className="meta-container">
          <div className="meta-wrapper">
            <p className="price">
              {"$" + price}
            </p>
            <p className="brand">
              {brand}
            </p>
            <p className="price">
              {lodash.startCase(lodash.toLower(name))}
            </p>
          </div>
          <i
            onClick={this.likeProduct}
            className={
              !this.state.liked
                ? "ion-ios-heart-outline icon-button"
                : "ion-ios-heart icon-button"
            }
          />
        </div>

        <Button name={name} onClick={this.handleBuyProduct}>
          Add to Cart
        </Button>
      </div>
    );
  }
}

export default Product;
