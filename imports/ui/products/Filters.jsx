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
import SelectOptions from "./SelectOptions";

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
    values.name = formData.get("name");
    values.size = formData.get("size");
    values.color = formData.get("color");
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
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Search by Name"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="size">Size</Label>
            <SelectOptions name="size" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="color">Colour</Label>
            <SelectOptions name="color" />
          </FormGroup>
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
