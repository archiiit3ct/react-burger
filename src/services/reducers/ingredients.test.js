import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS,} from '../actions/ingredients';
import {ingredientsReducer, initialState} from './ingredients';

describe('ingredients reducer', () => {
	it('should handle GET_INGREDIENTS_REQUEST', () => {
		expect(
			ingredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST})
		).toEqual(
			expect.objectContaining({
				...initialState,
				ingredientsRequest: true,
			})
		);
	});
	it('should handle GET_INGREDIENTS_ERROR', () => {
		expect(
			ingredientsReducer(initialState, {type: GET_INGREDIENTS_ERROR})
		).toEqual(
			expect.objectContaining({
				...initialState,
				ingredientsError: true,
				ingredientsRequest: false,
			})
		);
	});
	it('should handle GET_INGREDIENTS_SUCCESS', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_SUCCESS,
				ingredients: [
					{name: 'bread', id: '1'},
					{name: 'butter', id: '2'},
				],
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				ingredients: [
					{name: 'bread', id: '1'},
					{name: 'butter', id: '2'},
				],
				ingredientsRequest: false,
				ingredientsSuccess: true,
			})
		);
	});
	it('return initial state', () => {
		expect(ingredientsReducer(initialState, {})).toEqual({
			ingredientsRequest: false,
			ingredientsSuccess: false,
			ingredientsError: false,
			ingredients: [],
		});
	});
});
