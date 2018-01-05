/**
 * Created by hai on 25/06/2017.
 */
// import { EventEmitter } from 'events';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appReducer } from './Reducers/AppReducer';
import { itemsReducer } from './Reducers/ItemsReducer';
import { ordersReducer } from './Reducers/OrdersReducer';
import { userReducer } from './Reducers/UserReducer';
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
