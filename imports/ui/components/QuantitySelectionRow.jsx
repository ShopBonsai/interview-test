// Framework
import React from 'react';
import PropTypes from 'prop-types';

export class QuantitySelectionRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onQuantityChange(e.target.value);
  }

  render() {
    let labelStyle;
    if (this.props.checked) {
      labelStyle = 'checked-label';
    } else {
      labelStyle = 'not-checked-label';
    }
    return (
      <div>
      <hr/>
        <label className={labelStyle}>
          {this.props.label}
          <input type="radio"
                 value={this.props.label}
                 checked={this.props.checked}
                 onClick={this.handleChange}
          />
          { this.props.checked &&
            <img src='../../images/drawer_checkbox.png'></img>
          }
        </label>
      </div>
    )
  }
}
QuantitySelectionRow.propTypes = {
  label: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onQuantityChange: PropTypes.func.isRequired
};

export default QuantitySelectionRow;
