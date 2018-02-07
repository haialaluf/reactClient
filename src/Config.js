/**
 * Created by hai on 24/08/2017.
 */

const env = 'dev';


let Config = {
    serverUrl: env === 'prod' ? 'http://ec2-34-192-196-140.compute-1.amazonaws.com:6001/' : 'http://127.0.0.1:8080/',
    prefix: 'api/',
    storage: 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/',
    googleMapsApiKey: 'AIzaSyDJtSJcp9ex_r0hz4LzUDSQym77Fnt2bVg'
};

export default Config;
