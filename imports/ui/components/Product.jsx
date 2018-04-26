// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";
import Quantity from "../components/Quantity.jsx";
import Favorite from "../components/Favorite.jsx";

class Product extends PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isFavorite !== this.props.isFavorite || nextProps.quantityInCart !== this.props.quantityInCart;
  }

  onMinusClick = (item) => {
    this.props.onMinusClick();
  }

  onPlusClick = (item) => {
    this.props.onPlusClick();
  }

  onFavoriteClick= (item) => {
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
      size,
      onMinusClick,
      onPlusClick,
      onFavoriteClick,
      isFavorite,
      quantityInCart,
      authenticated
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
          {authenticated ? <Favorite onClick={onFavoriteClick} isFavorite={isFavorite}  /> : null }
          <Quantity onPlusClick={onPlusClick} onMinusClick={onMinusClick} quantityInCart={quantityInCart}  />
        </div>
      </div>
    );
  }
}

export default Product;
