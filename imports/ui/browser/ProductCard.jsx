// import modules
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { CardTitle, CardSubtitle, CardText } from "reactstrap";
import helpers from "../../helpers";

// define component
const ProductCard = ({ ...props }) => (
  <div className="product-card">
    <img
      width="100%"
      src={props.data.image}
      alt="Card image cap"
    />
    <section>
      <CardTitle onClick={props.viewProduct} data-productid={props.data._id}>
        {helpers.titelize(props.data.name)}
      </CardTitle>
      <CardSubtitle>
        <Link to={`/brands/${props.data.brand}`}>
          {helpers.getBrandName(props.data.brand, props.allBrands)}
        </Link>
      </CardSubtitle>
      <CardText>
        $ {helpers.formatPrice(props.data.price)}
      </CardText>
    </section>
  </div>
);

// export component
export default ProductCard;
