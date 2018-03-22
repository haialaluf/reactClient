/**
 * Created by haialaluf on 14/02/2018.
 */
export function HomeViewReducer(state=[], action) {

    let fetchOrders = (param) => {
        state = param.data;
    };

    let setHomeView = (data) => {
        debugger
        state = data;
    };

    switch (action.type) {
        case 'GET_ORDERS':
            fetchOrders(action.params);
            break;
        case 'GET_HOME_VIEW':
            setHomeView(action.data);
            break;
        default:
    }
    return state;
}