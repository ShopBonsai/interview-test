// Framework
import React, { PureComponent } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import FormDropDown from "./FormDropDown";

// define component
class Filters extends PureComponent {
  render() {
    return (
      <section id="products-filter">
        <h2>Product Filters</h2>
        <Form>
          <FormDropDown name="brands" />
          <FormDropDown name="categories" />
          <FormDropDown name="merchants" />
        </Form>
      </section>
    );
  }
}

// export component
export default Filters;
