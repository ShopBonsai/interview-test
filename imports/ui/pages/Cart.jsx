// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import CartProduct from "../components/CartProduct";
import CartPrice from "../components/CartPrice";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: null
    };
  }

  componentWillMount() {
    Meteor.call("carts.getCart", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ items: response.items }));
      }
    });
  }

  goBack = () => this.props.history.push("/shop");

  delCartItem = ( itemId ) => {
    Meteor.call("carts.delCartItem", itemId, (error, response) => {
      if (error) {
        // need some testing to have better error handling
        // don't see the point of setting to state, really only
        // need a one time alert telling the user what went wrong
        // instead of changing the state of the application
        console.log(error);
        alert(error);
      } else {
        this.setState({ items: response.items });
      }
    });
  }

  checkout = () => {
    alert("this function is currently not implemented");
  }

  render() {
    const { items, error } = this.state;

    let total = items.reduce((accu, item) => {
      accu += ( ( ( item.price * 100 ) * item.selected ) );
      return accu;
    }, 0);

    return (
      <Page pageTitle="cart" history goBack={this.goBack}>
        <div className="cart-page text-center">
          <CartPrice total={total} checkout={this.checkout} />
          {this.state.items.map(({ id, ...product }) =>
            <CartProduct {...product} key={id} id={id} delCartItem={this.delCartItem} />
          )}
        </div>
      </Page>
    );
  }
}

export default Cart;
