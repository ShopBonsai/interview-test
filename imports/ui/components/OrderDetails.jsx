import React from "react";

export default class OrderDetails extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render(){
    const {products,totalCost} = this.props
    return (
        <div style={{width:"100%"}} className="order-details">
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map( (p,i) => {
             return (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td style={{width:"60px"}}>{p.quantity}</td>
                  <td style={{width:"60px"}}>{p.price*p.quantity}</td>
                </tr>
             )})}
            <tr>
                <td ></td>
                <td style={{width:"60px"}}>Total</td>
                <td style={{width:"60px"}}>{totalCost}</td>
                </tr>
          </tbody>
      </table>
      </div>
    )}
}