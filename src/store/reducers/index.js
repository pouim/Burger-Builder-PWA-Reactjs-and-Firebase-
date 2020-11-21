import { combineReducers } from 'redux';
import orderReducer from './order';
import burgerReducer from './burgerBuilder';
import authReducer from './auth';

const rootReducer = combineReducers({
    orderReducer: orderReducer,
    burgerReducer: burgerReducer,
    authReducer: authReducer
});

export default rootReducer;

