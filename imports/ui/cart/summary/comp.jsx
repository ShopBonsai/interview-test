// Framework
import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// define component
const SummaryComp = ({ ...props }) =>
  <article>
    <h2>
      <FontAwesomeIcon icon="boxes" />Order Summary
    </h2>
    <section>
      <div id="subtotal">
        <h6>Subtotal</h6>
        <p>
        </p>
      </div>
      <div id="itemCount">
        <h6>Items</h6>
        <p>
          {JSON.stringify(props.cartItems)}
          &emsp;
        </p>
      </div>
    </section>
  </article>;

// export component
export default SummaryComp;
