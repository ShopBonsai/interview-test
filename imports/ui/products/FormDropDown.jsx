// Framework
import React, { PureComponent } from "react";
import {
  FormGroup,
  Label,
  Collapse
} from "reactstrap";
import CheckBoxes from "./CheckBoxes";
import helpers from "../../helpers";

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
  render() {
    return (
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0 form-drop-down">
        <Label for={this.props.name} className="mr-sm-2" onClick={this.toggle}>
          <h5>
            {helpers.titelize(this.props.name)}
          </h5>
        </Label>
        <Collapse isOpen={this.state.collapse}>
          <CheckBoxes name={this.props.name} />
        </Collapse>
      </FormGroup>
    );
  }
}

// export component
export default FormDropDown;
