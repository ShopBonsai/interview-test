import React from "react";

import { Button } from "reactstrap";

const Drawer = ({ showDrawer, toggleDrawer }) =>
  <div className={showDrawer ? "sidenav" : ""}>
    <Button onClick={toggleDrawer}>←</Button>
  </div>;

export default Drawer;
