// Framework
import React, { Component } from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "../components/Drawer";
import { Card, Button } from "reactstrap";

const ItemCard = ({ items, onReturnQuantityClick, returns }) =>
  <div>
    {items.map((item, index) => {
      const returnItem = returns.find(purchase => purchase.id === item.name);
      const returnQuantity = returnItem ? returnItem.returnQuantity : 0;
      return (
        <Card key={index}>
          <div>
            <p>C${item.pricePerItem}</p>
            <p>{item.brand}</p>
            <p>{item.name}</p>
          </div>
          <div>
            Size {item.size}
          </div>
          <div>
            Colour {item.color}
          </div>
          <div>
            Return Quantity
            <Button
              onClick={() =>
                onReturnQuantityClick(item.name, item.quantityPurchased)}
            >
              {`${returnQuantity} of ${item.quantityPurchased}`} →
            </Button>
          </div>
        </Card>
      );
    })}
  </div>;

ItemCard.propTypes = {
  items: PropTypes.array,
  returns: PropTypes.array,
  onReturnQuantityClick: PropTypes.func
};

export default ItemCard;
