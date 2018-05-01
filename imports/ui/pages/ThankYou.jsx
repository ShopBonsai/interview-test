// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class ThankYou extends PureComponent {
  render() {
    return (
      <Page>
        <div className="thank-you-page">
          <h2 className="title">Thank You for Buying!</h2>
          <Button
            onClick={() => {
              this.props.history.push("/shop");
            }}
          >
            Back to shopping
          </Button>
        </div>
      </Page>
    );
  }
}

export default ThankYou;
