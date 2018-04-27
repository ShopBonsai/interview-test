// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';


// Components
import Page from "../components/Page.jsx";

import {getProfile} from '../reducers/auth'

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getProfile();
  }

  goBack = () => this.props.history.push("/");

  render() {
    const {profile,userId,emails} = this.props;
    return (
      <Page pageTitle="profile" history goBack={this.goBack}>
        <div className="shop-page">
          Email: {emails[0].address} <br/>
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
  profile:state.auth.profile,
  userId:state.auth.userId,
  emails:state.auth.emails,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProfile
},dispatch)

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(Profile);
