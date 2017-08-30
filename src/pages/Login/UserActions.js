/**
 * Created by hai on 25/06/2017.
 */
import axios from 'axios';
import config from '../../Config';

const prefix = config.serverUrl + 'auth/';
let connect = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});

export function emailLogin(userData) {
    return (dispatch) => {
        connect.post(`${ prefix }login`, userData)
            .then((res) => {
                dispatch({
                    type: 'LOGIN',
                    res: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function facebookLogin(userData) {
    return (dispatch) => {
        connect.get(`${ prefix }facebook?access_token=${ userData.accessToken }`)
            .then((res) => {
                dispatch({
                    type: 'LOGIN',
                    res: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function googleLogin(userData) {
    return (dispatch) => {
        connect.get(`${ prefix }google?access_token=${ userData.accessToken }`)
            .then((res) => {
                dispatch({
                    type: 'LOGIN',
                    res: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function emailRegister(userData) {
    return (dispatch) => {
        connect.post(`${ prefix }register`, userData).then((res) => {
                dispatch({
                    type: 'LOGIN',
                    res: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function logout(userData) {
    return (dispatch) => {
        connect.post(`${ prefix }logout`, userData).then((res) => {
                dispatch({
                    type: 'LOGOUT',
                    res: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}

export function whoAmI(userData) {
    return (dispatch) => {
        connect.get(`${ prefix }whoAmI`, userData).then((res) => {
                dispatch({
                    type: 'LOGIN',
                    res: res,
                });
            }).catch((error) => {
            console.error('Error during service worker registration:', error);
        })
    };
}
