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
    openDrawerFor,
    onToggleDrawer,
    preSubmitQuantity,
    onReturnsDrawerSubmit,
    onReturnsDrawerInputChange
  } = props;

  // Find the object in the array where id matches openDrawerFor and
  // pick purchaseQuantity off of it. Then, return a new array with length
  // equal to the purchaseQuantity of the matched object.

  const returnItem = returns.find(({ id }) => id === openDrawerFor);

  const createArrayForDrawerTarget = () => {
    const { purchaseQuantity } = returns.find(({ id }) => id === openDrawerFor);
    return Array(purchaseQuantity).fill().map((x, i) => i + 1);
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
      <form onSubmit={e => onReturnsDrawerSubmit(e, openDrawerFor)}>
        {showDrawer &&
          createArrayForDrawerTarget().map((quantity, index) =>
            <div key={index}>
              <input
                type="radio"
                checked={
                  returnItem.returnQuantity === index + 1 ||
                  preSubmitQuantity === index + 1
                }
                value={quantity}
                name="returnQuantity"
                onChange={onReturnsDrawerInputChange}
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
  onToggleDrawer: PropTypes.func,
  openDrawerFor: PropTypes.string,
  preSubmitQuantity: PropTypes.number,
  onReturnsDrawerSubmit: PropTypes.func,
  onReturnsDrawerInputChange: PropTypes.func
};

export default ReturnsDrawer;
