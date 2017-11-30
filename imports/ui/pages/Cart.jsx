// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import CartPage from "../components/CartPage.jsx";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      error: null,
      finished: false,
      stepIndex: 0
    };
  }

  componentWillMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
        console.log(error);
      } else {
        this.setState(() => ({ order: response }));
        console.log(this.state.order[0].name);
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
    switch (stepIndex) {
      case 0:
        return (
          <table class="table table-hover table-bordered">
          <thead>
            <th>Food Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Sub Total</th>
          </thead>
          <tbody id="order-details">
          </tbody>
        </table>
        );
      case 1:
        return "What is an ad group anyways?";
      case 2:
        return "This is the bit I really care about!";
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: "0 16px" };

    let { order } = this.state;
    return (
      <CartPage pageTitle="Cart" history goBack={this.goBack}>
        <div className="CartHomePage">
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
                    <p>
                      {this.getStepContent(stepIndex)}
                    </p>
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
          <div>
            {/* {order[0].name} */}
            {/* {order.map((item, i) => <div key={i}> {item.name}  
                      {item.price} {item.quantity}</div>)} */}
            {/* {this.state.order[0]} */}
          </div>
        </div>
      </CartPage>
    );
  }
}

export default Home;
