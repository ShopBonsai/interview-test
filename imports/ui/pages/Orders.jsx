// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";

// Components
import Page from "../components/Page.jsx";

// State Selector
import { stateSelector as ordersState } from "../reducer/orders"

// Action
import { getOrders } from "../actions/orderActions"

class Orders extends Component {
    componentWillMount() {
        this.props.getOrders();
    }
    goBack = () => this.props.history.push("/");

    render() {
        const { orders, loading } = this.props;
        return (
            <Page pageTitle="orders" history goBack={this.goBack}>
                    <div className="orders-page">
                        <div className="heading">
                            <div className="id">ORDER ID</div>
                            <div className="status">STATUS</div>
                        </div>
                        <br />
                        {orders.data.map(({ ...order }) =>
                            <div className="order" key={order._id}>
                                <hr />
                                <div className="pane">
                                    <div className="id">{order._id}</div>
                                    <div className="status">{order.status}</div>
                                </div>
                                <div className="details">
                                    {"items"}
                                    {order.products.map(({ ...product }) =>
                                        <div className="item" key={product.id}>
                                            <div className="name">{product.name}</div>
                                            <div className="price">{product.qty + " x $" + product.price}</div>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="total">
                                        <div>Total</div>
                                        <div>{"$" + Math.round(100 * order.total) / 100}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: ordersState(state)
    }
}

export default connect(mapStateToProps, { getOrders })(Orders)