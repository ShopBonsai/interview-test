// Framework
import React, { PureComponent } from "react";

// React-Redux
import {connect} from 'react-redux';

// Redux action
import {buyProduct} from '../redux/actions/purchase';

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  handleBuyProduct = id => {
    this.props.buyProduct(id);
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
          <Button onClick={this.handleBuyProduct.bind(this, {name, brand, size})}>
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    buyProduct : product =>  dispatch(buyProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(Product) ;
