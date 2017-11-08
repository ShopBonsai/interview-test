// Framework
import { withHistory, Link } from 'react-router-dom';
import React, { PureComponent } from "react";
import Shop from "../pages/Shop.jsx";
import { Orders } from "../../api/orders/collection.js";
import { Accounts } from 'meteor/accounts-base';
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  handleBuyProduct = () => {
    // get value of search upon purchase
    var search_cont = document.getElementById("search").value;
    if(search_cont.length > 0 && Meteor.userId() !== null){
      Meteor.users.update({_id: Meteor.userId()}, {$push: {searches: search_cont}})
    }
    // check if user is signed in
      if(Meteor.userId() !== null){
        if (this.props.quantity > 0){
          let quantity = 1;
          let cart = this.props;
          // add product to orders
          Orders.insert({
            belongsTo: Meteor.userId(),
            name: cart.name,
            size: cart.size,
            price: cart.price,
            quantity: quantity
          }, alert("1 item Added to Cart"))
        } else {
          alert("Out of Stock")
        }
      }else{
        alert("You must be logged in first")
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
      // ,
      // quantity
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size }
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
