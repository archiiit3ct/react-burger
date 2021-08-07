import React from 'react';
import NavProfile from "../../components/NavProfile/NavProfile";

import styles from "./with-nav-profile.module.scss";

const WithNavProfile = ({ children }) => {
	return (
		<div className={styles.container} >
			<NavProfile />
			{children}
		</div>
	)
}

export default WithNavProfile;