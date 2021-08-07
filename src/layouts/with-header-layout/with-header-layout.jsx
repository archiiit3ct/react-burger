import React from 'react';
import AppHeader from "../../components/AppHeader/AppHeader";

const WithAppHeader = ({ children }) => {
	return (
		<>
			<AppHeader/>
			{children}
		</>
	)
}

export default WithAppHeader;