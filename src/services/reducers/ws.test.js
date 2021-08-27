import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,} from '../actions/ws';
import {initialState, wsReducer} from './ws';

describe('ws reducer', () => {
	it('should handle WS_CONNECTION_SUCCESS', () => {
		expect(wsReducer(initialState, {type: WS_CONNECTION_SUCCESS})).toEqual(
			expect.objectContaining({
				...initialState,
				wsConnected: true,
			})
		);
	});
	it('should handle WS_CONNECTION_ERROR', () => {
		expect(
			wsReducer(initialState, {
				type: WS_CONNECTION_ERROR,
				payload: 'ERROR',
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				error: 'ERROR',
				wsConnected: false,
			})
		);
	});
	it('should handle WS_CONNECTION_CLOSED', () => {
		expect(wsReducer(initialState, {type: WS_CONNECTION_CLOSED})).toEqual(
			expect.objectContaining({
				...initialState,
				wsConnected: false,
			})
		);
	});
	it('should handle WS_GET_MESSAGE', () => {
		expect(
			wsReducer(initialState, {
				type: WS_GET_MESSAGE,
				payload: [1, 2, 3],
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				messages: [1, 2, 3],
			})
		);
	});
	it('return initial state', () => {
		expect(wsReducer(initialState, {})).toEqual({
			wsConnected: false,
			messages: [],
		});
	});
});
