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
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(event) {
    event.preventDefault();
    const { currentTarget, target } = event;
    const formData = new FormData(currentTarget);
    const values = {};
    values.brands = formData.getAll("brands");
    values.categories = formData.getAll("categories");
    values.merchants = formData.getAll("merchants");
    console.log(values);
  }
  render() {
    return (
      <section id="products-filter">
        <h2>Product Filters</h2>
        <Form onSubmit={this.submitHandler}>
          <FormDropDown name="brands" />
          <FormDropDown name="categories" />
          <FormDropDown name="merchants" />
          <Button type="submit">Submit</Button>
        </Form>
      </section>
    );
  }
}

// export component
export default Filters;
