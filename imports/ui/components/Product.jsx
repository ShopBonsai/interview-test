// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button";

class Product extends PureComponent {
   constructor(props) {
    super(props);
    this.state = {
       quantity : 1
    };
    
  }

  handleIncreaseQuantity = () => {
    console.log('handle increase');
    const numItem = this.state.quantity + 1;
    this.setState(() => ({ quantity: numItem }));
  }

  handleDecreaseQuantity = () => {
    console.log('handle decrease');
     if(this.state.quantity > 1){
        const numItem = this.state.quantity - 1;
        this.setState(() => ({ quantity: numItem }));     
     }
  }

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
      { label: "Price", value: price }
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
              <button onClick={this.handleIncreaseQuantity} className=" btn btn-success quantity-button">
                 +
              </button>
              <button onClick={this.handleDecreaseQuantity} className=" btn btn-danger quantity-button">
                 -
              </button>
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
