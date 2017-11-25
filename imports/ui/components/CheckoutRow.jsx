import React from 'react';
import PropTypes from 'prop-types';

export default function CheckoutRow(props) {
  const cost = "$" + props.price;
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {props.price}
      </td>
      <td>
        {props.quantity}
      </td>
      <td>
        {props.totalPrice}
      </td>
    </tr>
  );
}

CheckoutRow.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired
};
