import React, { Component } from "react";

import { Card } from "reactstrap";

const ItemCard = ({ items }) =>
  <div>
    {items.map(
      ({ pricePerItem, brand, name, size, color, quantityPurchased }, index) =>
        <Card key={index}>
          <div>
            <p>C${pricePerItem}</p>
            <p>{brand}</p>
            <p>{name}</p>
          </div>
          <div>Size {size}</div>
          <div>Colour {color}</div>
          <div>Return Quantity {`${0} of ${quantityPurchased}`} →</div>
        </Card>
    )}
  </div>;

export default ItemCard;
