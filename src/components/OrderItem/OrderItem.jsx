import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/data';

import styles from './OrderItem.module.scss';

const OrderItem = () => {
	return (
		<div
			className={`${styles.main} mb-6`}
		>
			<div className={`${styles.header} mb-6`}>
				<p className="text text_type_digits-default">#034535</p>
				<p className="text text_type_main-default text_color_inactive">Сегодня, 10:33 i-GMT+3</p>
			</div>
			<h4 className="text text_type_main-medium mb-2">Interstellar бургер</h4>
			<p className="text text_type_main-default">Создан</p>
			<div className={`${styles.footer} mt-6`}>
				<div className={styles.ingredients}>
					<div className={styles.ingredient}>
						<img src={data[14].image} alt={data[0].name}/>
					</div>
					<div className={styles.ingredient}>
						<img src={data[4].image} alt={data[0].name}/>
					</div>
					<div className={styles.ingredient}>
						<img src={data[2].image} alt={data[0].name}/>
					</div>
					<div className={styles.ingredient}>
						<img src={data[10].image} alt={data[0].name}/>
					</div>
					<div className={styles.ingredient}>
						<img src={data[14].image} alt={data[0].name}/>
					</div>
				</div>
				<div className={`${styles.total}`}>
					<span className="text text_type_digits-default mr-2">510</span>
					<CurrencyIcon/>
				</div>
			</div>
		</div>
	)
}

export default OrderItem;