import {
	RESET_EMAIL,
	RESET_NAME,
	RESET_PASSWORD,
	SET_EMAIL,
	SET_NAME,
	SET_PASSWORD,
	SET_USER_FAILED,
	SET_USER_REQUEST,
	SET_USER_SUCCESS,
	SET_SUCCESS,
	SET_FAILED
} from '../actions';

const initialState = {
	userRequest: false,
	userSuccess: false,
	userFailed: false,
	user: null,

	name: '',
	email: '',
	password: ''
}

export const user = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_REQUEST:
			return {
				...state,
				userRequest: true
			}
		case SET_USER_SUCCESS:
			return {
				...state,
				userRequest: false,
				userFailed: false,
				user: action.payload
			}
		case SET_USER_FAILED:
			return {
				...state,
				userRequest: false,
				userFailed: true,
				user: null,
			}
		case SET_EMAIL:
			return {
				...state,
				email: action.payload
			}
		case RESET_EMAIL:
			return {
				...state,
				email: ''
			}
		case SET_PASSWORD:
			return {
				...state,
				password: action.payload
			}
		case RESET_PASSWORD:
			return {
				...state,
				password: ''
			}
		case SET_NAME:
			return {
				...state,
				name: action.payload
			}
		case RESET_NAME:
			return {
				...state,
				name: ''
			}
		case SET_SUCCESS:
			return {
				...state,
				userSuccess: true,
			}
		case SET_FAILED:
			return {
				...state,
				userSuccess: false,
			}
		default:
			return state
	}
}