// import modules
import React from "react";
import { Form, Label, Input, Button } from "reactstrap";

// define component
const SortComp = ({ ...props }) =>
  <section id="products-sort">
    <h2>Sort By</h2>
    <Form onChange={props.changeHandler}>
      <Input type="select" name="sort" id="sort" defaultValue={props.currentSort}>
        <option value="name">
          Name: Alphabetical
        </option>
        <option value="brand">Brand: Alphabetical</option>
        <option value="lowHigh">Price: Low to High</option>
        <option value="highLow">Price: High to Low</option>
      </Input>
    </Form>
  </section>;

// export component
export default SortComp;
