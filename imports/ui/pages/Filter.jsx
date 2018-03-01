// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Search from "../components/Search";
import { Button, Col, Container, Input, Row } from "reactstrap";

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: parseInt(this.props.match.params.minPrice),
      max: parseInt(this.props.match.params.maxPrice),
      keyword: this.props.match.params.keyword || ""
    };
  }

  _onMaxPriceChange(e) {
    e.persist();
    this.setState(() => ({ max: parseInt(e.target.value) }));
  }

  _onMinPriceChange(e) {
    e.persist();
    this.setState(() => ({ min: parseInt(e.target.value) }));
  }

  _submit() {
    this.props.history.push(
      `/shop/${this.state.keyword}/${this.state.min}/${this.state.max}`
    );
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { products, loading } = this.state;

    return (
      <Page pageTitle="Filter" history goBack={this.goBack}>
        <Container style={{ paddingTop: 10 + "px" }}>
          <h1>Price:</h1>
          <Row>
            <Col>
              <Input
                type="number"
                name="min"
                id="min"
                className="min"
                step="1"
                placeholder="Min Price"
                value={this.state.min}
                onChange={this._onMinPriceChange.bind(this)}
              />
            </Col>
            <Col>
              <Input
                type="number"
                name="max"
                id="max"
                step="1"
                className="max"
                placeholder="Max Price"
                value={this.state.max}
                onChange={this._onMaxPriceChange.bind(this)}
              />
            </Col>
          </Row>
          <Row
            style={{
              paddingTop: 20 + "px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button onClick={this._submit.bind(this)}>Submit</Button>
          </Row>
        </Container>
      </Page>
    );
  }
}
