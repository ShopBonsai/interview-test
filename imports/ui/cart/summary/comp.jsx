// Framework
import React from "react";
import { Table, Button } from "reactstrap";
import helpers from "../../../helpers";

// define component
const SummaryComp = ({ ...props }) => {
  const itemCount = helpers.getTotalCartItems(props.cartItems);
  const subtotal = helpers.getCartSubtotal(props.cartItems, props.products);
  return (
    <article>
      <h2>Summary</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Items</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {itemCount}
            </td>
            <td>
              $ {helpers.formatPrice(subtotal)}
            </td>
          </tr>
        </tbody>
      </Table>
      <Button
        color="primary"
        onClick={props.clickHandler}
        size="lg"
        block
        disabled={itemCount < 1 ? true : false}
      >
        Place Order
      </Button>
    </article>
  );
};

// export component
export default SummaryComp;
