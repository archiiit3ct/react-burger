import {checkResponse, url} from '../api';
import {getCookie} from '../utils';
import {AppThunk} from '../types';
import {ADD_ORDER_ERROR, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS,} from '../constants/order';

export {ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_ERROR};

interface IAddOrderRequestAction {
    readonly type: typeof ADD_ORDER_REQUEST
}

interface IAddOrderSuccessAction {
    readonly type: typeof ADD_ORDER_SUCCESS;
    readonly order: number;
}

interface IAddOrderErrorAction {
    readonly type: typeof ADD_ORDER_ERROR
}

export type TAddOrderAction = IAddOrderRequestAction | IAddOrderSuccessAction | IAddOrderErrorAction;
export const handleAddOrder: AppThunk = (listId: string[]) => (dispatch) => {
    dispatch({
        type: ADD_ORDER_REQUEST,
    });
    return fetch(`${url}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify({
            ingredients: listId,
        }),
    })
        .then((response) => checkResponse(response))
        .then((result) =>
            dispatch({
                type: ADD_ORDER_SUCCESS,
                order: result.order.number,
            })
        )
        .catch(() => {
            dispatch({
                type: ADD_ORDER_ERROR,
            });
        });
};
