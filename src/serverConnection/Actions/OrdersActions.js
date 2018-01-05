/**
 * Created by hai on 25/06/2017.
 */
import axios from 'axios';
import config from '../../Config';

const prefix = config.serverUrl + config.prefix;
let connect = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});

export function makeOrder(order, callback) {
    return (dispatch) => {
        connect.post(`${ prefix }order`, order)
            .then(callback).catch((error) => {
                console.error('Error during making an order:', error);
            });
    };
}

export function deleteOrder(orderId) {
    return (dispatch) => {
        connect.delete(`${ prefix }order`, {
            params: {
                id: orderId
            }
        }).then((res) => {
            dispatch({
                type: 'DELETE_ORDER',
                res: res,
                orderId: orderId
            });
        }).catch((error) => {
            console.error('Error during deleting an order:', error);
        })
    };
}


export function getOrders(params) {
    return (dispatch) => {
        let queryPrams = params ? Object.keys(params).map(key=>key+'='+params[key]) : '';
        connect.get(`${ prefix }order/?${queryPrams}`)
            .then((res) => {
                dispatch({
                    type: 'GET_ORDERS',
                    params: res
                });
            }).catch((error) => {
            console.error('Error during get orders:', error);
        })
    };
}
