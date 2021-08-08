import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { order } from "./order";

export const rootReducer = combineReducers({
  ingredients,
  order
})