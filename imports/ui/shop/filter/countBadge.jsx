// import modules
import React from "react";
import { Badge } from "reactstrap";

// define component
const CountBadge = ({ ...props }) =>
  <p id="count-badge">
    {props.filtered === 0
      ? <Badge color="danger">
          {props.filtered}
        </Badge>
      : <Badge color="primary">
          {props.filtered}
        </Badge>}
    &ensp;
    <Badge color="secondary">{props.total}</Badge>
  </p>;

// export component
export default CountBadge;
