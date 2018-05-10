// import modules
import React from "react";
import { Container, Row, Col, Table } from "reactstrap";

// define component
const AdminComp = ({ ...props }) =>
  <Container>
    <Row>
      <Col>
        <Table>
          <thead>
            <tr>
              <th>Collection</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>;

// export component
export default AdminComp;
