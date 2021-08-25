import React from 'react';
import styles from './NavProfile.module.scss';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleLogout} from "../../services/actions";

const NavProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const logoutProfile = () => {
		dispatch(handleLogout(history));
	};

	return (
		<div className={`${styles.navigation} pt-30`}>
			<NavLink
				to="/profile"
				className={`${styles.item} text text_type_main-medium`}
				activeClassName={styles.active}
				exact
			>Профиль</NavLink>
			<NavLink
				to='/profile/orders'
				className={`${styles.item} text text_type_main-medium`}
				activeClassName={styles.active}
			>История заказов</NavLink>
			<div
				className={`${styles.item} text text_type_main-medium`}
				onClick={logoutProfile}
			>Выход
			</div>
			<p className={`${styles.desc} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои
				персональные данные</p>
		</div>
	);
};

export default NavProfile;
