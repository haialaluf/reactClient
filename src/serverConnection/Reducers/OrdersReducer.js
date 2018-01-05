/**
 * Created by hai on 20/07/2017.
 */
export function ordersReducer(state=[], action) {

    let fetchOrders = (param) => {
        state = param.data;
    };

    let deleteOrder = (orderId) => {
        state = state.filter((order) => order._id !== orderId);
    };

    switch (action.type) {
        case 'GET_ORDERS':
            fetchOrders(action.params);
            break;
        case 'DELETE_ORDER':
            deleteOrder(action.orderId);
            break;
        default:
    }
    return state;
}