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
      merchant_id: '',
      editing: true
    };
  }

  componentWillMount() {
    if (!this.props.rating) {
      this.pushRatingField(this.props.id_merch, this.props.name, 3)
    } else {
      const ratingArr = this.props.rating
      let rating;
      ratingArr.forEach(rate => {
        rating += rate
      });
      rating = rating / ratingArr.length
      this.setState({ rating: rating })
    }
    this.setState({ merchant_id: this.props.id_merch })
  }

  handleBuyProduct = () => {
    alert("This button does nothing!");
  };

  onStarClick(nextValue, prevValue, name) {
    console.log('valueClicke',nextValue)
    this.pushRatingField(this.state.merchant_id, this.props.name, nextValue)
    // this.setState({ rating: nextValue });
    this.setState({ editing: false });

  }

  pushRatingField = (id, product, rating) => Meteor.call("products.setFirstRating", id, product, rating, (error, response) => {
    if (error) {
      this.setState(() => ({ error: error }));
    } else if (rating === 0) {
      this.setState({rating: rating})
    } else {
      const ratingArr = response
      let newRating = 0;
      ratingArr.forEach(rate => {
        newRating += rate
      });
      console.log('response', newRating)
      newRating = newRating / ratingArr.length
      this.setState({ rating: newRating })
    }
  });

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
