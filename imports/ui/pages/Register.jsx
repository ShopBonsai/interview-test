// Framework
import React, { Component } from "react";

// Components
import Page from "../components/Page";
import Button from "../components/Button";
import LoginRegisterForm from "../components/LoginRegisterForm"

import {registerUser} from '../reducers/auth'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

class Register extends Component {
  submit = ({email,password,password2}) => {
    this.props.registerUser({email,password,password2});
  } 

  goBack = () => this.props.history.push('/');

  render() {
    return (
      <Page history goBack={this.goBack}>
        <div className="home-page">
          <LoginRegisterForm submit={this.submit}/>
        </div>
      </Page>
    );
  }
}

mapStateToProps = (state) => ({

})

mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser
},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Register);



