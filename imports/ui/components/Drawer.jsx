import React from "react";

import Drawer from "react-motion-drawer";
import { Button } from "reactstrap";

const ReturnsDrawer = ({ showDrawer, right, toggleDrawer }) =>
  <Drawer open={showDrawer} right={right} className="drawer">
    <div>
      <Button onClick={toggleDrawer}>←</Button>
    </div>
    <div>Return Quantity</div>
    <div className="btn-group-vertical">
      <button type="button" className="btn">
        1
      </button>
      <button type="button" className="btn">
        2
      </button>
      <button type="button" className="btn">
        3
      </button>
    </div>
    <div>
      <Button size="lg" color="primary">
        Apply Changes
      </Button>
    </div>
  </Drawer>;

export default ReturnsDrawer;
