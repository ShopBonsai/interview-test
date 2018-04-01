// Framework
import React, { PureComponent } from "react";
import StarRatingComponent from 'react-star-rating-component';

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  constructor() {
    super();

    this.state = {
      rating: 0
    };
  }
  handleBuyProduct = () => {
    alert("This button does nothing!");
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    console.log(prevValue)
    console.log(nextValue)
    console.log(name)
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
            <div className="info-row">
              <div className="label"> Rating:
              </div>
                <StarRatingComponent 
                  name={name}
                  starCount={5}
                  value={this.state.rating}
                  onStarClick={this.onStarClick.bind(this)}
                />
            </div>
          </div>
          <Button onClick={this.handleBuyProduct}>
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
