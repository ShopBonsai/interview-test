// import modules
import React from "react";
import { Input } from "reactstrap";
import MainNav from "../mainNav/index";
import NavHeader from "../navHeader/index";
import All from "./all";
import One from "./one";
import defaultState from "../../redux/defaultState.json";

// define component
const QuantitySelect = ({ ...props }) => {
  const setOptions = max => {
    const options = [];
    for (let i = 0; i < max; i++) {
      options.push(
        <option value={i + 1} key={i * Math.ceil(Math.random())}>
          {i + 1}
        </option>
      );
    }
    return options;
  };
  return (
    <Input
      type="select"
      name={props.name}
      id={props.name}
      min="1"
      max={props.maxQuantity}
      defaultValue={props.currentValue}
    >
      {setOptions(props.maxQuantity)}
    </Input>
  );
};

// export component
export default QuantitySelect;
