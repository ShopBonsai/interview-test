// import modules
import React, { PureComponent } from "react";
import ModalComp from "./comp.jsx";

// define component
class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.closeHandler = this.closeHandler.bind(this);
  }
  closeHandler() {
    this.props.unsetProductShow();
    this.props.closeModal();
  }
  render() {
    return React.createElement(ModalComp, {
      status: this.props.status,
      kind: this.props.kind,
      message: this.props.message,
      closeHandler: this.closeHandler
    });
  }
}

// export component
export default Modal;
