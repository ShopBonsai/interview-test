// import modules
import React from "react";
import { Button } from "reactstrap";

// define component
const ModalComp = ({ ...props }) => {
  if (props.kind === "alert") {
    return (
      <div id="modal">
        <section>
          <h4>Alert</h4>
          <p>
            {props.message}
          </p>
          <Button color="primary" onClick={props.close}>
            OK
          </Button>
        </section>
      </div>
    );
  }
};

// export component
export default ModalComp;
