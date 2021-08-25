import {combineReducers} from "redux";
import {ingredients} from "./ingredients";
import {order} from "./order";
import {user} from "./user";
import {wsReducer} from './ws';
import {wsReducerPrivate} from './ws-private';

export const rootReducer = combineReducers({
	ingredients,
	order,
	user,
	ws: wsReducer,
	wsPrivate: wsReducerPrivate
})