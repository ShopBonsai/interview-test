// Framework
import React from "react";
import {Container,Row,Col,ButtonGroup,Button} from 'reactstrap';

const Quantity = ({ children, onPlusClick, onMinusClick, quantityInCart, className = "",  ...extraProps }) => {
  return (
  	<Container>
      	<Row style={{textAlign:"center"}}>
  		<Col style={{padding:"0"}}>
	  	<Button
	      {...extraProps}
	      style={{width:"100%"}}
	      onClick={onMinusClick}
	    >
	      -
	    </Button>
  		</Col>
  		<Col style={{textAlign:"center"}}>
	    {quantityInCart ? quantityInCart : 0}
  		</Col>
  		<Col style={{padding:"0"}}>
	    <Button
	      {...extraProps}
	      style={{width:"100%"}}
	      onClick={onPlusClick}
	    >
	      +
	    </Button>
  		</Col>
  		</Row>
  	</Container>	
  );
};

export default Quantity;
