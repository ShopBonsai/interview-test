// Framework
import React, { Component } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import { Meteor } from "meteor/meteor";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Meteor.call("visits.logVisit", "Home", (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response);
      }
    });
    Meteor.call("visits.getPageCount", "Home", (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response);
      }
    });
  }

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
        </div>
      </Page>
    );
  }
}

export default Home;
