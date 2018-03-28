// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  handleBuyProduct = () => {
    alert("This button does nothing!");
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
        return <Button onClick={this.handleBuyProduct}>
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
          <div>
            <HandleDisplayButton />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
