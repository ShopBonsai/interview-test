import React from "react";
import TextField from "material-ui/TextField";

const UserForm = ({ OrderID }) =>
  <div>
    First Name
    <br />
    <TextField hintText="Steven" />
    <br />
    Last Name
    <br />
    <TextField hintText="Morrison" />
    <br />
    Address
    <br />
    <TextField hintText="123 Apple street" />
    <br />
    Postal Code
    <br />
    <TextField hintText="A1B 2C3" />
    <br />
    Special Note:
    <br />
    <br />
    <TextField hintText="The hint text can be as long as you want, it will wrap." />
    <br />
  </div>
  
export default UserForm;
