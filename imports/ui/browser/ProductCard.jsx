// import modules
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { CardTitle, CardSubtitle, CardText } from "reactstrap";
import helpers from "../../helpers";

// define component
const ProductCard = ({ ...props }) => {
  const card = (
    <div className="product-card">
      <img
        width="100%"
        src={props.data.image}
        alt="Card image cap"
      />
      <section>
        <CardTitle onClick={props.viewProduct} data-productid={props.data._id}>
          {helpers.titleize(props.data.name)}
        </CardTitle>
        <CardSubtitle onClick={props.viewBrand} data-brandid={props.data.brand}>
          {helpers.getSingleRef(props.data.brand, props.allBrands)}
        </CardSubtitle>
        <CardText>
          $ {helpers.formatPrice(props.data.price)}
        </CardText>
      </section>
    </div>
  );
  if (props.data.quantity > 0) {
    return card;
  }
  return (
    <div className="sold-out">
      {card}
    </div>
  );
};

// export component
export default ProductCard;
