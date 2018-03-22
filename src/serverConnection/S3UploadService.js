/**
 * Created by haialaluf on 18/01/2018.
 */
import AWS from 'aws-sdk';
import store from './AppStore'

let isInit = false;
let s3 = null;
let storageUrl = '';
let percentage = {
    current: 0
};

function init() {
    console.log('Init S3');
    const storage = store.getState().settings.storage;
    if (!storage) return;
    storageUrl = `https://s3.${ storage.region }.amazonaws.com/${ storage.bucketName }/`;
    AWS.config.update({
        region: storage.region,
        accessKeyId: storage.accessKeyId,
        secretAccessKey: window.prompt('Please enter your secret access key')
    });
    s3 = new AWS.S3({
        apiVersion: storage.apiVersions,
        params: {Bucket: storage.bucketName}
    });
}

function getFileType(file) {
    return file.name ? file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) 
                        : 
                       file.type.substring(file.type.lastIndexOf('/') + 1, file.type.length);
}

function uploadFile(file, fileName, progress) {
    return new Promise((resolve, reject) => {
        s3.putObject({
            Key: fileName,
            Body: file
        }, (err, res) => {
            if (err) {
                reject({msg: "Error uploading data: ", error: err});
            } else {
                percentage.add();
                progress && progress(percentage.current);
                resolve(storageUrl + fileName);
            }
        });
    })
}

function upload (key, fileList, progress) {
    init();
    return new Promise((resolve, reject) => {
        if (!s3) reject({msg: 'Please log in first!'});
        percentage.add = () => {
            percentage.current += Math.floor(100/files.length)
        };
        let files = fileList.map((file, index) => {
            let type = getFileType(file);
            return uploadFile(file, key  + index + '.' + type, progress);
        });
        Promise.all(files).then(files).then(resolve)
    })
}

function fetch (key) {
    if (!isInit) init();
    return new Promise((resolve, reject) => {
        s3.listObjects({}, (err, res) => {
            debugger
        })
    })
}

export default {
    upload: upload,
    fetch: fetch
}

