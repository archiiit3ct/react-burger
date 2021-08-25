import {
	WS_CONNECTION_PRIVATE_CLOSED,
	WS_CONNECTION_PRIVATE_ERROR,
	WS_CONNECTION_PRIVATE_SUCCESS,
	WS_GET_MESSAGE_PRIVATE,
} from '../actions/ws-private';

const initialState = {wsConnected: false, error: null, messages: []};

export const wsReducerPrivate = (state = initialState, action) => {
	switch (action.type) {
		case WS_CONNECTION_PRIVATE_SUCCESS:
			return {...state, wsConnected: true};
		case WS_CONNECTION_PRIVATE_ERROR:
			return {...state, error: action.payload, wsConnected: false};
		case WS_CONNECTION_PRIVATE_CLOSED:
			return {...state, wsConnected: false};
		case WS_GET_MESSAGE_PRIVATE:
			return {...state, messages: action.payload};
		default:
			return state;
	}
};
