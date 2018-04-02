// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Button from "../components/Button.jsx";

let total = 0;

class Cart extends Component {
  goBack = () => this.props.history.push("/shop");

  handleCheckout = () => {
    return alert("Demo ends here");
  }


  printCart() {
    let getCookiebyName = function(name){
      let pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
      return !!pair ? pair[1] : null;
    };

    const cart = JSON.parse(getCookiebyName("cart"));
    let prod_lst = [];
    total = 0;
    if(cart == null){
      return [];
    }
    for(let i = 0; i < cart.length; i++){
       prod_lst.push(<Product name={cart[i].name} image={cart[i].image} brand={cart[i].brand} color={cart[i].color}
        description={cart[i].description} buttonActive={false} price={cart[i].price} quantity={cart[i].quantity} size={cart[i].size} key={i} />)
        total += (cart[i].price * cart[i].quantity);
    }

    return prod_lst;
  }

  render() {

    return (
      <Page pageTitle="cart" history goBack={this.goBack}>
        <div className="shop-page">
          {this.printCart()}
          <div className="product">
            TOTAL: {total}
            {<Button onClick={this.handleCheckout}>
            Checkout
          </Button>}
            </div>
        </div>
      </Page>
    );
  }
}

export default Cart;
