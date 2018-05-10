// import modules
import React from "react";
import { Container, Row, Col, Jumbotron, Table } from "reactstrap";

// define component
const DetailsComp = ({ ...props }) => {
  const {
    brands,
    categories,
    customers,
    merchants,
    orderStatus,
    orders,
    products,
    profileTypes,
    users
  } = props;
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Collection</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Brands</td>
          <td>
            {brands.length}
          </td>
        </tr>
        <tr>
          <td>Categories</td>
          <td>
            {categories.length}
          </td>
        </tr>
        <tr>
          <td>Customers</td>
          <td>
            {customers.length}
          </td>
        </tr>
        <tr>
          <td>Merchants</td>
          <td>
            {merchants.length}
          </td>
        </tr>
        <tr>
          <td>Orders</td>
          <td>
            {orders.length}
          </td>
        </tr>
        <tr>
          <td>Order Status</td>
          <td>
            {orderStatus.length}
          </td>
        </tr>
        <tr>
          <td>Products</td>
          <td>
            {products.length}
          </td>
        </tr>
        <tr>
          <td>Profile Types</td>
          <td>
            {profileTypes.length}
          </td>
        </tr>
        <tr>
          <td>Users</td>
          <td>
            {users.length}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

// export component
export default DetailsComp;
