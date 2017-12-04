//framework
import React from "react";

//components
import CartInfo from "./CartInfo.jsx";
import CustomerInfo from "./CustomerInfo.jsx";

// stripe
import StripeCheckout from "react-stripe-checkout";

export default class TakeMoney extends React.Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    })
    // .then(response => {
      // response.json().then(data => {
        // alert(`We are in business, ${data.email}`);
    //   });
    // });
    //This has not yet been implemented
  };

  onClosed = () => {
    this.props.checkOrder(false);
  };

  render() {
    return (
      <div className="checkoutPage">
        <h2> Confirm Your Order </h2>
        <h3> Order details </h3>
        <p>
          order Id: {this.props.orderID}
        </p>
        <CartInfo
          CartInfo={this.props.CartInfo}
          getOrderTotal={this.props.getOrderTotal}
        />
        <h3>Your billing details</h3>
        <CustomerInfo customerInfo={this.props.customerInfo} />
        <div id="stripeBtn">
          <StripeCheckout
            name="Humble"
            currency="CAD"
            panelLabel={"Pay"}
            amount={this.props.orderTotal * 100}
            token={this.onToken}
            stripeKey="pk_test_AyOgE2kn5OEsNzQ6cgBGKvF5"
            closed={this.onClosed}
          />
        </div>
      </div>
    );
  }
}
