import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

function DefaultRoute({children, ...rest}) {
	const {name} = useSelector((store) => store.user);

	const getNextPage = (location,) => {
		let result;
		if (location && location.state?.target) {
			result = location.state.target;
			delete location.state.target;
		} else {
			result = '/';
		}
		return result;
	};

	const render = ({location, history}) => {
		if (!name) {
			return children;
		}
		return <Redirect to={getNextPage(location, history)}/>;
	};

	return <Route {...rest} render={render}/>;
}

export default DefaultRoute;
