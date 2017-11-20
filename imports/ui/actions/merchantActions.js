import { Meteor } from "meteor/meteor";
import { GET_MERCHANTS } from './types'
import { fillProducts } from './productActions'

const { REQUEST, SUCCESS, ERROR } = GET_MERCHANTS

const request_get_merchants = () => {
    return {
        type: REQUEST
    }
}

const receive_get_merchants_success = (merchants) => {
    return (dispatch) => {
        dispatch({
            type: SUCCESS,
            merchants
        })

        const getProductsFromMerchant = ({ products, brands }) =>
            products.map(({ belongsToBrand, ...product }) => ({
                ...product,
                brand: brands[belongsToBrand]
            }));

        const products = merchants.reduce(
            (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
            []
        );

        return dispatch(fillProducts(products))
    }
}

const receive_get_merchants_error = (error) => {
    return {
        type: ERROR,
        error
    }
}

export const getMerchants = () => {
    return (dispatch) => {
        dispatch(request_get_merchants());
        return Meteor.call("merchants.getMerchants", (error, response) => {
            if (error) {
                dispatch(receive_get_merchants_error(error));
            } else {
                dispatch(receive_get_merchants_success(response));
            }
        });
    }
}