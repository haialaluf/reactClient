/**
 * Created by hai on 20/07/2017.
 */
export function itemsReducer(state=[], action) {

    let addItems = (res, item) => {
        item._id = res.data.id;
        state.push(item);
        state =  state.slice(0);
    };

    let fetchItems = (param) => {
        state = param.data;
    };

    let deleteItem = (itemId) => {
        state = state.filter((item) => item._id !== itemId);
    };

    switch (action.type) {
        case 'GET_ITEMS':
            fetchItems(action.params);
            break;
        case 'ADD_ITEM':
            addItems(action.res, action.item);
            break;
        case 'DELETE_ITEM':
            deleteItem(action.itemId);
            break;
        default:
    }
    return state;
}