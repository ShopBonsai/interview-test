import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: this.props.isChecked
  }

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => (
      { isChecked: !isChecked }
    ));

    this.props.handleCheckboxChange(this.state.isChecked);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
