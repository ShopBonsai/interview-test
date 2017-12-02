// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import CartPage from "../components/CartPage.jsx";
import CartInfo from "../components/CartInfo.jsx";
import UserForm from "../components/UserForm.jsx";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      error: null,
      finished: false,
      stepIndex: 0,
      orderID: null
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

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    let { order } = this.state;
    let { orderID } = this.state;

    switch (stepIndex) {
      case 0:
        return <CartInfo CartInfo={order} />;
      case 1:
        return <UserForm OrderID={orderID} />;
      case 2:
        return "This is the bit I really care about!";
      default:
        return "You're a long way from home sonny jim!";
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
                <StepLabel>Enjoy!</StepLabel>
              </Step>
            </Stepper>
            <div style={contentStyle}>
              {finished
                ? <p>
                    <a
                      href="#"
                      onClick={event => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                    >
                      Click here
                    </a>{" "}
                    to reset the example.
                  </p>
                : <div>
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
                        onClick={this.handleNext}
                      />
                    </div>
                  </div>}
            </div>
          </div>

          {/* ^this is the Material UI */}

          <div />
        </div>
      </CartPage>
    );
  }
}

export default Cart;
