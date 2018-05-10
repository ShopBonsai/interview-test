// import modules
import React from "react";
import { Container, Row, Col, Jumbotron, Table } from "reactstrap";
import Stats from "./stats.jsx";

// define component
const AdminComp = ({ ...props }) =>
  <div id="admin-page">
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron fluid>
            <h1>Bonsai Shop Admin</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col id="stats">
          <h2>Collection Stats</h2>
          <Stats props={props} />
        </Col>
      </Row>
    </Container>
  </div>;

// export component
export default AdminComp;
