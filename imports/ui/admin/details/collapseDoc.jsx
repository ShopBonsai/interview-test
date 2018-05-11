// import modules
import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

// define component
class CollapseDoc extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      style: {
        display: "none"
      }
    };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
    return (
      <div className="collapse-doc">
        <div className="collapse-head" onClick={this.toggle}>
          {this.props.head}
        </div>
        <Collapse isOpen={this.state.collapse}>
          {this.props.body}
        </Collapse>
      </div>
    );
  }
}

// export component
export default CollapseDoc;
