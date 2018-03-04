// Framework
import React, { PureComponent } from "react";
import { Carousel } from "react-bootstrap";
// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      merchants: []
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getLatestMerchants", (error, response) => {
      if (error) {
        console.error(error);
      } else {
        this.setState(() => ({ merchants: response }));
      }
    });
  }

  render() {
    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = this.state.merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );
    const merchants = {};
    return (
      <Page>
        <div className="home-page">
          <h2 className="title">Welcome to our humble Shop</h2>
          <Carousel>
            {products.map(product =>
              <Carousel.Item key={product.id}>
                <img
                  width={400}
                  height={400}
                  alt="400x400"
                  src={product.image}
                />
                <Carousel.Caption
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/shop",
                      state: { key: product.name }
                    })}
                >
                  <h3>
                    {product.name}
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>;
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
