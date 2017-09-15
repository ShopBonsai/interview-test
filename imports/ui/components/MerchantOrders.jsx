import React from "react";

import ItemCard from "../components/ItemCard";

const MerchantOrders = ({ lastOrder: { merchantOrders }, toggleDrawer }) =>
  <div>
    {merchantOrders.map(({ name, items }, index) =>
      <div key={index}>
        <div>{name}</div>
        <ItemCard items={items} toggleDrawer={toggleDrawer} />
      </div>
    )}
  </div>;

export default MerchantOrders;
