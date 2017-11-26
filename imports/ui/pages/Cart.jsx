// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  goBack = () => this.props.history.push("/shop");
  goCart = () => this.props.history.push("/cart");

  render() {
    return (
      <Page pageTitle="Cart" history goBack={this.goBack} goCart={this.goCart}>
        <div className="home-page">
          <h2>This is the cart page</h2>
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
