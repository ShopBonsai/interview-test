// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      quantityAdded: 1
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }
  
  handleAddBtn = () => {
    let quantityOrdered = this.state.quantityAdded;
    this.props.handleAddBtn(this.props, quantityOrdered);
  }

  // quantity input by a user
  handleQuantityChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({ quantityAdded: value });
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
      { label: "Price", value: "CDN$ " + price.toFixed(2) },
      { label: "In Stock", value: quantity ? quantity + " unit(s)": "Sold Out" }
    ];
    
    // Display button sold out if quantity is 0
    // Otherwise display button add
    const HandleDisplayButton = () => {
      if (!quantity) {
        return <Button className="bonsai-button-sold-out">
                SOLD OUT
               </Button>
      } else {
        return <Button onClick={this.handleAddBtn}>
                ADD TO CART
               </Button>
      }
    }

    
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
          <div className="quantity-container">
            <label className="quantity-label">Quantity:</label>
            <input type="number" className="quantity-input" value={this.state.quantityAdded} onChange={this.handleQuantityChange} min="0" />
          </div>
          <div>
            <HandleDisplayButton />          
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
