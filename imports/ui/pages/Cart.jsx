// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
  }
  goBack = () => this.props.history.push("/shop");
  goCart = () => this.props.history.push("/cart");

  getOrder(order) {
    this.setState({ order: order });
    console.log(this.state.order)
  }

  render() {
    return (
      <Page pageTitle="Cart" history goBack={this.goBack} goCart={this.goCart}>
        <div className="home-page">
          <h2>
            This is the cart page {this.state.order}
          </h2>
          <Button
            onClick={() => {
              this.props.history.push("/shop");
            }}
          >
            Go shopping
          </Button>
        </div>
      </Page>
    );
  }
}

export default Home;
