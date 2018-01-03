/**
 * Created by hai on 25/06/2017.
 */
import axios from 'axios';
import config from '../Config';

const prefix = config.serverUrl + config.prefix;
let connect = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});


export function getItems(params) {
    return (dispatch) => {
        connect.get(`${ prefix }getData`)
            .then((res) => {
                dispatch({
                    type: 'GET_DATA',
                    params: res
                });
            }).catch((error) => {
            console.error('Error getting app data:', error);
        })
    };
}
