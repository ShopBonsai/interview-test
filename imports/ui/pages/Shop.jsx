// Framework
import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import {Session} from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import {Row, Col} from "reactstrap";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import Product from "../containers/Product";
import ModalImpl from "../components/Modal.jsx";
import { Container } from "reactstrap";

const PAGINATION_ELEMENTS = 4;

class Shop extends Component {

    /*
     *****
     ***** Static navigation functions to move across different merchant products (set to load 4 merchant's products at a time).
     *****
     */
    static NavigationButtons = ({setPaginationIndex, currentIndex, limit}) => {
        let previousButton = null;
        let nextButton  = null;
        if(currentIndex > 0) {
            previousButton = (
                <Col>
                    <Button
                        className="shop-previous-button"
                        onClick={() => {
                            setPaginationIndex('prev', currentIndex);
                        }}
                    >
                        {'<< Prev'}
                    </Button>
                </Col>
            );
        }

        if(currentIndex < limit) {
            nextButton = (
                <Col>
                    <Button
                        className="shop-next-button"
                        onClick={() => {
                            setPaginationIndex('next', currentIndex);
                        }}
                    >
                        {'Next >>'}
                    </Button>
                </Col>
            );
        }
        return (
            <Row>
                {previousButton}
                {nextButton}
            </Row>
        )
    };

    /*
     *****
     ***** Static component for the floating Cart button.
     *****
     */
    static CartButton = ({history}) => {
        return (
            <div className="shop-cart">
                    <Button
                        className="shop-cart-button"
                        onClick={() => {
                            history.push("/cart");
                        }}
                    >
                        <img alt="Cart" src={`/icon/components/button/button-cart.svg`}/>
                    </Button>
            </div>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            paginationIndex: 0,
            limit: 100,
            merchants: [],
            dataLoadFlag: false,
            serviceError: null,
            modalMessage: null
        };
    }

    /*
     *****
     ***** Handles session redirect before mounting.
     ***** Loads the first batch of data to display
     */
    componentWillMount() {
        if (!Session.get('user')) {
            this.props.history.push("/");
        }
        Meteor.call("merchants.getMerchantsWithPagination", 0, PAGINATION_ELEMENTS, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not fetch merchants"}));
            } else {
                this.setState(() => ({
                    merchants: response,
                    dataLoadFlag: true
                }));
            }
        });
    }


    /*
     *****
     ***** Sets the pagination index to load the next/previous batch of merchant products.
     *****
     */
    setPaginationIndex = (action, paginationIndex) => {
        if (action === "next") {
            this.setState(() => ({
                paginationIndex: paginationIndex + PAGINATION_ELEMENTS,
                dataLoadFlag: false
            }));
        } else  if (action === "prev") {
            this.setState(() => ({
                paginationIndex: paginationIndex - PAGINATION_ELEMENTS,
                dataLoadFlag: false
            }));
        }
        let nextPaginationIndex = paginationIndex + PAGINATION_ELEMENTS;
        Meteor.call("merchants.getMerchantsWithPagination", nextPaginationIndex, PAGINATION_ELEMENTS, (error, response) => {
            if (error) {
                this.setState(() => ({ serviceError: "Could not fetch merchants"}));
            } else {
                this.setState(() => ({
                    merchants: response,
                    dataLoadFlag: true
                }));
            }
        });
    };

    goBack = () => this.props.history.push("/");

    goUserPage = () => this.props.history.push("/user");

    cleanMessages = () => {
        this.setState(() =>
            ({
                serviceError: null,
                modalMessage: null
            })
        );
    };

    render() {
        const {merchants,  serviceError, modalMessage, dataLoadFlag, limit, paginationIndex} = this.state;
        let {NavigationButtons, CartButton} = Shop;
        let shopPageContent = null;
        let modal = null;

        if (serviceError !== null || modalMessage !== null) {
            let content = modalMessage;
            let modalClassName = "modal-success";
            if (this.state.serviceError) {
                content = serviceError;
                modalClassName ="modal-error";
            }
            modal = (
                <ModalImpl
                    className={modalClassName}
                    title={"Cart"}
                    children={content}
                    onClose={() => this.cleanMessages()}
                />
            );
        }

        if (!dataLoadFlag) {
            shopPageContent = (
                    <div className="shop-spinner-container">
                        <h1>{"Loading "}</h1>
                        <MDSpinner className="shop-spinner"/>
                    </div>
                );
        } else {
            const getProductsFromMerchant = ({products, brands, guid}) =>
                products.map(({belongsToBrand, ...product}) => ({
                    ...product,
                    brand: brands[belongsToBrand],
                    merchantId: guid
                }));

            const products = merchants.reduce(
                (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
                []
            );

            shopPageContent = (
                    <Container className="shop-page">
                        {products.map(({id, ...product}) =>
                            <Product id={id} {...product} key={id}/>
                        )}
                        <NavigationButtons setPaginationIndex={this.setPaginationIndex} currentIndex={paginationIndex} limit={limit} />
                        <CartButton history={this.props.history} />
                    </Container>
            );
        }

        return (
            <Page pageTitle="shop" history goBack={this.goBack} goUserPage={this.goUserPage}>
                {modal}
                {shopPageContent}
            </Page>
        );
    }
}

export default Shop;
