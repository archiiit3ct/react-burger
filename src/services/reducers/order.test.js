import {ADD_ORDER_ERROR, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS,} from '../actions/order';
import {CLOSE_MODAL} from '../actions/modal';
import {initialState, orderReducer} from './order';

describe('order reducer', () => {
	it('should handle ADD_ORDER_REQUEST', () => {
		expect(orderReducer(initialState, {type: ADD_ORDER_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				orderRequest: true,
				orderSuccess: false,
				orderFailed: false,
			})
		);
	});
	it('should handle ADD_ORDER_SUCCESS', () => {
		expect(
			orderReducer(initialState, {type: ADD_ORDER_SUCCESS, order: 1034})
		).toEqual(
			expect.objectContaining({
				...initialState,
				orderRequest: false,
				orderSuccess: true,
				orderFailed: false,
				order: 1034,
			})
		);
	});
	it('should handle ADD_ORDER_ERROR', () => {
		expect(orderReducer(initialState, {type: ADD_ORDER_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				orderFailed: true,
				orderRequest: false,
				orderSuccess: false,
			})
		);
	});
	it('should handle CLOSE_MODAL', () => {
		expect(orderReducer(initialState, {type: CLOSE_MODAL})).toEqual(
			expect.objectContaining({
				...initialState,
				orderSuccess: false,
				order: null,
			})
		);
	});
	it('return initial state', () => {
		expect(orderReducer(initialState, {})).toEqual({
			orderRequest: false,
			orderSuccess: false,
			orderFailed: false,
			order: null,
		});
	});
});
