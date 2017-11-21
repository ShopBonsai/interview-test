// Framework
import React from "react";

// Components
import CartItem from "./CartItem.jsx"
import Button from "./Button.jsx"

const Cart = ({ products, total, removeFromCart, checkout }) => {
    return (
        <div className="cart">
            <div className="header"><h4>Cart</h4></div>
            <div className={"items"+(products.length == 0?" emptyCart":"")}>
                {products.map(({ ...product }) =>
                    <CartItem product={{ ...product }} key={product.id} removeFromCart={removeFromCart} />
                )}
                {products.length != 0 &&
                <div className="button"><Button onClick={()=>checkout(products,total)}>Checkout</Button></div>}

                {products.length == 0 &&
                <p>Cart is Empty</p>}
            </div>
            <div className="footer">
                <div className="label">Total</div>
                <div className="total">{"$" + Math.round(100 * total) / 100}</div>
            </div>
        </div>
    )

}

export default Cart;