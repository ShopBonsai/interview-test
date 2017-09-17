// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import ItemCard from "../components/ItemCard";

const MerchantOrders = ({ orderDetails, onReturnQuantityClick }) =>
  <div>
    {orderDetails.map(({ name, items }, index) =>
      <div key={index}>
        <div>
          {name}
        </div>
        <ItemCard items={items} onReturnQuantityClick={onReturnQuantityClick} />
      </div>
    )}
  </div>;

MerchantOrders.propTypes = {
  orderDetails: PropTypes.array,
  onReturnQuantityClick: PropTypes.func
};

export default MerchantOrders;
