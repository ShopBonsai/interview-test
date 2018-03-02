import React, { Component } from "react";

import { bin } from "react-icons-kit/icomoon/bin";
import { coinDollar } from "react-icons-kit/icomoon/coinDollar";
import { Icon } from "react-icons-kit";
import { ProductModal } from "./modals/ProductModal";

export class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occurrence: this.props.occurrence,
      showModal: false
    };
    this.changeOccurrence = this.changeOccurrence.bind(this);
  }

  changeOccurrence(event) {
    const value = Number.parseInt(event.target.value);
    this.setState({ occurrence: value });
    this.props.updateOccrrence(this.props.product.id, value);
  }

  toogleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div className="row cart-product">
        <div className="col-xs-1" onClick={this.toogleModal}>
          <img className="product-picture" src={this.props.product.image} />
        </div>
        <div className="col-xs-5 product-name" onClick={this.toogleModal}>
          <span>
            {this.props.product.name}
          </span>
        </div>
        <div className="col-xs-2">
          {this.props.product.price}
          <Icon size={15} icon={coinDollar} className="price-icon" />
        </div>
        <div className="col-xs-2">
          <input
            className="occurrence"
            min="1"
            max={this.props.product.quantity}
            type="number"
            value={this.state.occurrence}
            onChange={this.changeOccurrence}
          />
        </div>
        <div className="col-xs-2">
          <Icon
            className="delete-icon"
            size={30}
            icon={bin}
            onClick={() => this.props.removeProduct(this.props.product.id)}
          />
        </div>
        {this.state.showModal
          ? <ProductModal
              closeModal={this.toogleModal}
              showModal={this.state.showModal}
              product={this.props.product}
            />
          : ""}
      </div>
    );
  }
}
