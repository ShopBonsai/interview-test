// import moduels
import React from "react";
import { TabPane, Row, Col, Table, Badge } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import UpdatePublished from "./updatePublished";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const ProductsTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { brands, categories, merchants, users } = props;
  const setBadge = count => {
    let color = "success";
    if (count > 5) {
      color = "success";
    } else if (count > 2) {
      color = "warning";
    } else if (count > -1) {
      color = "danger";
    }
    return (
      <Badge color={color}>
        {count}
      </Badge>
    );
  };
  const setHead = product =>
    <section>
      <div>
        <h6>
          {helpers.titleize(product.name)}
        </h6>
        <div>
          <p>
            <span className="updatedBadge">Stock Level</span>
            &ensp;
          </p>
          {setBadge(product.quantity)}
        </div>
      </div>
    </section>;
  const setBody = product =>
    <section>
      <div>
        <p>ID</p>
        <h6>
          {product._id}
        </h6>
      </div>
      <div>
        <p>Name</p>
        <h6>
          {helpers.titleize(product.name)}
        </h6>
      </div>
      <div>
        <p>Brand</p>
        <h6>
          {product.brand}
        </h6>
      </div>
      <div>
        <p>Category</p>
        <h6>
          {product.category}%
        </h6>
      </div>
      <div>
        <p>Published</p>
        <UpdatePublished status={product.published} id={product._id} />
      </div>
      <div>
        <p>Price</p>
        <h6>
          $&nbsp;
          {formatter.price(product.price)}
        </h6>
      </div>
      <div>
        <p>Colour</p>
        <h6>
          {helpers.titleize(product.color)}
        </h6>
      </div>
      <div>
        <p>Size</p>
        <h6>
          {helpers.titleize(
            helpers.adjustSizes(product.size)
          )}
        </h6>
      </div>
      <div>
        <p>Stock</p>
        <h6>
          {product.quantity}
        </h6>
      </div>
      <div>
        <p>Description</p>
        <h6>
          {product.description}
        </h6>
      </div>
      <div>
        <p>Image</p>
        <img src={product.image} width="200px" />
      </div>
      <div>
        <p>Created</p>
        <h6>
          {formatter.date(product.createdAt)}
        </h6>
      </div>
    </section>;
  return (
    <TabPane tabId={name} id="products">
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
            ? data.map(product => {
                const head = setHead(product);
                const body = setBody(product);
                return <CollapseDoc key={product._id} head={head} body={body} />;
              })
            : null}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default ProductsTab;
