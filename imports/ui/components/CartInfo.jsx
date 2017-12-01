import React from "react";
import { Table } from "reactstrap";

const CartInfo = ({ CartInfo }) => {
  let total = 0;

  if (CartInfo) {
    CartInfo.map((item, i) => {
      total += CartInfo[i].price * CartInfo[i].quantity;
    });
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
                <th scope="row">1</th>
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
            SubTotal = {total}
          </div>
          <div>
            Total = {Math.round(total * 1.13 * 100) / 100}
          </div>
        </div>
      </div>
    );
  }
};
export default CartInfo;
