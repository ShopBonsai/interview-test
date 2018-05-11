// import modules
import React, { PureComponent } from "react";
import { CardTitle, CardSubtitle, CardText, Badge } from "reactstrap";
import helpers from "../../../helpers";
import formatter from "../../../helpers/formatter";

// define component
const ProductCard = ({ ...props }) => {
  const card = (
    <div className="inner-card">
      <img width="100%" src={props.data.image} alt="Card image cap" />
      <section>
        <CardTitle onClick={props.viewProduct} data-productid={props.data._id}>
          {helpers.titleize(props.data.name)}
        </CardTitle>
        <CardSubtitle onClick={props.viewBrand} data-brandid={props.data.brand}>
          {helpers.getSingleRef(props.data.brand, props.allBrands)}
        </CardSubtitle>
        <CardText>
          $ {formatter.price(props.data.price)}
        </CardText>
      </section>
    </div>
  );
  if (props.data.quantity > 0) {
    return (
      <div className="product-card">
        {card}
      </div>
    );
  }
  return (
    <div className="product-card">
      <Badge color="danger">Sold Out</Badge>
      {card}
    </div>
  );
};

// export component
export default ProductCard;
