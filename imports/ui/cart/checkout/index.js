// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import CheckoutComp from "./comp";
import helpers from "../../../helpers";
import calls from "../../../helpers/calls";

// define component
class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  async submitHandler(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const orderData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      passwordConfirm: formData.get("password-confirm"),
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
    const validEmail = helpers.validateEmail(orderData.email);
    const validCard = helpers.validateCard(orderData);
    const validPasswords = helpers.validatePasswords(orderData);
    if (validEmail && validCard) {
      const builtOrder = helpers.buildOrder(
        orderData,
        this.props.cartItems,
        this.props.orderStatus,
        this.props.profileTypes,
        this.props.products
      );
      // console.log("%c TEST", "color: yellow; font-size: 1rem", builtOrder);

      // insert customer profile
      const customer = await calls.insertCustomer(
        Meteor,
        builtOrder.customerProfile
      );

      // build and insert final order
      const order = {
        customer,
        products: builtOrder.products,
        destination: builtOrder.destination,
        status: builtOrder.orderStatus
      };
      const orderId = await calls.insertOrder(Meteor, order);

      // add order to customer profile
      const added = await calls.addOrderToCustomer(customer, orderId);

      // check for exisiting user account with order email
      const existingUserId = await calls.checkForAccount(
        Meteor,
        orderData.email
      );

      // add new user account if user email doesnt have account already
      if (!existingUserId) {
        // insert new user with default username as email, and default password
        const newUser = {
          email: orderData.email,
          username: orderData.email,
          password: "asdfasfd",
          profile: customer
        };
        // if username and meail supplied, set newUser username and password
        if (orderData.username.length > 2 && orderData.password.length >= 8) {
          newUser.username = orderData.username;
          newUser.password = orderData.password;
        }
        const userId = await calls
          .insertUser(Meteor, newUser)
          .then(id => {
            alert("Order placed successfully. Thanks for shopping at Bonsai!");
            currentTarget.reset();
            this.props.resetCart();
            this.props.resetUi();
            return this.props.history.push("/shop");
          })
          .catch(err =>
            alert("Order could not be created. Please try again later.")
          );
      } else {
        // user already exisits
        if (orderId.length !== 0 && added === 1) {
          alert("Order placed successfully. Thanks for shopping at Bonsai!");
          const dropped = await calls.dropQuantities(
            Meteor,
            builtOrder.products
          );
          currentTarget.reset();
          this.props.resetCart();
          this.props.resetUi();
          return this.props.history.push("/shop");
        }
        return alert("Order could not be created. Please try again later.");
      }
    }
  }
  render() {
    return React.createElement(CheckoutComp, {
      submitHandler: this.submitHandler
    });
  }
}

// export component
export default Checkout;
