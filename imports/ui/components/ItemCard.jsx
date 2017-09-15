import React, { Component } from "react";

import { Card, Button } from "reactstrap";
import Drawer from "../components/Drawer";

const ItemCard = ({ items, toggleDrawer }) =>
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
          <div>
            Return Quantity
            <Button onClick={toggleDrawer}>
              {`${0} of ${quantityPurchased}`} →
            </Button>
          </div>
        </Card>
    )}
  </div>;

export default ItemCard;
