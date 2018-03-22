/**
 * Created by haialaluf on 14/02/2018.
 */
import S3Service from '../S3UploadService';
import {changeAppSettings} from './AppActions';
import Helpers from '../../helpers';
function generateNoteHash() {
    return 'Note' + String(Date.now())
}

function isArray(obj) {
    return Array.isArray(obj);
}

export function changeHomeView(note) {
    return (dispatch, getState) => {
        let formatedFiles = note.imageUrl && (isArray(note.imageUrl) ? note.imageUrl : [note.imageUrl]).filter(Helpers.isDataUrl);
        const updateHomeView = (note) => {
            note = Helpers.removeFunctionsFromObject(note)
            let updatedhomeView = getState().settings.homeView;
            updatedhomeView.components.forEach(component => {
                component.data = component.data.map(oldNote => oldNote._id === note._id ? note : oldNote);
            });
            changeAppSettings({homeView: updatedhomeView})(dispatch);
        }
        if (formatedFiles && formatedFiles.length) {
            formatedFiles = formatedFiles.map(Helpers.dataURLtoBlob);
            S3Service.upload( generateNoteHash() ,formatedFiles)
                .then((filesUrl) => {
                    if (isArray(note.imageUrl)) {
                        let urlArray = note.imageUrl.map(() => filesUrl.pop());
                        note.imageUrl = urlArray.join(', ');
                    } else {
                        note.imageUrl = filesUrl.pop()
                    }
                    updateHomeView(note)
                }).catch((error) => {
                console.error('Error during update Home View Component:', error);
            });
        } else {
            updateHomeView(note)
        }

    };
}

