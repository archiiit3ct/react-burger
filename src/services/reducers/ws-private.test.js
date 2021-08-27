import {
	WS_CONNECTION_PRIVATE_CLOSED,
	WS_CONNECTION_PRIVATE_ERROR,
	WS_CONNECTION_PRIVATE_SUCCESS,
	WS_GET_MESSAGE_PRIVATE,
} from '../actions/ws-private';
import {initialState, wsReducerPrivate} from './ws-private';

describe('ws reducer', () => {
	it('should handle WS_CONNECTION_PRIVATE_SUCCESS', () => {
		expect(
			wsReducerPrivate(initialState, {type: WS_CONNECTION_PRIVATE_SUCCESS})
		).toEqual(
			expect.objectContaining({
				...initialState,
				wsConnected: true,
			})
		);
	});
	it('should handle WS_CONNECTION_PRIVATE_ERROR', () => {
		expect(
			wsReducerPrivate(initialState, {
				type: WS_CONNECTION_PRIVATE_ERROR,
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
	it('should handle WS_CONNECTION_PRIVATE_CLOSED', () => {
		expect(
			wsReducerPrivate(initialState, {type: WS_CONNECTION_PRIVATE_CLOSED})
		).toEqual(
			expect.objectContaining({
				...initialState,
				wsConnected: false,
			})
		);
	});
	it('should handle WS_GET_MESSAGE_PRIVATE', () => {
		expect(
			wsReducerPrivate(initialState, {
				type: WS_GET_MESSAGE_PRIVATE,
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
		expect(wsReducerPrivate(initialState, {})).toEqual({
			wsConnected: false,
			error: null,
			messages: [],
		});
	});
});
