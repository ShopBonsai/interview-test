// Framework
import React, { Component } from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "../components/Drawer";
import { Card, Button } from "reactstrap";

const ItemCard = ({ items, toggleDrawer, onReturnQuantityClick }) =>
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
            <Button
              onClick={() => onReturnQuantityClick(name, quantityPurchased)}
            >
              {`${0} of ${quantityPurchased}`} →
            </Button>
          </div>
        </Card>
    )}
  </div>;

ItemCard.propTypes = {
  items: PropTypes.array,
  toggleDrawer: PropTypes.func,
  onReturnQuantityClick: PropTypes.func
};

export default ItemCard;
