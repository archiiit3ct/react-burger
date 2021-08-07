import React, {useEffect} from 'react';
import styles from "./reset-password-page.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword, SET_EMAILCODE, SET_PASSWORD} from "../../services/actions";

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {password, emailCode, resetPasswordSuccess} = useSelector(store => ({
		password: store.user.password,
		emailCode: store.resetPassword.emailCode,
		resetPasswordSuccess: store.resetPassword.resetPasswordSuccess,
	}))

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPassword(password, emailCode))
	}

	useEffect(() => {
		if (resetPasswordSuccess && resetPasswordSuccess.success) {
			history.replace({pathname: '/login'})
		}
	}, [history, resetPasswordSuccess]);

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={onSubmit}>
				<p className="text text_type_main-medium mb-6">Восстановление пароля</p>
				<div className="mb-6">
					<PasswordInput
						value={password}
						name={'password'}
						onChange={e => dispatch({type: SET_PASSWORD, payload: e.target.value})}
					/>
				</div>
				<div className="mb-6">
					<Input
						type="text"
						placeholder="Введите код из письма"
						value={emailCode}
						onChange={e => dispatch({type: SET_EMAILCODE, payload: e.target.value})}
					/>
				</div>
				<Button>Сохранить</Button>
			</form>
			<p className={`${styles.links} text text_type_main-default mb-4`}>
				Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
			</p>
		</div>
	);
};

export default ResetPasswordPage;
