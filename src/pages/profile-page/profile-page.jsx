import React from 'react';
import styles from './profile-page.module.scss';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {SET_EMAIL, SET_NAME, SET_PASSWORD, updateUserInfo} from "../../services/actions";

const ProfilePage = () => {
	const dispatch = useDispatch();

	const {email, name, password} = useSelector(store => ({
		email: store.user.email,
		name: store.user.name,
		password: store.user.password,
	}))
	const handleUpdateUserInfo = (e) => {
		e.preventDefault();
		dispatch(updateUserInfo({
			name,
			email,
			password
		}))
	}

	return (
		<div className={styles.profile}>
			<div className="pt-30">
				<form onSubmit={handleUpdateUserInfo} className={styles.form}>
					<div className="mb-6">
						<Input
							type="text"
							placeholder="Имя"
							value={name}
							onChange={e => dispatch({type: SET_NAME, payload: e.target.value})}
						/>
					</div>
					<div className="mb-6">
						<EmailInput
							value={email}
							name={'email'}
							onChange={e => dispatch({type: SET_EMAIL, payload: e.target.value})}
						/>
					</div>
					<div className="mb-6">
						<PasswordInput
							value={password}
							name={'password'}
							onChange={e => dispatch({type: SET_PASSWORD, payload: e.target.value})}
						/>
					</div>
					<div className={styles.buttons}>
						<div className={`${styles.cancel} text text_type_main-default`}>Отмена</div>
						<Button type="primary" size="medium">
							Сохранить
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
