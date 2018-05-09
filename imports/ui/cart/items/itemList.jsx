// import modules
import React from "react";
import { Row, Col, Form, Label, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import QuantitySelect from "../../common/quantitySelect";
import helpers from "../../../helpers";

// define component
const ItemsList = ({ ...props }) => {
  const setItems = () => {
    if (props.cartItems.length > 0 && props.brands.length > 0) {
      const cartItemIds = props.cartItems.map(item => item.product);
      const cartProducts = props.products.filter(product =>
        cartItemIds.includes(product._id)
      );
      // console.log("Cart Items:", cartProducts);
      return cartProducts.map(cartProduct =>
        <li className="grid-item" key={cartProduct._id}>
          <div className="thumbnail flex-item">
            <img src={cartProduct.image} />
          </div>
          <div className="name flex-item">
            <h3>
              {helpers.titleize(cartProduct.name)}
            </h3>
            <h5>
              by {helpers.getSingleRef(cartProduct.brand, props.brands)}
            </h5>
          </div>
          <div className="price flex-item">
            <p>Price</p>
            <h4>
              $ {helpers.formatPrice(cartProduct.price)}
            </h4>
          </div>
          <div className="quantity flex-item">
            <Form
              onChange={props.updateQuantity}
              data-productid={cartProduct._id}
            >
              <Label htmlFor="quantity">Quantity</Label>
              <QuantitySelect
                name="quantity"
                maxQuantity={cartProduct.quantity}
                currentValue={helpers.getCartQuantity(
                  cartProduct._id,
                  props.cartItems
                )}
              />
            </Form>
          </div>
          <div className="delete flex-item">
            <Button
              color="danger"
              onClick={props.deleteItem}
              data-productid={cartProduct._id}
            >
              Delete
            </Button>
          </div>
        </li>
      );
    }
    return (
      <li>
        <h5 id="no-items">No Items in Cart</h5>
      </li>
    );
  };
  return (
    <ul id="cart-list">
      {setItems(props.items)}
    </ul>
  );
};

// export component
export default ItemsList;
