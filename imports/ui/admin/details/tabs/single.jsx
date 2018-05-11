// import moduels
import React from "react";
import { TabPane, Row, Col, Table } from "reactstrap";
import Aligner from "../../../../helpers/aligner";
import formatter from "../../../../helpers/formatter";

// define component
const SingleTab = ({ ...props }) => {
  const [name, data] = props.data;
  const aligner = new Aligner("single");
  // console.log(data[0]);
  const ths = aligner.align(Object.entries(data[0]), "keys");
  const trs = data.map(row => aligner.align(Object.entries(row), null));
  // console.log(trs);
  const setThs = data =>
    data.map(item => {
      let inner = formatter.th(item);
      return (
        <th key={Math.random() * Math.random()}>
          {inner}
        </th>
      );
    });
  const setTds = data =>
    data.map(cell =>
      <td key={Math.random() * Math.random()}>
        {formatter.td(cell)}
      </td>
    );
  const setTrs = data =>
    data.map(row =>
      <tr key={Math.random() * Math.random()}>
        {setTds(row)}
      </tr>
    );
  // console.log(ths, tds);
  return (
    <TabPane tabId={name}>
      <Row noGutters>
        <Col sm="12">
          <h4>
            {name}
          </h4>
        </Col>
      </Row>
      <Row noGutters>
        <Col sm="12">
          <Table>
            <thead>
              <tr>
                {setThs(ths)}
              </tr>
            </thead>
            <tbody>
              {setTrs(trs)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </TabPane>
  );
};

// export component
export default SingleTab;
