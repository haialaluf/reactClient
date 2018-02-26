/**
 * Created by hai on 25/06/2017.
 */
// import { EventEmitter } from 'events';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appReducer } from './Reducers/AppReducer';
import { itemsReducer } from './../pagesNotInUse/Items/ItemsReducer';
import { ordersReducer } from './Reducers/OrdersReducer';
import { wizardReducer } from './Reducers/WizardReducer';
import { userReducer } from './Reducers/UserReducer';
import { HomeViewReducer } from './Reducers/HomeViewReducer';
import ReduxThunk from 'redux-thunk'

const middleware = applyMiddleware(ReduxThunk);

const reducers = combineReducers({
    settings: appReducer,
    items: itemsReducer,
    orders: ordersReducer,
    wizard: wizardReducer,
    user: userReducer,
    HomeView: HomeViewReducer
});

const store = createStore(reducers, {}, middleware);

store.subscribe(() => {
    // store has been changed callback
});

export default store;
