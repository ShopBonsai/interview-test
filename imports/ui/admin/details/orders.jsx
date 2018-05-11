// import moduels
import React from "react";
import { TabPane, Row, Col } from "reactstrap";
import formatter from "../../../helpers/formatter";
import helpers from "../../../helpers";
import CollapseDoc from "./collapseDoc";

// define component
const OrdersTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { orderStatus } = props;
  const setHead = order =>
    <section>
      <div>
        <h6>
          {order._id}
        </h6>
        <p>
          {formatter.hoursSince(order.updatedAt)}
        </p>
      </div>
    </section>;
  const setBody = (order, orderStatus) =>
    <section>
      <div>
        <p>Value</p>
        <h6>
          {helpers.getOrderValue(order.products)}
        </h6>
      </div>
      <div>
        <p>Products</p>
        <h6>
          {order.products.length}
        </h6>
      </div>
      <div>
        <p>Customer Profile ID</p>
        <h6>
          {order.customer}
        </h6>
      </div>
      <div>
        <p>Shipping Address</p>
        <h6>
          {order.destination}
        </h6>
      </div>
      <div>
        <p>Order Status</p>
        <h6>
          {helpers.getSingleRef(order.status, orderStatus)}
        </h6>
      </div>
      <div>
        <p>Created</p>
        <h6>
          {formatter.date(order.createdAt)}
        </h6>
      </div>
    </section>;
  return (
    <TabPane tabId={name} id="orders">
      <Row>
        <Col sm="12">
          <h4>
            {name}
          </h4>
        </Col>
      </Row>
      <Row noGutters>
        <Col sm="12">
          {data.map(order => {
            const head = setHead(order);
            const body = setBody(order, orderStatus[1]);
            return <CollapseDoc key={order._id} head={head} body={body} />;
          })}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default OrdersTab;
