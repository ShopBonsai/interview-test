import React from "react";
import TextField from "material-ui/TextField";

class UserForm extends React.Component {
  handleFirstNameChange = event => {
    let firstName = event.target.value;
    this.props.getUserFirstName(firstName);
  };

  handleLastNameChange = event => {
    let LastName = event.target.value;
    this.props.getUserLastName(LastName);
  };

  handleEmailChange = event => {
    let email = event.target.value;
    this.props.getUserEmail(email);
  };

  handlePostalCodeChange = event => {
    let PostalCode = event.target.value;
    this.props.getUserPostalCode(PostalCode);
  };
  handleAddressChange = event => {
    let Address = event.target.value;
    this.props.getUserAddress(Address);
  };
  handleSpecialNoteChange = event => {
    let SpecialNote = event.target.value;
    this.props.getUserAddress(SpecialNote);
  };

  render() {
    return (
      <div>
        First Name
        <br />
        <TextField onChange={this.handleFirstNameChange} hintText="Steven" />
        <br />
        Last Name
        <br />
        <TextField onChange={this.handleLastNameChange} hintText="Morrison" />
        <br />
        Address
        <br />
        <TextField
          onChange={this.handleEmailChange}
          hintText="Steve@gmail.com"
        />
        <br />
        Email
        <br />
        <TextField
          onChange={this.handleAddressChange}
          hintText="123 Apple street"
        />
        <br />
        Postal Code
        <br />
        <TextField onChange={this.handlePostalCodeChange} hintText="A1B 2C3" />
        <br />
        Special Note:
        <br />
        <br />
        <TextField
          onChange={this.handleSpecialNoteChange}
          hintText="* Optional *"
        />
        <br />
      </div>
    );
  }
}

export default UserForm;
