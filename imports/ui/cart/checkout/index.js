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
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      unit: formData.get("address-unit"),
      civic: formData.get("address-civic"),
      city: formData.get("address-city"),
      prov: formData.get("address-prov"),
      postal: formData.get("address-postal"),
      cardType: formData.get("card-type"),
      cardholder: formData.get("cardholder"),
      cardNumber: formData.get("card-number"),
      expiry: formData.get("expiry"),
      code: formData.get("code")
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
