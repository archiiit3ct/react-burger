import React from 'react';
import styles from './Ingredient.module.scss';
import Price from '../Price/Price';
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {addIngredientConstructor} from "../../services/actions/order";
import {Link, useLocation} from "react-router-dom";

const Ingredient = ({item, openModal}) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const [, dragRef] = useDrag({type: 'ingredient-page', item: {id: item._id}});


	const addIngredient = (e) => {
		e.stopPropagation();
		dispatch(addIngredientConstructor(item._id));
	}

	return (
		<Link
			to={{
				pathname: `/ingredients/${item._id}`,
				state: {background: location}
			}}
			className={`${styles.ingredient} mb-2`}
			onClick={() => {
				openModal(item)
			}}
			ref={dragRef}
		>
			<img src={item.image} alt={item.name}/>
			<section className={styles.desc}>
				<Price price={item.price}/>
				<p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
			</section>
			<div className={styles.fake} onClick={addIngredient}></div>
		</Link>
	);
};

Ingredient.propTypes = {
	item: PropTypes.shape({
		colories: PropTypes.number,
		carbohydrates: PropTypes.number,
		fat: PropTypes.number,
		image: PropTypes.string.isRequired,
		image_large: PropTypes.string,
		image_mobile: PropTypes.string,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		proteins: PropTypes.number,
		type: PropTypes.string,
	}).isRequired,
	openModal: PropTypes.func.isRequired
}

export default Ingredient;