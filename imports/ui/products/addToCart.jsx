// import modules
import React from "react";
import { Form, Label, Input, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// define component
const AddToCart = ({ ...props }) => {
  const setButton = () =>
    props.quantity > 0
      ? <Button color="primary" type="submit">
          <FontAwesomeIcon icon="cart-plus" />
          Add to Cart
        </Button>
      : <Button disabled color="danger" type="submit">
          Out of Stock
        </Button>;
  return (
    <Form onSubmit={props.addToCart} data-proudctid={props.id}>
      <Label htmlFor="quantity">Quantity to Add</Label>
      <Input
        type="number"
        id="quantity"
        min="1"
        max={props.quantity}
        placeholder={props.quantity}
        name="quantity"
      />
      {setButton()}
    </Form>
  );
};

// export components
export default AddToCart;
