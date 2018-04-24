import React from "react";
import {Table,Container} from "reactstrap";

export default class OrderDetails extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render(){
    const {products,totalCost} = this.props
    return (
        <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map( p => {
             return (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td style={{width:"40px"}}>{p.quantity}</td>
                  <td style={{width:"40px"}}>{p.price*p.quantity}</td>
                </tr>
             )})}
            <tr>
                <td ></td>
                <td style={{width:"40px"}}>Total</td>
                <td style={{width:"40px"}}>{totalCost}</td>
                </tr>
          </tbody>
      </Table>
      </Container>
    )}
}