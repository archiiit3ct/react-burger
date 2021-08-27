import React, {useState} from 'react';
import styles from './register-page.module.scss';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleRegistration} from "../../services/actions";

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(handleRegistration(email, password, name));
	}

	const refreshToken = localStorage.getItem('refreshToken');

	if (refreshToken) {
		return (
			<Redirect to={{pathname: '/profile'}}/>
		)
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
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<EmailInput
						value={email}
						name={'email'}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<PasswordInput
						value={password}
						name={'password'}
						onChange={e => setPassword(e.target.value)}
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
