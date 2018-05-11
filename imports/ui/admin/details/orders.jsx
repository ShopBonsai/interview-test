// import moduels
import React from "react";
import { TabPane, Row, Col, Table } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const OrdersTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { products, orderStatus } = props;
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
              <tr>
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
            {data.length > 0 ? name : `No ${name}`}
          </h4>
        </Col>
      </Row>
      <Row noGutters>
        <Col sm="12">
          {data.length > 0
            ? data.map(order => {
                const head = setHead(order);
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
