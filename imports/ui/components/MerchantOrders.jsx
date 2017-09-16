// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import ItemCard from "../components/ItemCard";

const MerchantOrders = ({ lastOrder, toggleDrawer, onReturnQuantityClick }) =>
  <div>
    {lastOrder.map(({ name, items }, index) =>
      <div key={index}>
        <div>
          {name}
        </div>
        <ItemCard
          items={items}
          toggleDrawer={toggleDrawer}
          onReturnQuantityClick={onReturnQuantityClick}
        />
      </div>
    )}
  </div>;

MerchantOrders.propTypes = {
  lastOrder: PropTypes.array,
  toggleDrawer: PropTypes.func,
  onReturnQuantityClick: PropTypes.func
};

export default MerchantOrders;
