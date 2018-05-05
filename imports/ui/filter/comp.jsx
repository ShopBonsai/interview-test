// import modules
import React from "react";
import { Form, Button } from "reactstrap";
import ProductDropDown from "./ProductDropDown";
import FormDropDown from "./FormDropDown";

// define component
const FilterComp = ({ ...props }) =>
  <section id="products-filter">
    <h2>Product Filters</h2>
    <Form onSubmit={props.submitHandler} onReset={props.resetHandler}>
      <ProductDropDown />
      <FormDropDown name="brands" />
      <FormDropDown name="categories" />
      <FormDropDown name="merchants" />
      <div className="form-buttons">
        <Button type="submit" color="primary">
          Apply
        </Button>
        <Button type="reset" color="danger">
          Clear
        </Button>
      </div>
    </Form>
  </section>;

// export component
export default FilterComp;
