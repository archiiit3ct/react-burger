import React, {useState} from 'react';
import styles from './forgot-password-page.module.scss';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleForgot} from "../../services/actions";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(handleForgot(email, history));
	};

	const refreshToken = localStorage.getItem('refreshToken');
	if (refreshToken) {
		return <Redirect to={{pathname: '/profile'}}/>
	}

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
						onChange={e => setEmail(e.target.value)}
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
