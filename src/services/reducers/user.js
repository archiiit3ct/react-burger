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
} from '../actions';

const initialState = {
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
};
export const user = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_REQUEST: {
			return {
				...state,
				registerRequest: true,
				registerSuccess: false,
				registerError: false,
			};
		}
		case REGISTER_SUCCESS: {
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				registerRequest: false,
				registerSuccess: true,
				registerError: false,
			};
		}
		case REGISTER_ERROR: {
			return {
				...state,
				registerRequest: false,
				registerSuccess: false,
				registerError: true,
			};
		}
		case LOGIN_REQUEST: {
			return {
				...state,
				loginRequest: true,
				loginSuccess: false,
				loginError: false,
			};
		}
		case LOGIN_SUCCESS: {
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				loginRequest: false,
				loginSuccess: true,
				loginError: false,
			};
		}
		case LOGIN_ERROR: {
			return {
				...state,
				loginRequest: false,
				loginSuccess: false,
				loginError: true,
			};
		}
		case LOGOUT_REQUEST: {
			return {
				...state,
				logoutRequest: true,
				logoutSuccess: false,
				logoutError: false,
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				name: '',
				email: '',
				logoutRequest: false,
				logoutSuccess: true,
				logoutError: false,
			};
		}
		case LOGOUT_ERROR: {
			return {
				...state,
				logoutRequest: false,
				logoutSuccess: false,
				logoutError: true,
			};
		}
		case REFRESH_REQUEST: {
			return {
				...state,
				refreshRequest: true,
				refreshSuccess: false,
				refreshError: false,
			};
		}
		case REFRESH_SUCCESS: {
			return {
				...state,
				refreshRequest: false,
				refreshSuccess: true,
				refreshError: false,
			};
		}
		case REFRESH_ERROR: {
			return {
				...state,
				refreshRequest: false,
				refreshSuccess: false,
				refreshError: true,
			};
		}
		case FORGOT_REQUEST: {
			return {
				...state,
				forgotRequest: true,
				forgotSuccess: false,
				forgotError: false,
			};
		}
		case FORGOT_SUCCESS: {
			return {
				...state,
				forgotRequest: false,
				forgotSuccess: true,
				forgotError: false,
			};
		}
		case FORGOT_ERROR: {
			return {
				...state,
				forgotRequest: false,
				forgotSuccess: false,
				forgotError: true,
			};
		}
		case RESET_REQUEST: {
			return {
				...state,
				resetRequest: true,
				resetSuccess: false,
				resetError: false,
			};
		}
		case RESET_SUCCESS: {
			return {
				...state,
				forgotSuccess: false,
				resetRequest: false,
				resetSuccess: true,
				resetError: false,
			};
		}
		case RESET_ERROR: {
			return {
				...state,
				resetRequest: false,
				resetSuccess: false,
				resetError: true,
			};
		}
		case USER_REQUEST: {
			return {
				...state,
				userRequest: true,
				userSuccess: false,
				userError: false,
			};
		}
		case USER_SUCCESS: {
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				userRequest: false,
				userSuccess: true,
				userError: false,
			};
		}
		case USER_ERROR: {
			return {
				...state,
				userRequest: false,
				userSuccess: false,
				userError: true,
			};
		}
		case EDIT_REQUEST: {
			return {
				...state,
				editRequest: true,
				editSuccess: false,
				editError: false,
			};
		}
		case EDIT_SUCCESS: {
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				editRequest: false,
				editSuccess: true,
				editError: false,
			};
		}
		case EDIT_ERROR: {
			return {
				...state,
				editRequest: false,
				editSuccess: false,
				editError: true,
			};
		}

		default: {
			return state;
		}
	}
};
