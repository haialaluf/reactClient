/**
 * Created by hai on 25/06/2017.
 */
import axios from 'axios';
import config from '../../Config';
import S3Service from '../S3UploadService';

const prefix = config.serverUrl + config.prefix;
let connect = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});

function generateWizardHash() {
    return 'Wizard' + String(Date.now())
}

export function createWizard(wizard, cd, progress) {
    return (dispatch) => {
        let files = [].concat.apply([], wizard.items.map((item) => item.fileList || []));
        let createWizard = (wizard) => connect.post(`${ prefix }createWizard`, wizard)
            .then((res) => {
                cd(res.data);
                dispatch({
                    type: 'CREATE_WIZARD',
                    wizard: res.data
                });
            }).catch((error) => {
                console.error('Error during service worker registration:', error);
            });
        if (files && files.length) {
            S3Service.upload( generateWizardHash() ,files, progress)
                .then((filesUrl) => {
                    wizard.items = wizard.items.map(item => {
                        item.fileList = item.fileList.map(() => filesUrl.pop());
                        return item;
                    });
                    createWizard(wizard)
                }).catch((error) => {
                    console.error('Error during create Wizard:', error);
                });
        } else {
            createWizard(wizard)
        }

    };
}

export function deleteWizard(wizardId) {
    return (dispatch) => {
        connect.delete(`${ prefix }deleteWizard`, {
            params: {
                id: wizardId
            }
        }).then((res) => {
                dispatch({
                    type: 'DELETE_WIZARD',
                    res: res,
                    wizardId: wizardId
                });
            }).catch((error) => {
            console.error('Error during delete Wizard: ', error);
        })
    };
}

export function getWizardById(wizardId) {
    return (dispatch) => {
        connect.get(`${ prefix }getWizardById/?id=${wizardId}`)
            .then((res) => {
                dispatch({
                    type: 'GET_WIZARD_BY_ID',
                    wizard: res.data
                });
            }).catch((error) => {
            console.error('Error during get Wizard:', error);
        })
    };
}

export function getAllWizards(params) {
    return (dispatch) => {
        connect.get(`${ prefix }getWizards/`)
            .then((res) => {
                dispatch({
                    type: 'GET_ALL_WIZARDS',
                    wizards: res.data
                });
            }).catch((error) => {
            console.error('Error during get Wizard:', error);
        })
    };
}
