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


export function getAppSettings(cb) {
    return (dispatch) => {
        connect.get(`${ prefix }settings`)
            .then((res) => {
                dispatch({
                    type: 'GET_DATA',
                    params: res
                });
                cb && cb();
            }).catch((error) => {
            console.error('Error getting app data:', error);
        })
    };
}

export function changeAppSettings(settings) {
    return (dispatch) => {
        connect.put(`${ prefix }settings`, settings)
            .then((res) => {
                dispatch({
                    type: 'SAVE_DATA',
                    params: res
                });
            }).catch((error) => {
            console.error('Error getting app data:', error);
        })
    };
}
