// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import ItemCard from "../components/ItemCard";

const MerchantOrders = ({ orderDetails, onReturnQuantityClick, returns }) =>
  <div>
    {orderDetails.map(({ name, items }, index) =>
      <div key={index}>
        <div>
          {name}
        </div>
        <ItemCard
          items={items}
          returns={returns}
          onReturnQuantityClick={onReturnQuantityClick}
        />
      </div>
    )}
  </div>;

MerchantOrders.propTypes = {
  returns: PropTypes.array,
  orderDetails: PropTypes.array,
  onReturnQuantityClick: PropTypes.func
};

export default MerchantOrders;
