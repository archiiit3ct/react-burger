import React, {useEffect} from 'react';
import styles from './forgot-password-page.module.scss';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendEmailForResetPass, SET_EMAIL} from "../../services/actions";

const ForgotPasswordPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {email, sendEmailSuccess} = useSelector(store => ({
		email: store.user.email,
		sendEmailSuccess: store.resetPassword.sendEmailSuccess,
	}))

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(sendEmailForResetPass(email))
	}

	useEffect(() => {
		if (sendEmailSuccess && sendEmailSuccess.success) {
			history.replace({pathname: '/reset-password'})
		}
	}, [sendEmailSuccess, history, dispatch]);

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={onSubmit}>
				<p className="text text_type_main-medium mb-6">
					Восстановление пароля
				</p>
				<div className="mb-6">
					<Input
						type="text"
						placeholder="Укажите e-mail"
						value={email}
						onChange={e => dispatch({type: SET_EMAIL, payload: e.target.value})}
					/>
				</div>
				<Button>Восстановить</Button>
			</form>
			<p className={`${styles.links} text text_type_main-default mb-4`}>
				Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
			</p>
		</div>
	);
};

export default ForgotPasswordPage;
