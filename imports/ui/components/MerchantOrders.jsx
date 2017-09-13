import React from "react";

import ItemCard from "../components/ItemCard";

const MerchantOrders = ({ lastOrder: { merchantOrders } }) =>
  <div>
    {merchantOrders.map(({ name, items }, index) =>
      <div key={index}>
        <p>{name}</p>
        <ItemCard items={items} />
      </div>
    )}
  </div>;

export default MerchantOrders;
