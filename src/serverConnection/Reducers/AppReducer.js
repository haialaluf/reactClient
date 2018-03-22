/**
 * Created by hai on 20/07/2017.
 */
export function appReducer(state={}, action) {

    let fetchData = (param) => {
        let settings = param.data.settings;
        settings.storage = param.data.storage;
        state = settings;
    };
    
    switch (action.type) {
        case 'GET_DATA':
            fetchData(action.params);
            break;
        default:
    }
    return state;
}