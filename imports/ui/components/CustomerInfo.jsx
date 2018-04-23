import React from "react";
import { Table } from "reactstrap";

const CustomerInfo = ({ customerInfo }) => {
  return (
    <div>
      First Name: {customerInfo.FirstName}
      <br />
      Last Name: {customerInfo.LastName}
      <br />
      Email Name: {customerInfo.Email}
      <br />
      Address: {customerInfo.Address}
      <br />
      Postal Code: {customerInfo.PostalCode}
      <br />
      Special Note: {customerInfo.SpecialNote}
      <br />
    </div>
  );
};
export default CustomerInfo;
