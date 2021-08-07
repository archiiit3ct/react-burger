import React from 'react';


import s from './with-profile-nav.module.sass';

const WithProfileNav = ({ children }) => {
	return (
		<div className={`${s.container}`} >
			<ProfileNav />
			{children}
		</div>
	)
}

export default WithProfileNav;