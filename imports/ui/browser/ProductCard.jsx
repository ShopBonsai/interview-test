// import modules
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import helpers from "../../helpers";

// define component
class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    // console.log(this.props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="product-card">
        <img
          width="100%"
          src={data.image}
          alt="Card image cap"
        />
        <section>
          <CardTitle>
            <Link to={`/products/${data._id}`}>
              {helpers.titelize(data.name)}
            </Link>
          </CardTitle>
          <CardSubtitle>
            <Link to={`/brands/${data.brand}`}>
              {helpers.getBrandName(data.brand, this.props.allBrands)}
            </Link>
          </CardSubtitle>
          <CardText>
            $ {helpers.formatPrice(data.price)}
          </CardText>
        </section>
      </div>
    );
  }
}

// export component
export default ProductCard;
