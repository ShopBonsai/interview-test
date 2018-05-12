// Framework
import React, { PureComponent } from "react";
import UpdatePublishedComp from "./comp.jsx";
import calls from "../../../../helpers/calls";

// define component
class UpdatePublished extends PureComponent {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    // console.log(props);
  }
  async changeHandler(event) {
    event.preventDefault();
    const { currentTarget } = event;
    // console.log(currentTarget, currentTarget.checked, currentTarget.value);
    let newStatus = currentTarget.checked;
    // console.log(this.props.id, newStatus);
    const update = await calls.updatePublished(this.props.id, newStatus);
    if (update !== 1) {
      return alert("Published state change failed");
    }
  }
  render() {
    return React.createElement(UpdatePublishedComp, {
      status: this.props.status,
      changeHandler: this.changeHandler
    });
  }
}

// export component
export default UpdatePublished;
