/**
 * Created by hai on 25/06/2017.
 */
import axios from 'axios';
const prefix = 'http://127.0.0.1:1818/api/';
let connect = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});

export function addItem(item) {
    return (dispatch) => {
        let addItem = (item) => connect.post(`${ prefix }addItem`, item)
            .then((res) => {
                dispatch({
                    type: 'ADD_ITEM',
                    res: res,
                    item: item
                });
            }).catch((error) => {
                console.error('Error during service worker registration:', error);
            });
        if (item.image) {
            connect.post(`${ prefix }uploadImage`, { image: item.image })
                .then(function (res) {
                    addItem({ name: item.name, description: item.description, imageUrl: res.data.imageUrl })
                }).catch((error) => {
                    console.error('Error during service worker registration:', error);
                });
        } else {
            addItem(item)
        }

    };
}

export function uploadImage(img) {
    return (dispatch) => {
        connect.post(`${ prefix }uploadImage`, { image: img })
            .then((res) => {
                // dispatch({
                //     type: 'ADD_ITEM',
                //     res: res,
                // });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function deleteItem(itemId) {
    return (dispatch) => {
        connect.delete(`${ prefix }deleteItem`, {
            params: {
                id: itemId
            }
        }).then((res) => {
                dispatch({
                    type: 'DELETE_ITEM',
                    res: res,
                    itemId: itemId
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function getItems(params) {
    return (dispatch) => {
        connect.get(`${ prefix }getItems`)
            .then((res) => {
                dispatch({
                    type: 'GET_ITEMS',
                    params: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}
