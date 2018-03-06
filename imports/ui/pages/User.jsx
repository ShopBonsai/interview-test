// Framework
import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import {Session} from 'meteor/session';
import {authHandler} from '../../api/authentication/auth-handler';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import {Row} from "reactstrap";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import ModalImpl from "../components/Modal.jsx";
import Details from "../components/Details.jsx";
import { Container } from "reactstrap";

// Components
class User extends Component {

    /*
    **** Static component with the user details
     */
    static UserInfoSection({ userData, handleLogOutButton}) {

        if (!userData) return null;

        const info = [
            {label: "User name", value: userData.userName},
            {label: "First name", value: userData.details.firstName},
            {label: "Last name", value: userData.details.lastName},
            {label: "Address", value: userData.details.address}
        ];

        return (
            <div className="user-details">
                <h3>User details</h3>
                <Details info={info}/>
                <Button
                    className="button-logout"
                onClick={handleLogOutButton}
                >
                    X Log-out
                </Button>
            </div>
        );
    }

    /*
     **** Static component with the user order history
     */
    static UserOrdersSection({ userOrders }) {
        let orderEntries = [];

        userOrders.forEach( (userOrder, key) => {
            let orderItems = [];

            userOrder.items.forEach( (item, itemKey) => {
                const info = [
                    {label: "Name", value: item.productName},
                    {label: "Quantity", value: item.quantity},
                    {label: "Amount to pay", value: item.price}
                ];
                orderItems.push(<Details info={info} key={itemKey + item.productId}/>)
            });

            orderEntries.push(
                (
                    <div className="info"  key={key}>
                        <div className="info-row">
                            <div className="label">
                                Order date:
                            </div>
                            <div className="value">
                                {new Date(userOrder.date).toLocaleDateString("en-US")}
                            </div>
                            <div className="item-details">
                                {orderItems}
                            </div>
                        </div>
                    </div>
                )
            );
        });

        if (orderEntries.length === 0){
            orderEntries.push(
                <div className="info" >
                    <h4>No orders available to display</h4>
                </div>
            )
        }

        return (
            <div  className="user-orders">
                <h3>Order history</h3>
                {orderEntries}
            </div>
        );
    }


    constructor() {
        super();
        this.state = {
            userOrders: [],
            userData: {},
            itemLoadFlag: false,
            serviceError: null
        };
    }
    /*
     **** The user account and order data will be fetch from the API and will be set to state
     */
    componentDidMount() {
        const userName = Session.get('user');
        if (!userName) {
            this.props.history.push("/");
        }
         Meteor.call("users.getUserByUserName", userName, (error, response) => {
             if (error) {
                this.setState(() => ({ serviceError: "Could not fetch user data" }));
             } else {
                this.setState(() => ({ userData: response }));
                 Meteor.call("orders.getOrdersByUserName", userName, (error, response) => {
                     if (error) {
                         this.setState(() => ({ serviceError: "Could not fetch orders" }));
                     } else {
                         this.setState(() => ({
                             userOrders: response,
                             itemLoadFlag: true
                         }));
                     }
                 });

             }
         });

    };

    /*
    *****
    ***** Static component with the user details
    *****
     */
    componentDidUpdate() {
        const {userOrders, dataLoadFlag} = this.state;
        if (userOrders && !dataLoadFlag) {
            this.setState(() => ({dataLoadFlag: true}));
        }
    }

    /*
     *****
     ***** uses auth-handler to remove session variables and redirect to Home
     *****
     */
    handleLogOutButton = () => {
        const auth = new authHandler();
        auth.logout();
        this.props.history.push("/")
    };

    /*
     *****
     ***** Resets the modal messages so they won't fire the modal again
     *****
     */
    cleanMessages = () => {
        this.setState(() =>
            ({
                serviceError: null
            })
        );
    };

    /*
     *****
     ***** Nav functions
     *****
     */
    goBack = () => this.props.history.push("/shop");
    goUserPage = () => this.props.history.push("/user");

    render() {
        const { UserOrdersSection, UserInfoSection } = User;
        let { userOrders, serviceError, userData, itemLoadFlag } = this.state;
        let userPageContent;
        let modal = null;

        if (serviceError !== null) {
            let content = serviceError;
            let modalClassName ="modal-error";
            modal = (
                <ModalImpl
                    className={modalClassName}
                    title={"User"}
                    children={content}
                    onClose={() => this.cleanMessages()}
                />
            );
        }

        if(!itemLoadFlag) {
            userPageContent = (
                <Row className="user-page">
                    <div className="user-message-container">
                        <h1>{"Loading "}</h1>
                        <MDSpinner className="user-spinner"/>
                    </div>
                </Row>
            );
        } else {
            userPageContent = (
                <Container className="user-page">
                    <div className="user-info">
                        <Row>
                            <UserInfoSection userData={userData} handleLogOutButton={this.handleLogOutButton} />
                            <UserOrdersSection userOrders={userOrders} />
                        </Row>
                    </div>
                </Container>
            );
        }
        return (
            <Page pageTitle="User panel" history goBack={this.goBack} goUserPage={this.goUserPage}>
                {modal}
                {userPageContent}
            </Page>
        );
    }
}

export default User;