// import moduels
import React from "react";
import { TabPane, Row, Col, Table, Badge } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const CustomersTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { profileTypes, orders, products } = props;
  const setHead = (customer, orders, products) =>
    <section>
      <div>
        <h6>
          {customer.email}
        </h6>
        <div>
          <p>
            <span className="updatedBadge">CLV</span>
            &ensp;$&nbsp;{formatter.price(
              helpers.getClv(customer, orders, products)
            )}
            &ensp;
          </p>
        </div>
      </div>
    </section>;
  const setBody = (customer, profileTypes, orders, products) =>
    <section>
      <div>
        <p>ID</p>
        <h6>
          {customer._id}
        </h6>
      </div>
      <div>
        <p>Profile Type ID</p>
        <h6>
          {customer.profileType}
        </h6>
      </div>
      <div className="product-quantities">
        <p>Orders</p>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {customer.orders.map(order =>
              <tr key={order}>
                <td>
                  {order}
                </td>
                <td>
                  $&nbsp;
                  {formatter.price(
                    helpers.getOrderValue(order, orders, products)
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <p>Name</p>
        <h6>
          {helpers.titleize(
            `${customer.firstName} ${customer.lastName}`
          )}
        </h6>
      </div>
      <div>
        <p>Created</p>
        <h6>
          {formatter.date(customer.createdAt)}
        </h6>
      </div>
    </section>;
  return (
    <TabPane tabId={name} id="customers">
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
            ? data.map(customer => {
                const head = setHead(customer, orders[1], products[1]);
                const body = setBody(customer, profileTypes[1], orders[1], products[1]);
                return <CollapseDoc key={customer._id} head={head} body={body} />;
              })
            : null}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default CustomersTab;
