import {Redirect, Route} from "react-router-dom";
import React from "react";

function DefaultRoute({children, ...rest}) {
	const isAuth = localStorage.getItem('refreshToken');

	return (
		<Route {...rest} render={() => ((!isAuth) ? children : <Redirect to={'/'}/>)}/>
	)
}

export default DefaultRoute;
