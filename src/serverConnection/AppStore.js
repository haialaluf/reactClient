/**
 * Created by hai on 25/06/2017.
 */
// import { EventEmitter } from 'events';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appReducer } from './AppReducer';
import { itemsReducer } from '../pages/Items/ItemsReducer';
import { ordersReducer } from '../pages/Orders/OrdersReducer';
import { userReducer } from '../pages/Login/UserReducer';
import ReduxThunk from 'redux-thunk'

const middleware = applyMiddleware(ReduxThunk);

const reducers = combineReducers({
    app: appReducer,
    items: itemsReducer,
    orders: ordersReducer,
    user: userReducer
});

const store = createStore(reducers, {}, middleware);

store.subscribe(() => {
    // store has been changed callback
});

export default store;
