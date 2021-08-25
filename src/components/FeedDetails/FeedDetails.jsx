import React from 'react';
import styles from './FeedDetails.module.scss';
import {useSelector} from "react-redux";
import {showStatus, transformDate} from "../../services/utils";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IconIngredient from "../IconIngredient/IconIngredient";


const FeedDetails = () => {
	const {modalContent, catalog} = useSelector((store) => ({
		modalContent: store.ingredients.modalContent,
		catalog: store.ingredients.ingredients,
	}));
	const {number, name, status, ingredients, createdAt} = modalContent;

	const orderIngredients = ingredients.map((id) => {
		return catalog.find((item) => item._id === id);
	});

	const price =
		orderIngredients.reduce((sum, item) => {
			return sum + item.price;
		}, 0);

	return (
		<div className={styles.main}>
			<div className={`${styles.id} text text_type_digits-default`}>
				#{number}
			</div>
			<div className='text text_type_main-medium pt-10'>
				{name}
			</div>
			<div className={`${styles.status} text text_type_main-default pt-3`}>
				{showStatus(status)}
			</div>
			<div className='text text_type_main-medium pt-15'>Состав:</div>
			<ul className={`${styles.wrapper} pt-6`}>
				{orderIngredients.map((item, i) => (
					<li className={styles.item} key={i}>
						<IconIngredient img={item.image_mobile}/>
						<div className={`${styles.name} text text_type_main-default`}>{item.name}</div>
						<div className={`${styles.price} text text_type_digits-default`}>
							<span>{item.price}</span>
							<CurrencyIcon type='primary'/>
						</div>
					</li>
				))}
			</ul>
			<div className={`${styles.footer} pt-10`}>
        <span className='text text_type_main-default text_color_inactive'>
          {transformDate(createdAt)}
        </span>
				<span className={`${styles.price} text text_type_digits-default`}>
					{price}
					<CurrencyIcon type='primary'/>
        </span>
			</div>
		</div>
	);
};

export default FeedDetails;
