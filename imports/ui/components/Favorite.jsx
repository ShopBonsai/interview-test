// Framework
import React from "react";
import Button from './Button'

const Favorite = ({ onClick, isFavorite }) => {
  return (
  	<div style={{display:"flex"}}>
  		<div style={{padding:"0",flex:1,textAlign:"center"}}>
	  	<Button
        block
	      style={{width:"100%"}}
	      onClick={onClick}
	    >
	      { isFavorite ? "Favorite" : "Not Favorite"}
	    </Button>
  		</div>
  	</div>	
  );
};

export default Favorite;
