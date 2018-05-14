// Framework
import React, { PureComponent } from "react";
import SortComp from "./comp";

// define component
class Sort extends PureComponent {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(event) {
    event.preventDefault();
    const { currentTarget, target } = event;
    const formData = new FormData(currentTarget);
    const sort = formData.get("sort");
    // console.log(sort);
    this.props.setSort(sort);
  }
  render() {
    return React.createElement(SortComp, {
      changeHandler: this.changeHandler,
      currentSort: this.props.currentSort
    });
  }
}

// export component
export default Sort;
