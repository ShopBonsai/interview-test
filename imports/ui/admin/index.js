// Framework
import React, { PureComponent } from "react";
import AdminComp from "./comp.jsx";

// define component
class Admin extends PureComponent {
  componentDidMount() {
    document.title = "Bonsai Shop Admin";
  }
  render() {
    return React.createElement(AdminComp, {});
  }
}

// export component
export default Admin;
