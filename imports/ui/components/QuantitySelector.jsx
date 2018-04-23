import React from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

const items = [];
for (let i = 0; i < 100; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`Quantity ${i}`} />);
}

export default class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
    this.props.onQuantitySelect(value);
  }

  render() {
    return (
      <DropDownMenu
        className="DropDownMenu"
        maxHeight={300}
        value={this.state.value}
        onChange={this.handleChange}
      >
        {items}
      </DropDownMenu>
    );
  }
}
