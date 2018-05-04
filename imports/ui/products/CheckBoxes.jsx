// Framework
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Categories from "../../api/categories/collection";
import Brands from "../../api/brands/collection";
import Merchants from "../../api/merchants/collection";
import helpers from "../../helpers";

// define component
class CheckBoxes extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const setCheckBoxes = name => {
      let data = [];
      switch (name) {
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
      if (data.length < 1) {
        return (
          <p>
            {data.length}
          </p>
        );
      }
      // console.log(data);
      return data.map(item =>
        <Label check key={item._id}>
          <Input type="checkbox" value={item._id} />
          {helpers.titelize(item.name)}
        </Label>
      );
    };
    return (
      <div className="check-items">
        {setCheckBoxes(this.props.name)}
      </div>
    );
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("categories");
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  return {
    allCategories: Categories.find().fetch(),
    allBrands: Brands.find().fetch(),
    allMerchants: Merchants.find().fetch()
  };
})(CheckBoxes);
