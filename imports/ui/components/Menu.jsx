// Import framework
import React from "react";

// Import components
import MenuItem from "./MenuItem";

function Menu(props) {
  return (
    <div className="menu">
      {Object.keys(props.filters.selected).map(filter => 
        <MenuItem key={filter} 
                  name={filter} 
                  options={props.filters.options[filter]}/>
      )}
    </div>
  );
}

export default Menu;