import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {handleRefresh} from "../../services/actions";


export function ProtectedRoute({children, ...rest}) {
	const dispatch = useDispatch();
	const hasToken = localStorage.getItem('refreshToken');
	const {name} = useSelector((store) => store.user);
	useEffect(() => {
		dispatch(handleRefresh());
	}, [dispatch]);

	return (
		<Route {...rest} render={({location}) => name || hasToken ? (children) : (<Redirect to={{
			pathname: '/login',
			state: {from: location}
		}}/>)}/>
	);
}