// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {

  createCart = () => {

    if (document.cookie == '') {
      Meteor.call("carts.createCart", (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
          document.cookie = `cartId=${response}`;
        }
      });
    }
    this.props.history.push("/shop");
  }

  render() {
    return (
      <Page>
        <div className="home-page">
          <h2 className="title">Welcome to our humble Shop</h2>
          <Button
            onClick={this.createCart}
          >
            Go shopping
          </Button>
        </div>
      </Page>
    );
  }
}

export default Home;
