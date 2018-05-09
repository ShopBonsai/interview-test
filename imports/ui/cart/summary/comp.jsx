// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import helpers from "../../../helpers";
import Products from "../../../api/products/collection";

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
          {JSON.stringify(props.cartItems)}
          {helpers.getCartSubtotal(props.cartItems, props.brands)}
        </p>
      </div>
      <div id="itemCount">
        <h6>Items</h6>
        <p>
          {helpers.getTotalCartItems(props.cartItems)}
        </p>
      </div>
    </section>
  </article>;

// export component
export default SummaryComp;
