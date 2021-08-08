import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../services/actions";

export function ProtectedRoute({children, ...rest}) {
	const isAuth = localStorage.getItem('refreshToken');

	const dispatch = useDispatch();
	const init = async () => {
		await dispatch(getUserInfo());
	};

	useEffect(() => {
		if(isAuth) init();
	}, []);

	return (
		<Route {...rest} render={({ location }) => isAuth ? (children) : (<Redirect to={{
			pathname: '/login',
			state: { from: location }
		}}/>)}/>
	);
}