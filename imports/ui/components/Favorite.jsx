// Framework
import React from "react";
import {Container,Row,Col,ButtonGroup,Button} from 'reactstrap';

const Favorite = ({ onClick, isFavorite }) => {
  return (
  	<Container>
      	<Row style={{textAlign:"center"}}>
  		<Col style={{padding:"0"}}>
	  	<Button
	      style={{width:"100%"}}
	      onClick={onClick}
	    >
	      { isFavorite ? "Favorite" : "Not Favorite"}
	    </Button>
  		</Col>
  		</Row>
  	</Container>	
  );
};

export default Favorite;
