// Import framework
import React, { Component } from "react";
import { connect } from "react-redux";
// Import actions
import * as actions from "../actions";
// Import helpers
import { capitalizeFirstLetter } from "../helpers/string-helper";
// Import enums
import attributes from "../enums/attributes";

function MenuItem(props) {
  const handleChange = event => {
    if (event.target.value === "all") {
      props.filterProducts(props.name, null);
    } else {
      props.filterProducts(props.name, event.target.value);
    }
  };

  return (
    <div className="menu-group">
      <div className="menu-attribute">
        {capitalizeFirstLetter(attributes[props.name])}
      </div>
      <select onChange={handleChange} className="menu-select">
        <option value="all">All</option>
        {props.options.map(option =>
          <option key={option} value={option}>
            {option}
          </option>
        )}
      </select>
    </div>
  );
}

export default connect(null, actions)(MenuItem);
