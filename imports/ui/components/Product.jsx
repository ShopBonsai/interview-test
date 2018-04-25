// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";
import Quantity from "../components/Quantity.jsx";
import Favorite from "../components/Favorite.jsx";

class Product extends PureComponent {

  onMinusClick = (item) => {
    this.props.onMinusClick();
  }

  onPlusClick = (item) => {
    this.props.onPlusClick();
  }

  onFavoriteClick= (item) => {
    console.log(item)
    this.props.onFavoriteClick(item.id)
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
          <Favorite onClick={()=>{this.onFavoriteClick(this.props.id)}} isFavorite={this.props.isFavorite} />
          <Quantity onPlusClick={this.onPlusClick} onMinusClick={this.onMinusClick} quantityInCart={this.props.quantityInCart}  />
        </div>
      </div>
    );
  }
}

export default Product;
