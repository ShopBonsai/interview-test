// Framework
import React, { Component } from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "../components/Drawer";

const ItemCard = ({
  items,
  returns,
  onItemReturnSelect,
  onReturnQuantityClick
}) =>
  <div>
    {items.map((item, index) => {
      const returnItem = returns.find(purchase => purchase.id === item.name);
      const returnQuantity = returnItem ? returnItem.returnQuantity : 0;
      const isSelected =
        returnItem && returnItem.isSelected
          ? "fa fa-check-square-o fa-lg"
          : "fa fa-square-o fa-lg";

      return (
        <div key={index} className="itemcard-container">
          <div className="itemcard-photo" />
          <div className="itemcard-text-container float-right">
            <div>
              <p>
                C${item.pricePerItem}
                <span onClick={() => onItemReturnSelect(item.name)}>
                  <i className={isSelected} aria-hidden="true" />
                </span>
              </p>
              <p>{item.brand}</p>
              <p>{item.name}</p>
            </div>
            <div>
              Size
              <div>{item.size}</div>
            </div>
            <div>
              Colour
              <div>{item.color}</div>
            </div>
            <div>
              Return Quantity
              <button
                onClick={() =>
                  onReturnQuantityClick(item.name, item.quantityPurchased)}
              >
                {`${returnQuantity} of ${item.quantityPurchased}`}{" "}
                <i className="fa fa-chevron-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>;

ItemCard.propTypes = {
  items: PropTypes.array,
  returns: PropTypes.array,
  onItemReturnSelect: PropTypes.func,
  onReturnQuantityClick: PropTypes.func
};

export default ItemCard;
