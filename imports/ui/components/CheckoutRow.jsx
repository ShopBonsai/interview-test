import React from 'react';
import PropTypes from 'prop-types';
import * as Currency from 'currency-formatter';

export default function CheckoutRow(props) {
  const cost = "$" + props.price;
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {Currency.format(props.price, {locale: 'en-CA'})}
      </td>
      <td>
        {props.quantity}
      </td>
      <td>
        {Currency.format(props.totalPrice, {locale: 'en-CA'})}
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
