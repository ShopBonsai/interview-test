// Framework
import React, { Component } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";
import { setUser, clearUser } from "../store/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageView: 0
    };
  }

  componentWillMount() {
    let userName = this.props.user.profile
      ? this.props.user.profile.name
      : "anon";
    Meteor.call("visits.logVisit", "Home", userName, (error, response) => {
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
        this.setState(() => ({ pageView: response }));
      }
    });
  }

  render() {
    return (
      <Page userActions={this.props.userActions} pView={this.state.pageView}>
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
          {this.props.user.profile &&
            <Button
              onClick={() => {
                this.props.history.push("/profile");
              }}
            >
              Go to Profile
            </Button>}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userActions: {
      onLogin: user => dispatch(setUser(user)),
      onClear: () => dispatch(clearUser())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
