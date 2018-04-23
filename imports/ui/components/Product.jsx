// Framework
import React, { Component } from "react";

// Components
import BuyForm from "../components/BuyForm.jsx";

class Product extends Component {

  constructor(){
    super();
    this.state = {
      selected: 1
    }
  }

  handleSelect = (e) => {
    this.setState({
      selected: e.target.value
    });
  }

  handleBuyProduct = (e) => {
    e.preventDefault();
    this.props.addToCart({...this.props, selected: this.state.selected});
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
      quantity
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
          <BuyForm quantity={quantity} handleBuyProduct={this.handleBuyProduct} handleSelect={this.handleSelect} selected={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default Product;
