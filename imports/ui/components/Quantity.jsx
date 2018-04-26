// Framework
import React from "react";
import Button from './Button';

const Quantity = ({ children, onPlusClick, onMinusClick, quantityInCart, className = "",  ...extraProps }) => {
  return (
  	<div style={{display:"flex",justifyContent:"space-between"}}>
  		<div style={{flex:1}}>
	  	<Button
	      {...extraProps}
	      block
	      onClick={onMinusClick}
	    >
	      -
	    </Button>
  		</div>
  		<div style={{flex:1,textAlign:"center"}}>
	    {quantityInCart ? quantityInCart : 0}
  		</div>
  		<div style={{flex:1}}>
	    <Button
	      {...extraProps}
	      block
	      onClick={onPlusClick}
	    >
	      +
	    </Button>
  		</div>
  	</div>	
  );
};

export default Quantity;
