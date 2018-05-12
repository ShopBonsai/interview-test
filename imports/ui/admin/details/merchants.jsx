// import moduels
import React from "react";
import { TabPane, Row, Col, Table, Badge } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const MerchantsTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { brands, products, profileTypes, users } = props;
  const setHead = (merchant, products, users) =>
    <section>
      <div>
        <h6>
          {helpers.titleize(merchant.name)}
        </h6>
        <div>
          <p>
            <span className="updatedBadge">Products Available</span>
            &ensp;
          </p>
          <Badge color="danger">
            {helpers.getMerchantProducts(merchant._id, products, users).length}
          </Badge>
        </div>
      </div>
    </section>;
  const setBody = (merchant, profileTypes, products, users, brands) =>
    <section>
      <div>
        <p>ID</p>
        <h6>
          {merchant._id}
        </h6>
      </div>
      <div>
        <p>Profile Type ID</p>
        <h6>
          {merchant.profileType}
        </h6>
      </div>
      <div>
        <p>Commission</p>
        <h6>
          {merchant.commission}%
        </h6>
      </div>
      <div>
        <p>Phone</p>
        <h6>
          {merchant.phone}
        </h6>
      </div>
      <div>
        <p>Address</p>
        <h6>
          {merchant.address}
        </h6>
      </div>
      <div>
        <p>Description</p>
        <h6>
          {merchant.description}
        </h6>
      </div>
      <div>
        <p>Logo</p>
        <img src={merchant.logo} />
      </div>
      <div className="inner-table">
        <p>Brands</p>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {helpers
              .getMerchantProducts(merchant._id, products, users)
              .map(product =>
                <tr key={product._id}>
                  <td>
                    {product.brand}
                  </td>
                  <td>
                    {helpers.titleize(
                      helpers.getSingleRef(product.brand, brands)
                    )}
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
      </div>
      <div className="inner-table">
        <p>Products</p>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {helpers
              .getMerchantProducts(merchant._id, products, users)
              .map(product =>
                <tr key={product._id}>
                  <td>
                    {product._id}
                  </td>
                  <td>
                    $&nbsp;
                    {formatter.price(product.price)}
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
      </div>
      <div>
        <p>Created</p>
        <h6>
          {formatter.date(merchant.createdAt)}
        </h6>
      </div>
    </section>;
  return (
    <TabPane tabId={name} id="merchants">
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
            ? data.map(merchant => {
                const head = setHead(merchant, products[1], users[1]);
                const body = setBody(merchant, profileTypes[1], products[1], users[1], brands[1]);
                return <CollapseDoc key={merchant._id} head={head} body={body} />;
              })
            : null}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default MerchantsTab;
