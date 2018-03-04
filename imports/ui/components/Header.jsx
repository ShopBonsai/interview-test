// Framework
import React, { PureComponent } from "react";
import Icon from "react-icons-kit";
import { NotificationContainer } from "react-notifications";
import { cart } from "react-icons-kit/icomoon/cart";
import "react-notifications/lib/notifications.css";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.setState({
      cart: nextProps.cart
    });
    return true;
  }

  render() {
    return (
      <header className="row">
        <button onClick={this.props.goBack} className="back-button col-1">
          {/* Image added here to show image inclusion, prefer inline-SVG. */}
          <img alt="Back" src={`/icon/header/back-white.svg`} />
        </button>
        <div className="col-10 page-name">
          <h1>
            {this.props.children}
          </h1>
        </div>
        {this.state.cart
          ? <div
              className="right-content col-1"
              onClick={() => this.props.history.push("/cart")}
            >
              <Icon className="cart-icon" size={30} icon={cart} />
              <span className="products-number">
                {this.state.cart.items.length}
              </span>
            </div>
          : ""}
        <div className="notification-manager">
          <NotificationContainer />
        </div>
      </header>
    );
  }
}
export default Header;
