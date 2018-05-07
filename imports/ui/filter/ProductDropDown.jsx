// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {
  FormGroup,
  Label,
  Collapse,
  Input
} from "reactstrap";
import SelectOptions from "./SelectOptions";
import CountBadge from "./countBadge";
import helpers from "../../helpers";

// deifne component
class ProductDropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
    return (
      <FormGroup>
        <Label onClick={this.toggle}>
          <h5>Product</h5>
          <CountBadge filtered={this.props.filtered} total={this.props.productsCount} />
        </Label>
        <Collapse isOpen={this.state.collapse} id="product-filter">
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
          <FormGroup id="price-filter">
            <Label htmlFor="priceMin">Price</Label>
            <Label htmlFor="priceMin" hidden>Price</Label>
            <div>
              <Input type="number" id="priceMin" name="priceMin" placeholder="Min" />
              <Input type="number" id="priceMax" name="priceMax" placeholder="Max" />
            </div>
          </FormGroup>
        </Collapse>
      </FormGroup>
    );
  }
}

// export component
export default ProductDropDown;
