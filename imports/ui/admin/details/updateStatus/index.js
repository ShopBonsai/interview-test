// Framework
import React, { PureComponent } from "react";
import UpdateStatusComp from "./comp.jsx";
import calls from "../../../../helpers/calls";

// define component
class UpdateStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    // console.log(props);
  }
  async changeHandler(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const newStatus = formData.get("status");
    const shippedId = this.props.orderStatus.filter(
      status => status.name === "shipped"
    )[0]._id;
    let tracking = "";
    if (newStatus === shippedId) {
      tracking = prompt("Please enter the tracking number");
      if (tracking === null || tracking.length < 1) {
        currentTarget.childNodes[0].value = this.props.status;
        return alert("You must enter a tracking number for shipped orders");
      } else {
        const update = await calls.updateStatus(
          this.props.orderId,
          newStatus,
          tracking
        );
        if (update === 1) {
          return alert("Order status updated successfully");
        }
        return alert("Order status update failed");
      }
    } else {
      const update = await calls.updateStatus(
        this.props.orderId,
        newStatus,
        tracking
      );
      if (update === 1) {
        return alert("Order status updated successfully");
      }
      return alert("Order status update failed");
    }
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
