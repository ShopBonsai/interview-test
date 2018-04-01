// Framework
import React, { PureComponent } from "react";


import { Orders } from "../../api/orders/collection";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {


  handleChange = (event) => {
    this.quant = event.target.value;
  };

  handleBuyProduct = () => {

    let quant = ((this.quant == undefined) ? 1 : this.quant);

    alert(this.props.name + " Added to cart!");
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;
    
    let product = {name,};

    const info = {
      brand: brand ,
      name: name ,
      image: image,
      description: description ,
      color: color ,
      size: size ,
      price: price,
      quantity: quant
    };

    let getCookiebyName = function(name){
      let pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
      return !!pair ? pair[1] : null;
    };

    let cart = JSON.parse(getCookiebyName("cart"));

    if (cart === null) {
      cart = []
    }
    let alreadyin = false;
    for(let i = 0; i < cart.length; i++){
      if(this.props.name == cart[i].name){
        alreadyin = true;
        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quant);
      }
    }
    if(alreadyin == false){
      cart.push(info);
    }
  
    document.cookie = "cart=" + JSON.stringify(cart);
    Orders.insert(info);
  };

  renderButton() {
      switch (this.props.buttonActive) {
        case false:
          return( <Button hidden onClick={this.handleBuyProduct}>
            Buy {name}
               </Button>)
        default: 
        return( <Button onClick={this.handleBuyProduct}>
                    Buy {this.props.name}
              </Button>)
      }
  };

  renderQuant() {
    switch (this.props.buttonActive) {
      case false:
          return( <div> 
            <div className="label">
                 Quantity: {this.props.quantity}
          </div>
          </div>)
      default: 
          return( <div> 
                   <div className="label">
                        Quantity:
                 </div><input id={this.props.name} type="number" placeholder="1"  onChange={this.handleChange}/>
                 </div>)
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
      buttonActive,
      quantity,
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price },
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
            <div className="info-row" key={500000}>
                <div className="value">
                {this.renderQuant()}
                </div>
              </div>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default Product;
