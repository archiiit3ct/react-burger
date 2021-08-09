import React from 'react';
import styles from './register-page.module.scss';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SET_EMAIL, SET_NAME, SET_PASSWORD, userRegister} from "../../services/actions";

const RegisterPage = () => {
	const dispatch = useDispatch();

	const {name, email, password} = useSelector(store => ({
		name: store.user.name,
		email: store.user.email,
		password: store.user.password,
	}))

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(userRegister(name, email, password))
	}

	return (
		<div className={styles.main}>
			<p className="text text_type_main-medium mb-6">Регистрация</p>
			<form className={styles.form} onSubmit={onSubmit}>
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
				<Button>Зарегистрироваться</Button>
			</form>
			<p className={`${styles.links} text text_type_main-default mb-4`}>
				Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
