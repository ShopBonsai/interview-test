// Framework
import React, { Component } from "react";

// Components
import Page from "../components/Page";
import Button from "../components/Button";
import LoginRegisterForm from "../components/LoginRegisterForm"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import {loginUser} from "../reducers/auth";


class Login extends Component {
  submit = ({email,password}) => {
    this.props.loginUser({email,password})
  } 

  render() {
    return (
      <Page>
        <div className="home-page">
          <LoginRegisterForm login submit={this.submit}/>
        </div>
      </Page>
    );
  }
}

mapStateToProps = (state) => ({

})

mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Login);


