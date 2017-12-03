import React from "react";
import { Table } from "reactstrap";

const CartInfo = ({ CartInfo, getOrderTotal }) => {
  let subTotal = 0;
  let total = 0;
  let counter = 1;

  if (CartInfo) {
    CartInfo.map((item, i) => {
      subTotal += CartInfo[i].price * CartInfo[i].quantity;
    });

    if (subTotal) {
      total = Math.round(subTotal * 1.13 * 100) / 100;
      getOrderTotal(total);
    }

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {CartInfo.map((item, i) =>
              <tr key={i}>
                <th scope="row">
                  {counter++}
                </th>
                <td>
                  {CartInfo[i].name}
                </td>
                <td>
                  {CartInfo[i].price}
                </td>
                <td>
                  {CartInfo[i].quantity}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="Subtotal">
          <div>
            SubTotal = {subTotal}
          </div>
          <div>
            Total = {total}
          </div>
        </div>
      </div>
    );
  }
};
export default CartInfo;
