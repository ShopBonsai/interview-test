// import moduels
import React from "react";
import { TabPane, Row, Col, Table, Badge } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";
import UpdateStatus from "./updateStatus";

// define component
const OrdersTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { products, orderStatus } = props;
  const setBadge = (order, orderStatus) => {
    const status = helpers.getSingleRef(order.status, orderStatus);
    let color = "secondary";
    switch (status) {
      case "paid":
        color = "primary";
        break;
      case "collecting":
        color = "warning";
        break;
      case "shipped":
        color = "success";
        break;
    }
    return (
      <Badge color={color}>
        {helpers.titleize(status)}
      </Badge>
    );
  };
  const setHead = (order, orderStatus) =>
    <section>
      <div>
        <h6>
          {order._id}
        </h6>
        <div>
          <p>
            <span className="updatedBadge">Updated</span>
            &ensp;
            {formatter.timeSince(order.updatedAt)}
            &ensp;
          </p>
          {setBadge(order, orderStatus)}
        </div>
      </div>
    </section>;
  const setBody = (order, products, orderStatus) =>
    <section>
      <div>
        <p>Value</p>
        <h6>
          $ {formatter.price(helpers.getCartSubtotal(order.products, products))}
        </h6>
      </div>
      <div className="product-quantities">
        <p>Products</p>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map(item =>
              <tr key={item.id}>
                <td>
                  {item.id}
                </td>
                <td>
                  {item.quantity}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
          <UpdateStatus
            orderId={order._id}
            status={order.status}
            orderStatus={orderStatus}
          />
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
            {data.length > 0 ? name : `No ${name}`}
          </h4>
        </Col>
      </Row>
      <Row noGutters>
        <Col sm="12">
          {data.length > 0
            ? data.map(order => {
                const head = setHead(order, orderStatus[1]);
                const body = setBody(order, products[1], orderStatus[1]);
                return <CollapseDoc key={order._id} head={head} body={body} />;
              })
            : null}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default OrdersTab;
