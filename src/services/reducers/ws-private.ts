import {TWsPrivateAction} from '../actions/ws-private';
import {TMessages} from '../types';
import {
  WS_CONNECTION_PRIVATE_CLOSED,
  WS_CONNECTION_PRIVATE_ERROR,
  WS_CONNECTION_PRIVATE_SUCCESS,
  WS_GET_MESSAGE_PRIVATE,
} from '../constants/ws-private';

type TWSPrivateState = {
    wsConnected: boolean,
    error: null | boolean,
    messages: TMessages,
}
const initialState: TWSPrivateState = {
    wsConnected: false,
    error: false,
    messages: {
        orders: [],
        total: 0,
        totalToday: 0,
    },
};
export const wsReducerPrivate = (state = initialState, action: TWsPrivateAction) => {
    switch (action.type) {
        case WS_CONNECTION_PRIVATE_SUCCESS:
            return {...state, wsConnected: true};
        case WS_CONNECTION_PRIVATE_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_PRIVATE_CLOSED:
            return {...state, wsConnected: false};
        case WS_GET_MESSAGE_PRIVATE:
            return {...state, messages: action.payload};
        default:
            return state;
    }
};
