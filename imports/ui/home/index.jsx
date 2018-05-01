// Framework
import React, { PureComponent } from "react";
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
        </Container>
      </Jumbotron>
    );
  }
}


// export component
export default Home;
