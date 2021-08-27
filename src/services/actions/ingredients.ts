import {checkResponse, url} from '../api';
import {AppThunk, TIngredient} from '../types';
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS,} from '../constants/ingredients';

export {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
};

interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: Array<TIngredient>;
}

interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR
}

export type TGetIngredientsAction =
    IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction;

export const getIngredients: AppThunk = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    });
    return fetch(`${url}ingredients`)
        .then((response) => checkResponse(response))
        .then((response) =>
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: response.data,
            })
        )
        .catch(() => {
            dispatch({
                type: GET_INGREDIENTS_ERROR,
            });
        });
};
