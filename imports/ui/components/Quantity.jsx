// Framework
import React from "react";
import {Container,Row,Col} from 'reactstrap';

const Quantity = ({ children, onPlusClick, onMinusClick, quantityInCart, className = "",  ...extraProps }) => {
  return (
  	<Container>
  		<Row>
  		<Col>
	  	<button
	      {...extraProps}
	      className={`bonsai-button ${className}`}
	      onClick={onMinusClick}
	    >
	      -
	    </button>
  		</Col>
  		<Col>
	    {quantityInCart ? quantityInCart : 0}
  		</Col>
  		<Col>
	    <button
	      {...extraProps}
	      className={`bonsai-button ${className}`}
	      onClick={onPlusClick}
	    >
	      +
	    </button>
  		</Col>
  		</Row>
  	</Container>	
  );
};

export default Quantity;
