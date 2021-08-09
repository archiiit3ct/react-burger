import React, {useEffect} from 'react';
import styles from './login-page.module.scss';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SET_EMAIL, SET_PASSWORD, userLogin,} from "../../services/actions";

const LoginPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };

	const {email, password, userSuccess} = useSelector(store => store.user)

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(userLogin(email, password))
	}

	useEffect(() => {
		if(userSuccess) {
			history.replace(from);
		}
	}, [userSuccess]);


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
