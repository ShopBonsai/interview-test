// Framework
import React from "react";

// Components
import CartItem from "./CartItem.jsx"

const Cart = ({ products, total, removeFromCart }) => {
    return (
        <div className="cart">
            <div className="header"><h4>Cart</h4></div>
            <div className="items">
                {products.map(({ ...product }) =>
                    <CartItem product={{ ...product }} key={product.id} removeFromCart={removeFromCart} />
                )}
            </div>
            <div className="footer">
                <div className="label">Total</div>
                <div className="total">{"$" + Math.round(100 * total) / 100}</div>
            </div>
        </div>
    )

}

export default Cart;