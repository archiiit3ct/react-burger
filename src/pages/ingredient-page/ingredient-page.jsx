import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from './ingredient-page.module.scss';

const IngredientPage = () => {
	const { id } = useParams();
	const { ingredients } = useSelector(store => store.ingredients);
	const [ingredient, setIngredient] = useState(null);

	useEffect(() => {
		if(ingredients) {
			const ingredient = ingredients.find(item => item._id === id);
			setIngredient(ingredient);
		}
	}, [ingredients, id]);

	return (
		<div className={styles.main}>
			<h3 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h3>
			{ ingredient && (
				<div className={styles.container}>
					<img src={ingredient.image_large} alt='Ingredient' />
					<p className={`text text_type_main-medium`}>{ingredient.name}</p>
					<div className={styles.specification}>
						<section className={styles.item}>
							<p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
							<p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
								{ingredient.calories}
							</p>
						</section>
						<section className={styles.item}>
							<p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
							<p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
								{ingredient.proteins}
							</p>
						</section>
						<section className={styles.item}>
							<p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
							<p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
								{ingredient.fat}
							</p>
						</section>
						<section className={styles.item}>
							<p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
							<p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
								{ingredient.carbohydrates}
							</p>
						</section>
					</div>
				</div>
			)}
			{
				!ingredient && (
					<p className="text text_type_main-default text_color_inactive mt-6">
						Загрузка...
					</p>
				)
			}
		</div>
	);
};

export default IngredientPage;
