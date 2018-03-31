// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {

  constructor(){
    super();
    this.state = {
      quantitySelect: 1
    }
  }

  handleBuyProduct = (e) => {
    e.preventDefault();
    const itemInfo = {
      productInfo: {
        brand: this.props.brand,
        name: this.props.name,
        description: this.props.description,
        color: this.props.color,
        size: this.props.size,
        price: this.props.price,
        image: this.props.image
      },
      quantityBought: this.state.quantitySelect,
      totalPrice: (this.state.quantitySelect * this.props.price).toFixed(2)
    }
    const userId = Meteor.userId();
    Meteor.call("orders.createAndUpdateOrder", userId, itemInfo, (error, response) => {
      if(error){
        M.toast({html: error.reason, classes: 'rounded red', displayLength: '2000'});
      } else {
        M.toast({html: "Added to the Cart", classes: 'rounded green', displayLength: '2000'});
      }
    })
  }

  handleIncreaseItem = (e) => {
    e.preventdefault;
    if (this.state.quantitySelect < this.props.quantity){
      this.setState({quantitySelect: this.state.quantitySelect + 1});
    }
  }

  handleDecreaseItem = (e) => {
    e.preventdefault;
    if (this.state.quantitySelect > 1){
      this.setState({quantitySelect: this.state.quantitySelect - 1});
    }
  }
   
  render() {

    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size,
      quantity
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price },
      { label: "Avaliable in stock", value: quantity }
    ];
    
    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <div className="info">
            {info.map(({ label, value }) =>
              <div className="info-row" key={`${name}-${label}-${value}`}>
                <div className="label">
                  {label}:
                </div>
                <div className="value">
                  {value}
                </div>
              </div>
            )}
          </div>
          <div>
            <button className="waves-effect waves-light btn-small" onClick={this.handleDecreaseItem}><i className="fas fa-minus"></i></button>     
            <span className="styleSpan">
                {this.state.quantitySelect}     
            </span>
            <button className="waves-effect waves-light btn-small" onClick={this.handleIncreaseItem}><i className="fas fa-plus"></i></button>
          </div>
          <br />
          <div>Total Price: {(this.state.quantitySelect * price).toFixed(2)}</div>
          <Button onClick={this.handleBuyProduct} >
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
