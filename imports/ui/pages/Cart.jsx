// Framework
import React, { PureComponent } from "react";
import { withRouter } from "react-router";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import CartPage from "../components/CartPage.jsx";
import CartInfo from "../components/CartInfo.jsx";
import UserForm from "../components/UserForm.jsx";
import StripeCheckout from "../components/StripeCheckout.js";

//Material UI
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

//database
import { Customers } from "../../api/customers/collection";

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      customerInfo: null,
      error: null,
      finished: false,
      order: [],
      orderComplete: true,
      orderID: null,
      orderTotal: 0,
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      userPostalCode: null,
      userAddress: null,
      userSpecialNote: null,
      stepIndex: 0
    };
  }

  componentWillMount() {
    const { order } = this.state;

    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
        console.log(error);
      } else {
        let array = [];
        let Id = null;
        for (key in response) {
          array.push(response[key]);
        }
        array.splice(-1, 1);
        this.setState({ order: array });
        this.setState({ orderID: response._id });
      }
    });
  }
  goBack = () => this.props.history.push("/shop");
  goCart = () => this.props.history.push("/cart");
  goShop = () => this.props.history.push("/shop");

  checkOrder = status => {
    this.setState({ orderComplete: status });
  };
  addUser = UserInfo => {
    try {
      Customers.insert(UserInfo);
    } catch (error) {
      throw new Meteor.Error("there was an error", error);
    }
  };

  getCustomerInfo = OrderID => {
    let customerInfo = Customers.findOne({ Orders: OrderID });
    this.setState({ customerInfo: customerInfo });
    console.log(customerInfo);
  };

  handleNext = () => {
    const {
      stepIndex,
      userFirstName,
      userLastName,
      userEmail,
      userAddress,
      userPostalCode,
      userSpecialNote,
      orderID,
      orderTotal
    } = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
    if (stepIndex === 0) {
      this.setState({ orderTotal });
    } else if (
      stepIndex === 1 &&
      userFirstName &&
      userLastName &&
      userEmail &&
      userAddress &&
      userPostalCode
    ) {
      let UserInfo = {
        FirstName: userFirstName,
        LastName: userLastName,
        Email: userEmail,
        Address: userAddress,
        PostalCode: userPostalCode,
        SpecialNote: userSpecialNote,
        Orders: orderID
      };
      this.addUser(UserInfo);
      this.getCustomerInfo(orderID);
    } else if (
      stepIndex === 1 &&
      (!userFirstName ||
        !userLastName ||
        !userEmail ||
        !userAddress ||
        !userPostalCode)
    ) {
      alert("Oops, did you forget to enter something?");
      this.setState({
        stepIndex: 1
      });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getUserFirstName = userInfo => {
    this.setState({ userFirstName: userInfo });
  };
  getUserLastName = userInfo => {
    this.setState({ userLastName: userInfo });
  };
  getUserEmail = userInfo => {
    this.setState({ userEmail: userInfo });
  };
  getUserPostalCode = userInfo => {
    this.setState({ userPostalCode: userInfo });
  };
  getUserAddress = userInfo => {
    this.setState({ userAddress: userInfo });
  };
  getSpecialNote = userInfo => {
    this.setState({ userSpecialNote: userInfo });
  };
  getOrderTotal = orderInfo => {
    this.state.orderTotal = orderInfo;
  };

  getStepContent(stepIndex) {
    let { order, orderID, orderTotal, customerInfo } = this.state;

    switch (stepIndex) {
      case 0:
        return <CartInfo CartInfo={order} getOrderTotal={this.getOrderTotal} />;
      case 1:
        return (
          <UserForm
            getUserFirstName={this.getUserFirstName}
            getUserLastName={this.getUserLastName}
            getUserEmail={this.getUserEmail}
            getUserPostalCode={this.getUserPostalCode}
            getUserAddress={this.getUserAddress}
            getSpecialNote={this.getSpecialNote}
          />
        );
      case 2:
        return (
          <StripeCheckout
            orderTotal={orderTotal}
            CartInfo={order}
            getOrderTotal={this.getOrderTotal}
            orderID={orderID}
            customerInfo={customerInfo}
            checkOrder={this.checkOrder}
          />
        );
      default:
        return "Oops How did you get here?";
    }
  }

  render() {
    const { finished, stepIndex, order } = this.state;
    const contentStyle = { margin: "0 16px" };

    return (
      <CartPage pageTitle="Cart" history goBack={this.goBack}>
        <div className="CartHomePage">
          {/* this is the Material UI stepper */}
          <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Confirm your order</StepLabel>
              </Step>
              <Step>
                <StepLabel>Where should we send it to?</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pay and Enjoy!</StepLabel>
              </Step>
            </Stepper>
            <div style={contentStyle}>
              <div>
                {this.getStepContent(stepIndex)}
                <div style={{ marginTop: 12 }}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? "Finish" : "Next"}
                    primary={true}
                    disabled={
                      stepIndex === 2 ? this.state.orderComplete : false
                    }
                    onClick={stepIndex === 2 ? this.goShop : this.handleNext}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ^this is the Material UI */}

          <div />
        </div>
      </CartPage>
    );
  }
}

export default withRouter(Cart);
