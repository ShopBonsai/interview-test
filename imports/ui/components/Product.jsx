// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button";

// this component renders the quantity button
import ActionButton from "./ActionButton";

// this component will be responsible for formatting the price
import {FormattedNumber} from 'react-intl';
/*
  This component is responsible for 
   execute the flow of adding a product 
   in the cart
*/
class Product extends PureComponent {
   constructor(props) {
    super(props);
    this.state = {
       quantity : 1
    };
    
  }

  /* this function adds 
     the quantity of each product
  */ 
  handleIncreaseQuantity = () => {
    console.log('handle increase');
    const numItem = this.state.quantity + 1;
    this.setState(() => ({ quantity: numItem }));
  }

  /* this function subtracts 
     the quantity of each product
  */ 
  handleDecreaseQuantity = () => {
    console.log('handle decrease');
     if(this.state.quantity > 1){
        const numItem = this.state.quantity - 1;
        this.setState(() => ({ quantity: numItem }));     
     }
  }
  
  /* this function mounts the product object, 
     gets its respective quantity and add 
     in the parent component(Shop) state through the 
     addItem function  */
  handleBuyProduct = () => {
    const product = {
        id : this.props.id,
        name : this.props.name,
        price : this.props.price
    };
    const quantity = this.state.quantity;
    this.props.addItem(product,quantity);
    this.setState(() => ({ quantity: 1 }));

  };

  render() {
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: <FormattedNumber value={price} style="currency" currency="CAD" /> }
    ];
    const {quantity} = this.state;

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
            <div className="info-row">
                  <p>Number of items to purchase : {quantity}</p>
            </div>
          </div>
          <div className="info">
              <ActionButton function={this.handleIncreaseQuantity}
                            style="btn btn-success quantity-button"
                            desc="+" />
              
              <ActionButton function={this.handleDecreaseQuantity}
                            style="btn btn-danger quantity-button"
                            desc="-" />
          </div>
          <Button onClick={this.handleBuyProduct}>
            Buy {name}
          </Button> 
        </div>

      </div>
    );
  }
}

export default Product;
