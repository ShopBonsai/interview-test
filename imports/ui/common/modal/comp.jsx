// import modules
import React from "react";
import { Button } from "reactstrap";

// define component
const ModalComp = ({ ...props }) =>
  <div
    id="modal"
    className={props.status === true ? "modal-visible" : "modal-hidden"}
  >
    <section>
      <h4>Alert</h4>
      <p>
        {props.message}
      </p>
      <Button color="primary" onClick={props.closeHandler}>
        OK
      </Button>
    </section>
  </div>;

// export component
export default ModalComp;
