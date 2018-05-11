// import moduels
import React from "react";
import { TabPane, Row, Col } from "reactstrap";

// define component
const OrdersTab = ({ ...props }) => {
  const [name, data] = props.data;
  return (
    <TabPane tabId={name}>
      <Row>
        <Col sm="12">
          <h4>
            {name}
          </h4>
          <p>{data.length}</p>
          <p>{JSON.stringify(data)}</p>
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default OrdersTab;
