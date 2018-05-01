// Framework
import React, { Component } from "react";
// Components
import Button from "../components/Button.jsx";

class Modal extends Component {
  render() {
    return (
      <div className="bonsai-modal">
        <div className="bonsai-modal-content">
          <div className="bonsai-modal-title">
            {this.props.title}
          </div>
          <div className="bonsai-modal-body">
            {this.props.body}
          </div>
          <div className="bonsai-modal-footer">
            <Button onClick={this.props.close}>Close</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
