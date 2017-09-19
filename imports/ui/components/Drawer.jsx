// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "react-motion-drawer";

const ReturnsDrawer = props => {
  const {
    right,
    returns,
    showDrawer,
    drawerTarget,
    onToggleDrawer,
    preSubmitQuantity,
    onReturnsDrawerSubmit,
    onReturnsDrawerInputChange
  } = props;

  // Find return item.

  const returnItem = returns.find(({ id }) => id === drawerTarget);

  // Find the object in the array where id matches drawerTarget and
  // pick purchaseQuantity off of it. Then, return a new array with length
  // equal to the purchaseQuantity of the matched object.

  const createArrayForDrawerTarget = () => {
    return Array(returnItem.purchaseQuantity).fill().map((x, i) => i + 1);
  };

  return (
    <Drawer open={showDrawer} right={right} className="drawer">
      <div>
        <i
          onClick={onToggleDrawer}
          className="fa fa-arrow-left"
          aria-hidden="true"
        />
      </div>
      <div>Return Quantity</div>
      <form onSubmit={e => onReturnsDrawerSubmit(e, drawerTarget)}>
        {showDrawer &&
          createArrayForDrawerTarget().map((quantity, index) =>
            <div key={index}>
              <input
                type="radio"
                value={quantity}
                name="returnQuantity"
                onChange={onReturnsDrawerInputChange}
                checked={
                  preSubmitQuantity === index + 1 ||
                  returnItem.returnQuantity === index + 1
                }
              />
              {quantity}
            </div>
          )}
        <button type="submit">Apply Changes</button>
      </form>
    </Drawer>
  );
};

ReturnsDrawer.propTypes = {
  right: PropTypes.bool,
  returns: PropTypes.array,
  showDrawer: PropTypes.bool,
  drawerTarget: PropTypes.string,
  onToggleDrawer: PropTypes.func,
  preSubmitQuantity: PropTypes.number,
  onReturnsDrawerSubmit: PropTypes.func,
  onReturnsDrawerInputChange: PropTypes.func
};

export default ReturnsDrawer;
