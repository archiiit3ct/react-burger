import React, {useEffect, useState} from 'react';
import styles from './profile-page.module.scss';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {handleEdit, handleUser} from "../../services/actions";

const ProfilePage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleUser());
	}, [dispatch])

	const defaultName = useSelector((state) => state.user.name);
	const defaultEmail = useSelector((state) => state.user.email);
	const [name, setName] = useState(defaultName);
	const [email, setEmail] = useState(defaultEmail);
	const [password, setPassword] = useState('');

	useEffect(() => {
		setName(() => defaultName);
		setEmail(() => defaultEmail);
	}, [defaultName, defaultEmail]);

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(handleEdit(email, password, name));
	}

	const handleCancel = () => {
		setName(() => defaultName);
		setEmail(() => defaultEmail);
		setPassword('');
	}

	return (
		<div className={styles.profile}>
			<div className="pt-30">
				<form onSubmit={handleUpdate} className={styles.form}>
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
					{name !== defaultName || email !== defaultEmail || password ? (
						<div className={styles.buttons}>
							<div className={`${styles.cancel} text text_type_main-default`} onClick={handleCancel}>Отмена</div>
							<Button type="primary" size="medium">
								Сохранить
							</Button>
						</div>
					) : null}
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
