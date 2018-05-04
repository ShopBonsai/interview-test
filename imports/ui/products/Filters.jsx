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
import ProductDropDown from "./ProductDropDown";

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
    const values = {
      product: {}
    };
    values.product.name = formData.get("name");
    values.product.size = formData.get("size");
    values.product.color = formData.get("color");
    values.product.priceMin = formData.get("priceMin");
    values.product.priceMax = formData.get("priceMax");
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
      </section>
    );
  }
}

// export component
export default Filters;
