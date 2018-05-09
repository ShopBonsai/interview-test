// import modules
import React from "react";
import { Row, Col } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ItemList from "./itemList";

// define component
const ItemsComp = ({ ...props }) =>
  <Row id="cart-items" noGutters>
    <Col xs="12">
      <h2>My Items</h2>
    </Col>
    <Col xs="12">
      <ItemList
        brands={props.brands}
        cartItems={props.cartItems}
        merchants={props.merchants}
        products={props.products}
        users={props.users}
        updateQuantity={props.updateQuantity}
        deleteItem={props.deleteItem}
      />
    </Col>
  </Row>;

// export component
export default ItemsComp;
