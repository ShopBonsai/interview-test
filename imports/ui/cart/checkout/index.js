// Framework
import React, { PureComponent } from "react";
import CheckoutComp from "./comp";
import helpers from "../../../helpers";

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
    const orderData = {
      // firstName: formData.get("firstName"),
      // lastName: formData.get("lastName"),
      // email: formData.get("email"),
      // username: formData.get("username"),
      // password: formData.get("password"),
      // passwordConfirm: formData.get("password-confirm"),
      // unit: formData.get("address-unit"),
      // civic: formData.get("address-civic"),
      // city: formData.get("address-city"),
      // prov: formData.get("address-prov"),
      // postal: formData.get("address-postal"),
      // cardType: formData.get("card-type"),
      // cardholder: formData.get("cardholder"),
      // cardNumber: formData.get("card-number"),
      // expiry: formData.get("expiry"),
      // code: formData.get("code")
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: "",
      passwordConfirm: "",
      unit: formData.get("address-unit"),
      civic: formData.get("address-civic"),
      city: formData.get("address-city"),
      prov: formData.get("address-prov"),
      postal: formData.get("address-postal"),
      cardType: "visa",
      cardholder: formData.get("cardholder"),
      cardNumber: "1234567812345678",
      expiry: "2018-08",
      code: "321"
    };
    // console.log(orderData);
    const validated = helpers.validateOrder(orderData);
    console.log(validated);
    if (validated) {
      const builtOrder = helpers.buildOrder(
        orderData,
        this.props.cartItems,
        this.props.products,
        this.props.profileTypes,
        this.props.orderStatus,
        this.props.customers
      );
      console.log(builtOrder);
    }
    console.log("exited");
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
