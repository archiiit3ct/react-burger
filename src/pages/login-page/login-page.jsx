import React, {useState} from 'react';
import styles from './login-page.module.scss';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleLogin} from "../../services/actions";

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(handleLogin(email, password));
	}

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={onSubmit}>
				<p className="text text_type_main-medium mb-6">
					Вход
				</p>
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
				<Button>Войти</Button>
			</form>
			<section className={styles.links}>
				<p className={`${styles.desc} text text_type_main-default mb-4`}>
					Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегестрироваться</Link>
				</p>
				<p className={`${styles.desc} text text_type_main-default`}>
					Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
				</p>
			</section>
		</div>
	);
};

export default LoginPage;
