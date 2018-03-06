/**
 * Created by hai on 24/08/2017.
 */

const env = 'dev';


let Config = {
    serverUrl: env === 'prod' ? 'http://ec2-18-197-37-128.eu-central-1.compute.amazonaws.com:6001/' : 'http://127.0.0.1:8080/',
    prefix: 'api/',
    storage: 'https://s3.us-east-2.amazonaws.com/indieproject/',
    googleMapsApiKey: 'AIzaSyDJtSJcp9ex_r0hz4LzUDSQym77Fnt2bVg'
};

export default Config;
