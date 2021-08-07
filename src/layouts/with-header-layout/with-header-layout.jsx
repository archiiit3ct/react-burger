import React from 'react';
import AppHeader from "../../components/AppHeader/AppHeader";

const WithHeaderLayout = ({children}) => {
	return (
		<>
			<AppHeader/>
			{children}
		</>
	)
}

export default WithHeaderLayout;