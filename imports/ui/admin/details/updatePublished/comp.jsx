// import modules
import React from "react";
import { Form, Input, Label } from "reactstrap";

// define component
const UpdatePublishedComp = ({ ...props }) =>
  <form>
    <label htmlFor="updatePublished">
      {props.status ? "Yes" : "No"}
      <input
        name="updatePublished"
        type="checkbox"
        value={props.status ? "published" : "unpublished"}
        checked={props.status ? true : false}
        onChange={props.changeHandler}
      />
    </label>
  </form>;

// export component
export default UpdatePublishedComp;
