// import modules
import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Form, Button } from "reactstrap";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";
import ProductDropDown from "./ProductDropDown";
import FormDropDown from "./FormDropDown";
import helpers from "../../helpers";

// define component
const FilterComp = ({ ...props }) => {
  const values = helpers.getFilterResultsValues(props.filterResults, props.merchants, props.users);
  console.log('%c VALUES', 'color: yellow; font-size: 1rem', values);
  return (
    <section id="products-filter">
      <h2>Product Filters</h2>
      <Form onSubmit={props.submitHandler} onReset={props.resetHandler}>
        <ProductDropDown filtered={props.filterResults.length} productsCount={props.productsCount.length} />
        <FormDropDown name="brands" filtered={values.brands} />
        <FormDropDown name="categories" filtered={values.categories} />
        <FormDropDown name="merchants" filtered={values.merchants}/>
        <div className="form-buttons">
          <Button type="submit" color="primary">
            Apply
          </Button>
          <Button type="reset" color="danger">
            Clear
          </Button>
        </div>
      </Form>
    </section>
  );
};

// export component
export default withTracker(({ ...props }) => {
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    users: Meteor.users.find().fetch(),
    merchants: Merchants.find().fetch(),
    productsCount: Products.find().fetch()
  };
})(FilterComp);
