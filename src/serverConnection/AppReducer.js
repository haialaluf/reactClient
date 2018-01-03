/**
 * Created by hai on 20/07/2017.
 */
export function appReducer(state=[], action) {

    let fetchData = (param) => {
        state = param.data;
    };
    
    switch (action.type) {
        case 'GET_DATA':
            fetchData(action.params);
            break;
        default:
    }
    return state;
}