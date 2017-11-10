// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  handleBuyProduct = () => {
    alert("This button does nothing!");
  };
  
  handleLikeProduct = () => {
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
          <Button onClick={this.handleBuyProduct}>
            Buy {name}
          </Button>
          <div>
          <Button onClick={this.handleLikeProduct}>
              <img src="http://flaticons.net/gd/makefg.php?i=icons/Election/Thumbs-Up.png&r=255&g=255&b=255" />
          </Button>
          </div>    
        </div>
        
      </div>
    );
  }
}

export default Product;
