import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,} from '../constants/ws';
import {TWsAction} from '../actions/ws';
import {TMessages} from '../types';

type TWSState = {
    wsConnected: boolean,
    error: null | boolean,
    messages: TMessages,
}
const initialState: TWSState = {
    wsConnected: false,
    error: false,
    messages: {
        orders: [],
        total: 0,
        totalToday: 0,
    },
};
export const wsReducer = (state = initialState, action: TWsAction) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
};
