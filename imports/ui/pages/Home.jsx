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
      // user: {
      //   fName: "",
      //   lName: "",
      //   email: "",
      //   phone: "",
      //   address: "",
      //   zip: "",
      //   city: "",
      //   province: "",
      //   password: ""
      // },
      login: {
        user: ""
      }
    }
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleRegisterBtn = this.handleRegisterBtn.bind(this);
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

/*  handleRegisterBtn() {
    const fName = this.state.user.fName;
    const lName = this.state.user.lName;
    const email = this.state.user.email;
    const phone = this.state.user.phone;
    const address = this.state.user.address;
    const zip = this.state.user.zip;
    const city = this.state.user.city;
    const province = this.state.user.province;
    const password = this.state.user.password;

    Accounts.createUser({
      email: email, 
      password: password, 
      profile: {
        fName: fName,
        lName: lName,
        email: email,
        phone: phone,
        address: address,
        zip: zip,
        city: city,
        province: province
      }
    });

    this.props.history.push("/shop");
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ 
      ...this.state, user: {...this.state.user, [name]: value}
    });
  }
*/
  render() {
    return (
      <Page>
        <div className="home-page">
          <h2 className="title">Welcome to our humble Shop</h2>
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
