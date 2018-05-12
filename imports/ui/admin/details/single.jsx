// import moduels
import React from "react";
import { TabPane, Row, Col, Table } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const SingleTab = ({ ...props }) => {
  const [name, data] = props.data;
  // console.log(name, data);
  const setHead = item =>
    <section>
      <div>
        <h6>
          {helpers.titleize(item.name)}
        </h6>
      </div>
    </section>;
  const setBody = item =>
    <section>
      <div>
        <p>ID</p>
        <h6>
          {item._id}
        </h6>
      </div>
      <div>
        <p>Updated</p>
        <h6>
          {formatter.date(item.updatedAt)}
        </h6>
      </div>
      <div>
        <p>Created</p>
        <h6>
          {formatter.date(item.createdAt)}
        </h6>
      </div>
    </section>;
  return (
    <TabPane tabId={name}>
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
            ? data.map(item => {
                const head = setHead(item);
                const body = setBody(item);
                return <CollapseDoc key={item._id} head={head} body={body} />;
              })
            : null}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default SingleTab;
