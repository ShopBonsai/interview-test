// Framework
import React, { PureComponent } from "react";
import UpdateStatusComp from "./comp.jsx";
import calls from "../../../../helpers/calls";

// define component
class UpdateStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }
  async changeHandler(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const newStatus = formData.get("status");
    // console.log(this.props.orderId, newStatus);
    const update = await calls.updateStatus(this.props.orderId, newStatus);
    if (update === 1) {
      return alert("Order status updated successfully");
    }
    return alert("Order status update failed");
  }
  render() {
    if (this.props.orderStatus.length < 1) return null;
    return React.createElement(UpdateStatusComp, {
      status: this.props.status,
      options: this.props.orderStatus,
      changeHandler: this.changeHandler
    });
  }
}

// export component
export default UpdateStatus;
