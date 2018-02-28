// Framework
import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading">
        <img alt="Loading" src="/images/loader.svg" />
      </div>
    );
  }
}

export default Loading;
