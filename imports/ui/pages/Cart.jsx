// Framework
import React, { PureComponent } from "react";

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      error: null
    };
  }

  componentWillMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
        console.log(error);
      } else {
        this.setState(() => ({ order: response }));
        console.log(this.state.order[0].name);
      }
    });
  }

  goBack = () => this.props.history.push("/shop");
  goCart = () => this.props.history.push("/cart");

  render() {
    let { order } = this.state;
    return (
      <Page pageTitle="Cart" history goBack={this.goBack} goCart={this.goCart}>
        <div className="home-page">
          <div>
          {/* {order[0].name} */}
          {/* {order.map((item, i) => <div key={i}> {item.name}  
                      {item.price} {item.quantity}</div>)} */}
                      {/* {this.state.order[0]} */}
            </div>
          <Button
            onClick={() => {
              this.props.history.push("/shop");
            }}
          >
            Go shopping
          </Button>
        </div>
      </Page>
    );
  }
}

export default Home;
