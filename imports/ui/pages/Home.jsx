// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      login: {
        user: ""
      }
    }
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
    this.handleInputLogin = this.handleInputLogin.bind(this);
  }

  handleLoginBtn() {
    const email = this.state.login.user.emailLogin;
    const password = this.state.login.user.passwordLogin;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        this.props.history.push("/shop");
      }
    });
  }

  handleInputLogin(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({...this.state, login: {...this.state.login, user: {...this.state.login.user, [name]: value}}});

  }

  render() {
    return (
      <Page>
        <div className="home-page">
          <h2 className="title">Welcome to our Shop Bonsai!</h2>
          <div className="login">
            <label>Email:</label>
            <input type="text" name="emailLogin" onBlur={this.handleInputLogin}/>
            <label>Password:</label>
            <input type="password" name="passwordLogin" onBlur={this.handleInputLogin} />
          </div>
          <div className="login-buttons">
            <Button className="login-btn" onClick={this.handleLoginBtn}>Login</Button>      
            <h5>OR</h5>            
            <Button className="login-btn"
              onClick={() => {
                this.props.history.push("/register");
              }}
            >
              Register
            </Button>   
          </div>
        </div>
      </Page>
    );
  }
}

export default Home;
