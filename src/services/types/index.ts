import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator} from 'redux';
import {store} from '../store';
import {TAuthAction} from '../actions/auth';
import {TConstructorAction} from '../actions/constructor';
import {TGetIngredientsAction} from '../actions/ingredients';
import {ICloseModalAction} from '../actions/modal';
import {TAddOrderAction} from '../actions/order';
import {TWsPrivateAction} from '../actions/ws-private';
import {TWsAction} from '../actions/ws';

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export type TMessages = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}
export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

type TApplicationActions =
    TAuthAction
    | TConstructorAction
    | TGetIngredientsAction
    | ICloseModalAction
    | TAddOrderAction
    | TWsPrivateAction
    | TWsAction;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
