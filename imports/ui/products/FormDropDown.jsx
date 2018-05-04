// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {
  FormGroup,
  Label,
  Collapse,
  Badge
} from "reactstrap";
import CheckBoxes from "./CheckBoxes";
import helpers from "../../helpers";
import Brands from "../../api/brands/collection";
import Categories from "../../api/categories/collection";
import Merchants from "../../api/merchants/collection";

// deifne component
class FormDropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  shouldComponentUpdate() {
    return true;
  }
  render() {
    let data = [];
    switch (this.props.name) {
      case "brands":
        data = this.props.allBrands;
        break;
      case "categories":
        data = this.props.allCategories;
        break;
      case "merchants":
        data = this.props.allMerchants;
        break;
    }
    return (
      <FormGroup>
        <Label for={this.props.name} onClick={this.toggle}>
          <h5>
            {helpers.titelize(this.props.name)}
          </h5>
          <Badge color="secondary">
            {data.length}
          </Badge>
        </Label>
        <Collapse isOpen={this.state.collapse}>
          <CheckBoxes options={data} name={this.props.name} />
        </Collapse>
      </FormGroup>
    );
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("categories");
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  return {
    allBrands: Brands.find().fetch(),
    allCategories: Categories.find().fetch(),
    allMerchants: Merchants.find().fetch()
  };
})(FormDropDown);
