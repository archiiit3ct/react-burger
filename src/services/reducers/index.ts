import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {constructorReducer} from './constructor';
import {orderReducer} from './order';
import {authReducer} from './auth';
import {wsReducer} from './ws';
import {wsReducerPrivate} from './ws-private';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    constructor: constructorReducer,
    auth: authReducer,
    ws: wsReducer,
    wsPrivate: wsReducerPrivate,
});
