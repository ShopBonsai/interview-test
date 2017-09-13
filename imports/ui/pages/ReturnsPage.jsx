// @flow

// Framework
import React, { Component } from "react"
import { Meteor } from "meteor/meteor"

// Components
import { Alert, Row, Col } from "reactstrap"
import Page from "../components/Page.jsx"

class ReturnsPage extends Component {
  constructor(props) {
    super(props)
    // Initialize State
    // Calling super() sets "this" to refer to ReturnsPage when instantiated.
    this.state = {
      lastOrder: null,
      error: null
    }
  }

  componentDidMount() {
    // Best practice to set initial requests in componentDidMount
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState({ error })
      }
      this.setState({ lastOrder: response })
    })
  }

  render() {
    const { lastOrder, error } = this.state
    console.log(lastOrder)
    return (
      <Page>
        <h1>React is awesome! 🤘</h1>
      </Page>
    )
  }
}

export default ReturnsPage
