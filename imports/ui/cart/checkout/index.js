// Framework
import React, { PureComponent } from "react";
import CheckoutComp from "./comp";

// define component
class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }
  submitHandler(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const values = {
      firstName: formData.get("firstName").toLowerCase(),
      lastName: formData.get("lastName").toLowerCase(),
      email: formData.get("email").toLowerCase(),
      username: formData.get("username"),
      password: formData.get("password"),
      passwordConfirm: formData.get("password-confirm"),
      unit: formData.get("address-unit").toLowerCase(),
      civic: formData.get("address-civic").toLowerCase(),
      city: formData.get("address-city").toLowerCase(),
      prov: formData.get("address-prov").toLowerCase(),
      postal: formData.get("address-postal").toLowerCase(),
      cardType: formData.get("card-type").toLowerCase(),
      cardholder: formData.get("cardholder").toLowerCase(),
      cardNumber: formData.get("card-number").toLowerCase(),
      expiry: formData.get("expiry").toLowerCase(),
      code: formData.get("code").toLowerCase()
    };
    console.log(values);
  }
  resetHandler(event) {
    const { currentTarget } = event;
    console.log(currentTarget);
  }
  render() {
    return React.createElement(CheckoutComp, {
      submitHandler: this.submitHandler,
      resetHandler: this.resetHandler
    });
  }
}

// export component
export default Checkout;
