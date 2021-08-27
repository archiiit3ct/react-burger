import {deleteCookie, getCookie, setCookie} from "../utils";

// registration
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

// authorization
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

// logout
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

// refresh token
export const REFRESH_REQUEST = 'REFRESH_REQUEST';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';
export const REFRESH_ERROR = 'REFRESH_ERROR';

// forgot password
export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_ERROR = 'FORGOT_ERROR';

// reset password
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_ERROR = 'RESET_ERROR';

// get user
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

// edit user
export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_ERROR = 'EDIT_ERROR';

const API = 'https://norma.nomoreparties.space/api/';

export const handleRegistration = (email, password, name) => (dispatch) => {
	dispatch({
		type: REGISTER_REQUEST,
	});
	fetch(`${API}auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		body: JSON.stringify({email, password, name}),
	})
		.then((response) => {
			response.ok ? response.json() : Promise.reject(response);
		})
		.then((response) => {
			const accessToken = response.accessToken.split('Bearer ')[1];
			const refreshToken = response.refreshToken;
			setCookie('token', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.user,
			});
		})
		.catch((response) => {
			console.log(response);
			dispatch({
				type: REGISTER_ERROR,
			});
		});
};

export const handleLogin = (email, password) => (dispatch) => {
	dispatch({
		type: LOGIN_REQUEST,
	});
	fetch(`${API}auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		body: JSON.stringify({email, password}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then((response) => {
			const accessToken = response.accessToken.split('Bearer ')[1];
			const refreshToken = response.refreshToken;
			setCookie('token', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.user,
			});
		})
		.catch((response) => {
			console.log(response);
			dispatch({
				type: LOGIN_ERROR,
			});
		});
};

export const handleLogout = (history) => (dispatch) => {
	dispatch({
		type: LOGOUT_REQUEST,
	});
	fetch(`${API}auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then(() => {
			deleteCookie('token');
			localStorage.removeItem('refreshToken');
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			history.replace('/');
		})
		.catch(() => {
			dispatch({
				type: LOGOUT_ERROR,
			});
		});
};

export const handleRefresh = () => (dispatch) => {
	dispatch({
		type: REFRESH_REQUEST,
	});
	fetch(`${API}auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then((response) => {
			const accessToken = response.accessToken.split('Bearer ')[1];
			const refreshToken = response.refreshToken;
			setCookie('token', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			dispatch({
				type: REFRESH_SUCCESS,
			});
		})
		.catch(() => {
			dispatch({
				type: REFRESH_ERROR,
			});
		});
};

export const handleForgot = (email, history) => (dispatch) => {
	dispatch({
		type: FORGOT_REQUEST,
	});
	fetch(`${API}password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		body: JSON.stringify({email}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then(() => {
			dispatch({
				type: FORGOT_SUCCESS,
			});
			history.replace('/reset-password');
		})
		.catch(() => {
			dispatch({
				type: FORGOT_ERROR,
			});
		});
};

export const handleReset = (password, token, history) => (dispatch) => {
	dispatch({
		type: RESET_REQUEST,
	});
	fetch(`${API}password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		body: JSON.stringify({password, token}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then(() => {
			dispatch({
				type: RESET_SUCCESS,
			});
			history.replace('/login');
		})
		.catch(() => {
			dispatch({
				type: RESET_ERROR,
			});
		});
};

export const handleUser = () => (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});
	fetch(`${API}auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then((response) => {
			dispatch({
				type: USER_SUCCESS,
				payload: response.user,
			});
		})
		.catch(() => {
			dispatch({
				type: USER_ERROR,
			});
			deleteCookie('token');
			localStorage.removeItem('refreshToken');
		});
};

export const handleEdit = (email, password, name) => (dispatch) => {
	dispatch({
		type: EDIT_REQUEST,
	});
	fetch(`${API}auth/user`, {
		method: 'PATCH',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({email, password, name}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then((response) => {
			dispatch({
				type: EDIT_SUCCESS,
				payload: response.user,
			});
		})
		.catch(() => {
			dispatch({
				type: EDIT_ERROR,
			});
			handleRefresh();
		});
};

