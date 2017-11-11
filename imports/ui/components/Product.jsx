// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0
    };
  }
  
  handleBuyProduct = () => {
    alert("This button does nothing!");
  };
  
  handleLikeProduct = (e) => {
    Meteor.call("likes.createLikeByProductId", e, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ likes: response }));
      }
    });
  };
  
  

  render() {
    const {
      id,
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size,
      likes
    } = this.props;
    
    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];
    
    this.state.likes = this.state.likes > 0 ? this.state.likes : likes;
    
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
          <Button onClick={this.handleBuyProduct}>
            Buy {name}
          </Button>
          <div>
            <Button onClick={this.handleLikeProduct.bind(this, id)}>    
              <img src="http://flaticons.net/gd/makefg.php?i=icons/Election/Thumbs-Up.png&r=255&g=255&b=255" /> {this.state.likes}
          </Button>
          </div>    
        </div>
        
      </div>
    );
  }
}

export default Product;
