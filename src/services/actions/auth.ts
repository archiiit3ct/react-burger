import { RouteComponentProps } from 'react-router-dom';
import { setCookie, deleteCookie, getCookie } from '../utils';
import { checkResponse, url } from '../api';
import { AppThunk } from '../types';
import {//регистрация
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  //авторизация
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  //выход
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  //обновление токена
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_ERROR,
  //запрос на восстановление пароля
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_ERROR,
  //сброс пароля
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_ERROR,
  //получение данных пользователя
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  //изменение данных пользователя
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_ERROR,} from '../constants/auth';
  interface IRegisterReqestAction {readonly type: typeof REGISTER_REQUEST;}
  interface IRegisterSuccessAction {readonly type: typeof REGISTER_SUCCESS; readonly payload: {name: string, email: string};}
  interface IRegisterErrorAction {readonly type: typeof REGISTER_ERROR;}

  interface ILoginReqestAction {readonly type: typeof LOGIN_REQUEST;}
  interface ILoginSuccessAction {readonly type: typeof LOGIN_SUCCESS; readonly payload: {name: string, email: string};}
  interface ILoginErrorAction {readonly type: typeof LOGIN_ERROR;}

  interface ILogoutReqestAction {readonly type: typeof LOGOUT_REQUEST;}
  interface ILogoutSuccessAction {readonly type: typeof LOGOUT_SUCCESS;}
  interface ILogoutErrorAction {readonly type: typeof LOGOUT_ERROR;}

  interface IRefreshReqestAction {readonly type: typeof REFRESH_REQUEST;}
  interface IRefreshSuccessAction {readonly type: typeof REFRESH_SUCCESS;}
  interface IRefreshErrorAction {readonly type: typeof REFRESH_ERROR;}

  interface IForgotReqestAction {readonly type: typeof FORGOT_REQUEST;}
  interface IForgotSuccessAction {readonly type: typeof FORGOT_SUCCESS;}
  interface IForgotErrorAction {readonly type: typeof FORGOT_ERROR;}

  interface IResetReqestAction {readonly type: typeof RESET_REQUEST;}
  interface IResetSuccessAction {readonly type: typeof RESET_SUCCESS;}
  interface IResetErrorAction {readonly type: typeof RESET_ERROR;}

  interface IUserReqestAction {readonly type: typeof USER_REQUEST;}
  interface IUserSuccessAction {readonly type: typeof USER_SUCCESS; readonly payload: {name: string, email: string};}
  interface IUserErrorAction {readonly type: typeof USER_ERROR;}

  interface IEditReqestAction {readonly type: typeof EDIT_REQUEST;}
  interface IEditSuccessAction {readonly type: typeof EDIT_SUCCESS; readonly payload: {name: string, email: string};}
  interface IEditErrorAction {readonly type: typeof EDIT_ERROR;}

  export type TAuthAction = IRegisterReqestAction | IRegisterSuccessAction | IRegisterErrorAction | ILoginReqestAction | ILoginSuccessAction | ILoginErrorAction | ILogoutReqestAction | ILogoutSuccessAction | ILogoutErrorAction | IRefreshReqestAction | IRefreshSuccessAction | IRefreshErrorAction | IForgotReqestAction | IForgotSuccessAction | IForgotErrorAction | IUserReqestAction | IUserSuccessAction | IUserErrorAction | IEditReqestAction | IEditSuccessAction | IEditErrorAction | IResetReqestAction | IResetSuccessAction | IResetErrorAction;

export const registration:AppThunk = (email: string, password: string, name: string) => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });
  fetch(`${url}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify({ email, password, name }),
  })
    .then((response) => checkResponse(response))
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
      dispatch({
        type: REGISTER_ERROR,
      });
    });
};

export const login:AppThunk = (email: string, password: string) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  fetch(`${url}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify({ email, password }),
  })
    .then((response) => checkResponse(response))
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
      dispatch({
        type: LOGIN_ERROR,
      });
    });
};
export const logout:AppThunk = (history: RouteComponentProps["history"]) => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  fetch(`${url}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then((response) => checkResponse(response))
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
export const refresh:AppThunk = () => (dispatch) => {
  dispatch({
    type: REFRESH_REQUEST,
  });
  fetch(`${url}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then((response) => checkResponse(response))
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
export const forgot:AppThunk = (email: string, history: RouteComponentProps["history"]) => (dispatch) => {
  dispatch({
    type: FORGOT_REQUEST,
  });
  fetch(`${url}password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify({ email }),
  })
    .then((response) => checkResponse(response))
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
export const reset:AppThunk = (password: string, token: string, history: RouteComponentProps["history"]) => (dispatch) => {
  dispatch({
    type: RESET_REQUEST,
  });
  fetch(`${url}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify({ password, token }),
  })
    .then((response) => checkResponse(response))
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
export const user:AppThunk = () => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  fetch(`${url}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  })
    .then((response) => checkResponse(response))
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

export const edit:AppThunk = (email: string, password: string, name: string) => (dispatch) => {
  dispatch({
    type: EDIT_REQUEST,
  });
  fetch(`${url}auth/user`, {
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
    body: JSON.stringify({ email, password, name }),
  })
    .then((response) => checkResponse(response))
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
      refresh();
    });
};
