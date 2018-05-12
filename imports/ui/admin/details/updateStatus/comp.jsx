// import modules
import React from "react";
import { Form, Input } from "reactstrap";
import helpers from "../../../../helpers";

// define component
const UpdateStatusComp = ({ ...props }) =>
  <Form onChange={props.changeHandler}>
    <Input type="select" name="status" defaultValue={props.status}>
      {props.options.map(item =>
        <option key={item._id} value={item._id}>
          {helpers.titleize(item.name)}
        </option>
      )}
    </Input>
  </Form>;

// export component
export default UpdateStatusComp;
