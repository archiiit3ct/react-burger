import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderItem.module.scss';
import {useSelector} from "react-redux";
import {showStatus, transformDate} from "../../services/utils";
import IconIngredient from "../IconIngredient/IconIngredient";

const OrderItem = ({number, name, createdAt, status, ingredients}) => {
	const ingredientsCatalog = useSelector((state) => state.ingredients.ingredients);
	const orderIngredients = ingredients.map((id) => {
		return ingredientsCatalog.find((item) => item._id === id);
	});
	const total = orderIngredients.length;
	const price = orderIngredients.reduce((sum, item) => {
		return sum + item.price;
	}, 0);

	return (
		<div
			className={`${styles.main} mb-6`}
		>
			<div className={`${styles.header} mb-6`}>
				<p className="text text_type_digits-default">#{number}</p>
				<p className="text text_type_main-default text_color_inactive">{transformDate(createdAt)}</p>
			</div>
			<h4 className="text text_type_main-medium mb-2">{name}</h4>
			<p className={`${styles.status} text text_type_main-default`}>{showStatus(status)}</p>
			<div className={`${styles.footer} mt-6`}>
				<div className={styles.ingredients}>
					{orderIngredients
						.slice(0, 6)
						.map((item, i) =>
							i === 5 ? (
								<IconIngredient
									key={i}
									desc={`+${total - 5}`}
									img={item.image_mobile}
									style={{left: i * -15, zIndex: 5 - i}}
								/>
							) : (
								<IconIngredient
									key={i}
									img={item.image_mobile}
									style={{left: i * -15, zIndex: 5 - i}}
								/>
							)
						)}
				</div>
				<div className={`${styles.total}`}>
					<span className="text text_type_digits-default mr-2">{price}</span>
					<CurrencyIcon type='primary'/>
				</div>
			</div>
		</div>
	)
}

export default OrderItem;