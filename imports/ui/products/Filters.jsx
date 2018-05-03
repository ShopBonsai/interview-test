// Framework
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

// define component
class Filters extends PureComponent {
  render() {
    return (
      <section id="products-filter">
        <h2>Product Filters</h2>
        <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="brand" className="mr-sm-2">Brand</Label>
            <Input type="brand" name="brand" id="brand" placeholder="Shop by Brand" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="category" className="mr-sm-2">Category</Label>
            <Input type="category" name="category" id="category" placeholder="Shop by Category" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="merchant" className="mr-sm-2">Merchant</Label>
            <Input type="merchant" name="merchant" id="merchant" placeholder="Shop by Merchant" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="name" className="mr-sm-2">Name</Label>
            <Input type="name" name="name" id="name" placeholder="Shop by Name" />
          </FormGroup>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </Form>
      </section>
    );
  }
}

// export component
export default Filters;
