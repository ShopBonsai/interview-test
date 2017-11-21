// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBuyProduct = this.handleBuyProduct.bind(this);
  }

  handleBuyProduct = () => {
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size,
      id
    } = this.props;
    let product = { name, image, brand, color, description, price, size, id }
    product.qty = Number(this.inputQty.value);
    this.props.addToCart(product);
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
      id
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
          <div className="qty">
            <label>Quantity:</label>
            <input ref={(input) => { this.inputQty = input }} type="number" defaultValue={1}/>
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
