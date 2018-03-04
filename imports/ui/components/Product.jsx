// Framework
import React, { Component } from "react";
import { Icon } from "react-icons-kit/Icon";
import { cart } from "react-icons-kit/icomoon/cart";
import { info } from "react-icons-kit/icomoon/info";

// Components
import { ProductModal } from "./modals/ProductModal";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  handleBuyProduct = () => {
    alert("This button does nothing!");
  };

  /**
   * toggle the modal showing state
   */
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const product = this.props.product;
    return (
      <div className="row product">
        <div className="col-md-12">
          <img className="product-img" alt={product.name} src={product.image} />
        </div>
        <div className="col-md-12 buttons">
          <Icon
            className="buy-button"
            size={25}
            icon={cart}
            onClick={() => {
              this.props.addTocart(product);
            }}
          />
          <p className="product-name" onClick={this.toggleModal}>
            {product.name}
          </p>
          <Icon
            className="info-button"
            size={25}
            icon={info}
            onClick={this.toggleModal}
          />
        </div>
        {this.state.showModal
          ? <ProductModal
              closeModal={this.toggleModal}
              showModal={this.state.showModal}
              product={product}
            />
          : ""}
      </div>
    );
  }
}

export default Product;
