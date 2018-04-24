// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';


// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  goBack = () => this.props.history.push("/");

  render() {

    return (
      <Page pageTitle="profile" history goBack={this.goBack}>
        <div className="shop-page">
          This is your profile.
        </div>
      </Page>
    );
  }
}

/*
orders = {
  orders:[],          // has all past orders
  currentCart:[],     // has all the items for the current order
  progress:false      // flag to check if committing or not
}
*/

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
},dispatch)

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(Profile);
