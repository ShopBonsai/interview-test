// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "react-motion-drawer";
import { Button } from "reactstrap";

const ReturnsDrawer = props => {
  const { right, returns, showDrawer, toggleDrawer, openDrawerFor } = props;

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
      <div>Return Quantity</div>
      {showDrawer &&
        createArrayForDrawerTarget().map((quantity, index) =>
          <div key={index}>
            <Button>
              {quantity}
            </Button>
          </div>
        )}
      <div>
        <Button size="lg" color="primary">
          Apply Changes
        </Button>
      </div>
    </Drawer>
  );
};

ReturnsDrawer.propTypes = {
  right: PropTypes.bool,
  returns: PropTypes.array,
  showDrawer: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  openDrawerFor: PropTypes.string
};

export default ReturnsDrawer;
