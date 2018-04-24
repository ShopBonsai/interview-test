// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  render() {
    return (
      <Page>
        <div className="home-page">
          <h2 className="title">Welcome to our humble Shop</h2>
          <Button
            onClick={() => {
              this.props.history.push("/shop");
            }}
          >
            Go shopping
          </Button>
          <Button
            onClick={() => {
              this.props.history.push("/orders");
            }}
          >
            Past Orders
          </Button>
          <Button
            onClick={() => {
              this.props.history.push("/profile");
            }}
          >
            Profile
          </Button>
        </div>
      </Page>
    );
  }
}

export default Home;
