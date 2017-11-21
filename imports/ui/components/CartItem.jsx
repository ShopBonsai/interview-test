// Framework
import React, { PureComponent } from "react";

class CartItem extends PureComponent {
    render() {
        const { product, removeFromCart } = this.props
        const { name, price, qty } = product;
        return (
            <div className="cartItem">
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="price">{qty + " x $" + price}</div>
                </div>
                <button onClick={() => removeFromCart(product)}>
                    Remove
                </button>
            </div>
        )
    }
}

export default CartItem;