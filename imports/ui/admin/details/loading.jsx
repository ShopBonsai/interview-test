// import moduels
import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// define component
const LoadingComp = ({ ...props }) =>
  <div id="admin-loading">
    <FontAwesomeIcon icon="spinner" spin size="2x" />
  </div>;

// export component
export default LoadingComp;
