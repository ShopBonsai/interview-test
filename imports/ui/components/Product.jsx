// Framework
import React, { PureComponent } from "react";
import StarRatingComponent from 'react-star-rating-component';
import { Meteor } from "meteor/meteor";

// Components
import Button from "../components/Button.jsx";

class Product extends PureComponent {
  constructor() {
    super();

    this.state = {
      rating: 0,
      editing: true
    };
  }
  handleBuyProduct = () => {
    alert("This button does nothing!");
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.setState({ editing: false });
    console.log(prevValue)
    console.log(nextValue)
    console.log(name)
  }

  insertRatingField = (id, product) => Meteor.call("teste", id, product, (error, response) => {
    if (error) {
      this.setState(() => ({ error: error }));
    } else {
      this.setState({rating: 0})
    }
  });

  componentWillMount() {
    if (!this.props.rating){
      this.insertRatingField(this.props.id_merch, this.props.name)
    } else {
      
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
            <div className="info-row">
              <div className="label"> Rating:
              </div>
                <StarRatingComponent 
                  name={name}
                  starCount={5}
                  value={this.state.rating}
                  onStarClick={this.onStarClick.bind(this)}
                  editing={this.state.editing}
                />
            </div>
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
