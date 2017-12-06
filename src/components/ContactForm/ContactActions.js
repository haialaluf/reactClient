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

export function sendMessage(name, email, subject, message) {
    return connect.post(`${ prefix }contactMessage`, {
        name: name,
        email: email,
        subject: subject,
        message: message
    })
}
