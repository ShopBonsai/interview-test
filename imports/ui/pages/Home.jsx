// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  goBack = () => this.props.history.push("/");

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
          <br />
          <Button
            onClick={() => {
              this.props.history.push("/admin");
            }}
          >
            Administrator
          </Button>
        </div>
      </Page>
    );
  }
}

export default Home;
