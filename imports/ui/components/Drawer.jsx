// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Drawer from "react-motion-drawer";
import { Button } from "reactstrap";

const ReturnsDrawer = ({ showDrawer, right, toggleDrawer, returns }) =>
  <Drawer open={showDrawer} right={right} className="drawer">
    <div>
      <Button onClick={toggleDrawer}>←</Button>
    </div>
    <div>Return Quantity</div>
    <div>
      <ul>
        <li>1. Placeholder</li>
        <li>2. Placeholder</li>
        <li>3. Placeholder</li>
      </ul>
    </div>
    <div>
      <Button size="lg" color="primary">
        Apply Changes
      </Button>
    </div>
  </Drawer>;

ReturnsDrawer.propTypes = {
  right: PropTypes.bool,
  returns: PropTypes.object,
  showDrawer: PropTypes.bool,
  toggleDrawer: PropTypes.func
};

export default ReturnsDrawer;
