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
    const { name } = this.props;
    event.preventDefault();
    // if (!this.state.liked) {
    Meteor.call("likedProducts.addLikedProduct", name);
    //   this.setState(() => {
    //     liked: true;
    //   });
    // } else {
    // Meteor.call("likedProducts.removeLikedProduct", name);
    // }
  };
  removeLikedProduct = name => {
    Meteor.call("likedProducts.removeLikedProduct", name);
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
        <Button name={name} onClick={this.likeProduct}>
          Like
        </Button>
        <Button name={name} onClick={this.removeLikedProduct}>
          Remove
        </Button>
      </div>
    );
  }
}

export default Product;
