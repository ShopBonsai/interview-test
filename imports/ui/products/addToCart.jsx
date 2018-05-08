// import modules
import React from "react";
import { Form, Label, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import QuantitySelect from "./QuantitySelect";

// define component
const AddToCart = ({ ...props }) => {
  if (props.quantity < 1) {
    return (
      <Button disabled color="danger" type="submit">
        Sold Out
      </Button>
    );
  }
  return (
    <Form onSubmit={props.addToCart} data-proudctid={props.id}>
      <Label htmlFor="quantity">Quantity to Add</Label>
      <QuantitySelect name="quantity" maxQuantity={props.quantity} />
      <Button color="primary" type="submit">
        <FontAwesomeIcon icon="cart-plus" />
        Add to Cart
      </Button>
    </Form>
  );
};

// export components
export default AddToCart;
