import {combineReducers} from "redux";
import {ingredients} from "./ingredients";
import {order} from "./order";
import {resetPassword} from "./reset-password";
import {user} from "./user";

export const rootReducer = combineReducers({
	ingredients,
	order,
	resetPassword,
	user
})