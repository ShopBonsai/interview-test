// Framework
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

class Auth extends Component {

  constructor(){
    super();
    this.state = {
      username: "",
      password: "",
      error: null
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  viewChange = () => {
    this.setState({
      username: "",
      password: "",
      error: null
    })
  }

  login = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(this.state.username, this.state.password, (error) => {
      if (error) {
        this.setState({error: error})
      }
      else {
        this.props.history.push("/shop");
      }
    });
  }

  register = (e) => {
    e.preventDefault();
    Accounts.createUser({
      username: this.state.username,
      password: this.state.password
    },(error) => {
      if (error) {
        this.setState({error: error})
      }
      else {
        this.props.history.push("/shop");
      }
    })
  }

  goBack = () => this.props.history.push("/");  

  render() {

    const { username, password, error } = this.state;

    return (
      <Page pageTitle="Account" history goBack={this.goBack}>
        <div className="container" >
          <div className="row" >
            <div className="col-sm-0 col-md-3" ></div>
            <div className="col-sm-12 col-md-6" >
              <Route exact path="/login" render={ props => ( <Login {...props} username={username} password={password} error={error} handleChange={this.handleChange} login={this.login} viewChange={this.viewChange} /> ) } />
              <Route path="/login/register" render={ props => ( <Register {...props} username={username} password={password} error={error} handleChange={this.handleChange} register={this.register} viewChange={this.viewChange} /> ) } />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Auth;
