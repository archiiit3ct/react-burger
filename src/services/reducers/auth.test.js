import {
	EDIT_ERROR,
	EDIT_REQUEST,
	EDIT_SUCCESS,
	FORGOT_ERROR,
	FORGOT_REQUEST,
	FORGOT_SUCCESS,
	LOGIN_ERROR,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_ERROR,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	REFRESH_ERROR,
	REFRESH_REQUEST,
	REFRESH_SUCCESS,
	REGISTER_ERROR,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_ERROR,
	RESET_REQUEST,
	RESET_SUCCESS,
	USER_ERROR,
	USER_REQUEST,
	USER_SUCCESS,
} from '../actions/auth';
import {authReducer, initialState} from './auth';

describe('authorization reducer', () => {
	it('should handle REGISTER_REQUEST', () => {
		expect(authReducer(initialState, {type: REGISTER_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				registerRequest: true,
				registerSuccess: false,
				registerError: false,
			})
		);
	});
	it('should handle REGISTER_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: REGISTER_SUCCESS,
				payload: {name: 'test', email: 'test@test.ru'},
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				name: 'test',
				email: 'test@test.ru',
				registerRequest: false,
				registerSuccess: true,
				registerError: false,
			})
		);
	});
	it('should handle REGISTER_ERROR', () => {
		expect(authReducer(initialState, {type: REGISTER_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				registerRequest: false,
				registerSuccess: false,
				registerError: true,
			})
		);
	});
	it('should handle LOGIN_REQUEST', () => {
		expect(authReducer(initialState, {type: LOGIN_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				loginRequest: true,
				loginSuccess: false,
				loginError: false,
			})
		);
	});
	it('should handle LOGIN_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: LOGIN_SUCCESS,
				payload: {name: 'test', email: 'test@test.ru'},
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				name: 'test',
				email: 'test@test.ru',
				loginRequest: false,
				loginSuccess: true,
				loginError: false,
			})
		);
	});
	it('should handle LOGIN_ERROR', () => {
		expect(authReducer(initialState, {type: LOGIN_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				loginRequest: false,
				loginSuccess: false,
				loginError: true,
			})
		);
	});
	it('should handle LOGOUT_REQUEST', () => {
		expect(authReducer(initialState, {type: LOGOUT_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				logoutRequest: true,
				logoutSuccess: false,
				logoutError: false,
			})
		);
	});
	it('should handle LOGOUT_SUCCESS', () => {
		expect(authReducer(initialState, {type: LOGOUT_SUCCESS})).toEqual(
			expect.objectContaining({
				...initialState,
				name: '',
				email: '',
				logoutRequest: false,
				logoutSuccess: true,
				logoutError: false,
			})
		);
	});
	it('should handle LOGOUT_ERROR', () => {
		expect(authReducer(initialState, {type: LOGOUT_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				logoutRequest: false,
				logoutSuccess: false,
				logoutError: true,
			})
		);
	});
	it('should handle REFRESH_REQUEST', () => {
		expect(authReducer(initialState, {type: REFRESH_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				refreshRequest: true,
				refreshSuccess: false,
				refreshError: false,
			})
		);
	});
	it('should handle REFRESH_SUCCESS', () => {
		expect(authReducer(initialState, {type: REFRESH_SUCCESS})).toEqual(
			expect.objectContaining({
				...initialState,
				refreshRequest: false,
				refreshSuccess: true,
				refreshError: false,
			})
		);
	});
	it('should handle REFRESH_ERROR', () => {
		expect(authReducer(initialState, {type: REFRESH_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				refreshRequest: false,
				refreshSuccess: false,
				refreshError: true,
			})
		);
	});
	it('should handle FORGOT_REQUEST', () => {
		expect(authReducer(initialState, {type: FORGOT_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				forgotRequest: true,
				forgotSuccess: false,
				forgotError: false,
			})
		);
	});
	it('should handle FORGOT_SUCCESS', () => {
		expect(authReducer(initialState, {type: FORGOT_SUCCESS})).toEqual(
			expect.objectContaining({
				...initialState,
				forgotRequest: false,
				forgotSuccess: true,
				forgotError: false,
			})
		);
	});
	it('should handle FORGOT_ERROR', () => {
		expect(authReducer(initialState, {type: FORGOT_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				forgotRequest: false,
				forgotSuccess: false,
				forgotError: true,
			})
		);
	});
	it('should handle RESET_REQUEST', () => {
		expect(authReducer(initialState, {type: RESET_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				resetRequest: true,
				resetSuccess: false,
				resetError: false,
			})
		);
	});
	it('should handle RESET_SUCCESS', () => {
		expect(authReducer(initialState, {type: RESET_SUCCESS})).toEqual(
			expect.objectContaining({
				...initialState,
				forgotSuccess: false,
				resetRequest: false,
				resetSuccess: true,
				resetError: false,
			})
		);
	});
	it('should handle RESET_ERROR', () => {
		expect(authReducer(initialState, {type: RESET_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				resetRequest: false,
				resetSuccess: false,
				resetError: true,
			})
		);
	});
	it('should handle USER_REQUEST', () => {
		expect(authReducer(initialState, {type: USER_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				userRequest: true,
				userSuccess: false,
				userError: false,
			})
		);
	});
	it('should handle USER_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: USER_SUCCESS,
				payload: {name: 'test', email: 'test@test.ru'},
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				name: 'test',
				email: 'test@test.ru',
				userRequest: false,
				userSuccess: true,
				userError: false,
			})
		);
	});
	it('should handle USER_ERROR', () => {
		expect(authReducer(initialState, {type: USER_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				userRequest: false,
				userSuccess: false,
				userError: true,
			})
		);
	});
	it('should handle EDIT_REQUEST', () => {
		expect(authReducer(initialState, {type: EDIT_REQUEST})).toEqual(
			expect.objectContaining({
				...initialState,
				editRequest: true,
				editSuccess: false,
				editError: false,
			})
		);
	});
	it('should handle EDIT_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: EDIT_SUCCESS,
				payload: {name: 'test', email: 'test@test.ru'},
			})
		).toEqual(
			expect.objectContaining({
				...initialState,
				name: 'test',
				email: 'test@test.ru',
				editRequest: false,
				editSuccess: true,
				editError: false,
			})
		);
	});
	it('should handle EDIT_ERROR', () => {
		expect(authReducer(initialState, {type: EDIT_ERROR})).toEqual(
			expect.objectContaining({
				...initialState,
				editRequest: false,
				editSuccess: false,
				editError: true,
			})
		);
	});
	it('return initial state', () => {
		expect(authReducer(initialState, {})).toEqual({
			email: '',
			password: '',
			name: '',
			registerRequest: false,
			registerSuccess: false,
			registerError: false,
			loginRequest: false,
			loginSuccess: false,
			loginError: false,
			logoutRequest: false,
			logoutSuccess: false,
			logoutError: false,
			refreshRequest: false,
			refreshSuccess: false,
			refreshError: false,
			forgotRequest: false,
			forgotSuccess: false,
			forgotError: false,
			resetRequest: false,
			resetSuccess: false,
			resetError: false,
			userRequest: false,
			userSuccess: false,
			userError: false,
			editRequest: false,
			editSuccess: false,
			editError: false,
		});
	});
});
