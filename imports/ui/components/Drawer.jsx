// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "react-motion-drawer";
import { Button } from "reactstrap";

const ReturnsDrawer = props => {
  const {
    right,
    returns,
    showDrawer,
    toggleDrawer,
    openDrawerFor,
    onReturnSubmit,
    onReturnChange
  } = props;

  // Find the object in the array where id matches openDrawerFor and
  // pick purchaseQuantity off of it. Then, return a new array with length
  // equal to the purchaseQuantity of the matched object.

  const createArrayForDrawerTarget = () => {
    const { purchaseQuantity } = returns.find(({ id }) => id === openDrawerFor);
    return Array(purchaseQuantity).fill().map((x, i) => i + 1);
  };

  return (
    <Drawer open={showDrawer} right={right} className="drawer">
      <div>
        <Button onClick={toggleDrawer}>←</Button>
      </div>
      <form onSubmit={e => onReturnSubmit(e, openDrawerFor)}>
        {showDrawer &&
          createArrayForDrawerTarget().map((quantity, index) =>
            <div key={index}>
              <input
                type="radio"
                value={quantity}
                name="returnQuantity"
                onClick={onReturnChange}
              />
              {quantity}
            </div>
          )}
        <Button type="submit">Apply Changes</Button>
      </form>
    </Drawer>
  );
};

ReturnsDrawer.propTypes = {
  right: PropTypes.bool,
  returns: PropTypes.array,
  showDrawer: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  onReturnSubmit: PropTypes.func,
  openDrawerFor: PropTypes.string
};

export default ReturnsDrawer;
