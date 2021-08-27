import React, {useState} from 'react';
import styles from "./reset-password-page.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleReset} from "../../services/actions";

const ResetPasswordPage = () => {
	const {forgotSuccess} = useSelector((state) => state.user);
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(handleReset(password, token, history));
	};

	if (!forgotSuccess) {
		return <Redirect to="/forgot-password"/>
	}

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={onSubmit}>
				<p className="text text_type_main-medium mb-6">Восстановление пароля</p>
				<div className="mb-6">
					<PasswordInput
						value={password}
						name={'password'}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<Input
						type="text"
						placeholder="Введите код из письма"
						value={token}
						onChange={e => setToken(e.target.value)}
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
