// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col, Button } from "reactstrap";
import Page from "../components/Page.jsx";

class HelpButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.props.onClick}>Talk to Someone</Button>{' '}
      </div>
      );
  }
}

class HelpModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Button color="primary">Call Us</Button>{' '}
        </Row>
        <Row>
          <Button color="primary" onClick={this.props.onClick}>Close</Button>{' '}
        </Row>
      </div>
      );
  }
}

class ReturnsPage extends Component {
  constructor(props) {
    super(props);
    // Initialize State
    this.initialState = {
      lastOrder: null,
      error: null,
      showHelp: false
    };
    this.state = this.initialState;
  }

  componentWillMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      }
      this.setState(() => ({ lastOrder: response }));
    });
  }

  openHelp(e) {
    this.setState(() => ({ showHelp: true }));
  }

  closeHelp(e) {
    this.setState(() => ({ showHelp: false }));
  }

  render() {
    const { lastOrder, error } = this.state;

    if (this.state.showHelp) {
      var help = React.createElement(HelpModal, {onClick: this.closeHelp.bind(this)});
    } else {
      var help = null;
    }

    return (
      <Page>
        <Row>
          <Col>
            <HelpButton onClick={() => this.openHelp()}/>
            {help}
            <Alert className="mt-3">
              I would highly recommend understanding the structure of the order
              object first and how it should relate to the designs.
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            {JSON.stringify(lastOrder)}
          </Col>
        </Row>
        <Row>
          <Col>
            {error}
          </Col>
        </Row>
      </Page>
    );
  }
}

export default ReturnsPage;
