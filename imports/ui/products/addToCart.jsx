// import modules
import React from "react";
import { Form, Label, Input, Button } from "reactstrap";

// define component
const AddToCart = ({ ...props }) => {
  const setButton = () =>
    props.quantity > 0
      ? <Button color="primary" type="submit">
          Add to Cart
        </Button>
      : <Button disabled color="secondary" type="submit">
          Out of Stock
        </Button>;
  return (
    <Form>
      <Label htmlFor="quantity">Quantity to Add</Label>
      <Input
        type="number"
        id="quantity"
        min="0"
        max={props.quantity}
        placeholder={props.quantity}
      />
      {setButton()}
    </Form>
  );
};

// export components
export default AddToCart;
