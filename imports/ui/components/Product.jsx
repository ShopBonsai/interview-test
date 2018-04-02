// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Button from "../components/Button.jsx";


//Product Name  Brand Color Size  QTY Price
class Product extends PureComponent {
  handleBuyProduct = () => {
    product = {
      name: this.props.name,
      brand: this.props.brand,
      color: this.props.color,
      size: this.props.size,
      qty: 1,
      price: this.props.price
    }

    if (document.cookie == '') {
      Meteor.call("carts.createCart", (error, response) => {
        if (error) {
          console.log(error);
        } else {
          document.cookie = `cartId=${response}`;
          Meteor.call(`carts.addProductToCart`, params, (error, response) => {
            if (error) {
              console.log(error);
            } else {
              console.log(response);
            }
          });
        }
      });
    } else {
      let cookie = document.cookie.split('=')[1];
      let params = {
        cartId: cookie,
        product: product
      }
      Meteor.call(`carts.addProductToCart`, params, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      });
    }
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
        </div>
      </div>
    );
  }
}

export default Product;
