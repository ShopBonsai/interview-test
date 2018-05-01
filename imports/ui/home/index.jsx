// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import ProfileTypes from "../../api/profileTypes/collection";
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

// define component
class Home extends PureComponent {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <Row>
            <Col xs="12" md="8">
              <h1>Store</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <p>{JSON.stringify(this.props.allProfileTypes)}</p>
            </Col>
            <Col xs="6">
              <p>{JSON.stringify(this.props.allUsers[0])}</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}


// export component
// export mondule
export default withTracker(() => {
  Meteor.subscribe("users");
  Meteor.subscribe("profileTypes");
  return {
    currentUser: Meteor.user(),
    allUsers: Meteor.users.find().fetch(),
    allProfileTypes: ProfileTypes.find().fetch()
  };
})(Home);
