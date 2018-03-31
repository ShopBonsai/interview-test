// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {

  checkout = () => this.props.history.push("/cart");

  register = () => this.props.history.push("/register");

  login = () => this.props.history.push("/login");

  userProfile = () => this.props.history.push("/profile");

  logout = (e) => {
    e.preventDefault();
    Meteor.logout((er) => {
      if(er){
        M.toast({html: er.reason, classes: 'rounded red', displayLength: '2000'});
      } else {
        M.toast({html: "Logout Successfully!", classes: 'rounded green', displayLength: '2000'});
        this.props.history.push("/shop");
      }
    })

  }

  render() {
    return (
      <Page history login={this.login} register={this.register} checkout={this.checkout} logout={this.logout} userProfile={this.userProfile}>
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
