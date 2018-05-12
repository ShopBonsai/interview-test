// Framework
import React, { Component } from "react";
import helpers from "../../../helpers";
import Sorter from "../../../helpers/sorter";

// define component
class CheckBoxes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const setChecked = (id, ifTrue) => {
      if (
        Array.isArray(this.props.filtered) &&
        !this.props.filtered.includes(id)
      ) {
        return ifTrue;
      }
    };
    const setCheckBoxes = options => {
      if (options.length < 1) {
        return (
          <p>
            {options.length}
          </p>
        );
      }
      // console.log(data);
      const sorted = new Sorter(options).alphabetical();
      return sorted.map(item =>
        <div key={item._id} className="check-box">
          <label
            htmlFor={item._id}
            className={setChecked(item._id, "unchecked")}
          >
            <input
              type="checkbox"
              id={item._id}
              name={this.props.name}
              value={item._id}
            />
            {helpers.titleize(item.name)}
          </label>
        </div>
      );
    };
    return (
      <div className="check-items">
        {setCheckBoxes(this.props.options)}
      </div>
    );
  }
}

// export component
export default CheckBoxes;
