// import modules
import React from "react";
import { Container, Row, Col, Jumbotron, Table } from "reactstrap";
import Details from "./details";

// define component
const AdminComp = () =>
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
        <Col id="details">
          <h2>Collection Details</h2>
          <Details />
        </Col>
      </Row>
    </Container>
  </div>;

// export component
export default AdminComp;
