import React from 'react';
import styles from './not-found-404-page.module.scss';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useHistory} from "react-router-dom";

const NotFound404Page = () => {
	const history = useHistory();
	return (
		<div className={styles.main} >
			<p className="text text_type_digits-large mt-10">404</p>
			<p className="text text_type_main-medium mb-10">Страница не найдена</p>
			<Button type="primary" size="medium" onClick={() => {
				history.replace({ pathname: '/' });
			}}>
				Главная
			</Button>
		</div>
	);
};

export default NotFound404Page;
