// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";
import { setUser, clearUser } from "../store/actions";
// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";

class Profile extends Component {
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
    Meteor.call("visits.logVisit", "Profile", userName, (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response);
      }
    });

    Meteor.call("visits.getPageCount", "Profile", (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        this.setState(() => ({ pageView: response }));
      }
    });
  }

  goBack = () => this.props.history.push("/");

  render() {
    return (
      <Page
        pageTitle="profile"
        history
        goBack={this.goBack}
        userActions={this.props.userActions}
        pView={this.state.pageView}
      >
        {this.props.user.profile &&
          <div>
            <img
              src={this.props.user.services.google.picture}
              width="50px"
              height="50px"
            />
            Hello {this.props.user.profile.name}
          </div>}
        {!this.props.user.profile &&
          <div>Nothing to see here. Please login</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
