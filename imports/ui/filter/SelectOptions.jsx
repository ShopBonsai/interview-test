// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Input } from "reactstrap";
import helpers from "../../helpers";
import Products from "../../api/products/collection";

// deifne component
class SelectOptions extends PureComponent {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { name } = this.props;
    const setOptions = (data, name) => {
      // console.log(data);
      if (data.length < 1) {
        return <option value="no data">No Data</option>;
      }
      const options = [];
      options.push("any");
      data.forEach(product => {
        const variable = product[name];
        if (!options.includes(variable)) {
          return options.push(variable);
        }
        return null;
      });
      return options.map((item, index) =>
        <option
          value={item}
          key={`select-item-${index * Math.random()}`}
        >
          {helpers.titleize(helpers.adjustSizes(item))}
        </option>
      );
      return null;
    };
    return (
      <Input type="select" name={name} id={name}>
        {setOptions(this.props.allProducts, name)}
      </Input>
    );
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("products");
  return {
    allProducts: Products.find().fetch()
  };
})(SelectOptions);
