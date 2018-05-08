// import modules
import React from "react";
import { Form, Button } from "reactstrap";
import ProductDropDown from "./ProductDropDown";
import FormDropDown from "./FormDropDown";
import helpers from "../../helpers";

// define component
const FilterComp = ({ ...props }) =>
  <section id="products-filter">
    <h2>Product Filters</h2>
    <Form onSubmit={props.submitHandler} onReset={props.resetHandler}>
      <ProductDropDown filtered={props.filterResults.length} productsCount={props.productsCount} />
      <FormDropDown name="brands" filtered={props.filterValues.brands} />
      <FormDropDown name="categories" filtered={props.filterValues.categories} />
      <FormDropDown name="merchants" filtered={props.filterValues.merchants}/>
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
