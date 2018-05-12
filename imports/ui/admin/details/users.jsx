// import moduels
import React from "react";
import { TabPane, Row, Col, Table, Badge } from "reactstrap";
import CollapseDoc from "./collapseDoc";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const UsersTab = ({ ...props }) => {
  const [name, data] = props.data;
  const { customers, merchants, profileTypes } = props;
  const setBadge = name => {
    let color = "";
    switch (name) {
      case "merchant":
        color = "primary";
        break;
      default:
        color = "success";
    }
    return (
      <Badge color={color}>
        {helpers.titleize(name)}
      </Badge>
    );
  };
  const setHead = (user, customers, merchants, profileTypes) =>
    <section>
      <div>
        <h6>
          {user.username}
        </h6>
        <div>
          <p>
            <span className="updatedBadge">Profile Type</span>
            &ensp;
          </p>
          {setBadge(
            helpers.getUserProfileType(
              user.profile,
              customers,
              merchants,
              profileTypes
            ).name
          )}
        </div>
      </div>
    </section>;
  const setBody = (user, customers, merchants, profileTypes) =>
    <section>
      <div>
        <p>ID</p>
        <h6>
          {user._id}
        </h6>
      </div>
      <div>
        <p>Email</p>
        <h6>
          {user.emails[0].address}
        </h6>
      </div>
      <div>
        <p>Profile ID</p>
        <h6>
          {user.profile}
        </h6>
      </div>
      <div>
        <p>Profile Type ID</p>
        <h6>
          {
            helpers.getUserProfileType(
              user.profile,
              customers,
              merchants,
              profileTypes
            )._id
          }
        </h6>
      </div>
    </section>;
  return (
    <TabPane tabId={name} id="users">
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
            ? data.map(user => {
                const head = setHead(user, customers[1], merchants[1], profileTypes[1]);
                const body = setBody(user, customers[1], merchants[1], profileTypes[1]);
                return <CollapseDoc key={user._id} head={head} body={body} />;
              })
            : null}
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default UsersTab;
