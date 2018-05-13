// import modules
import React, { PureComponent } from "react";
import ModalComp from "./comp.jsx";

// define component
class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
  }
  close() {
    this.props.unsetProductShow();
    this.props.closeModal();
  }
  cancel() {
    this.close();
  }
  submit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const response = currentTarget.childNodes[0].value;
    console.log(response);
    this.close();
  }
  render() {
    return React.createElement(ModalComp, {
      kind: this.props.kind,
      message: this.props.message,
      close: this.close
      // status: this.state.modal,
      // kind: this.props.kind,
      // message: this.props.message,
      // close: this.close,
      // cancel: this.cancel,
      // submit: this.submit
    });
  }
}

// export component
export default Modal;
