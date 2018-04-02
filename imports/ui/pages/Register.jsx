// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: {
        fName: "",
        lName: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        province: "",
        password: ""
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegisterBtn = this.handleRegisterBtn.bind(this);
  }

  handleRegisterBtn() {
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
      ...this.state, user: { ...this.state.user, [name]: value }
    });
  }

  goBack = () => this.props.history.push("/");

  render() {
    return (
      <Page pageTitle="Welcome to our Shop Bonsai!" history goBack={this.goBack}>
        <div className="register-page">
          <div className="title">
            <h2>Register</h2>
          </div>
          <div className="register">
            <label>First Name:</label>
            <input type="text" name="fName" onChange={this.handleInputChange} />
            <label>Last Name:</label>
            <input type="text" name="lName" onChange={this.handleInputChange} />
            <label>Email:</label>
            <input type="text" name="email" onChange={this.handleInputChange} />
            <label>Phone:</label>
            <input type="text" name="phone" onChange={this.handleInputChange} />
            <label>Address:</label>
            <input type="text" name="address" onChange={this.handleInputChange} />
            <label>Zip Code:</label>
            <input type="text" name="zip" onChange={this.handleInputChange} />
            <label>City:</label>
            <input type="text" name="city" onChange={this.handleInputChange} />
            <label>Province:</label>
            <input type="text" name="province" onChange={this.handleInputChange} />
            <label>Password:</label>
            <input type="password" name="password" onChange={this.handleInputChange} />
          </div>
          <div className="register-btn">
            <Button onClick={this.handleRegisterBtn}>Register</Button>
          </div>
        </div>
      </Page>
    );
  }
}

export default Register;
