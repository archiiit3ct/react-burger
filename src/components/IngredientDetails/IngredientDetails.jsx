import React from 'react';
import styles from './IngredientDetails.module.scss';
import { useSelector } from "react-redux";


const IngredientDetails = () => {
  const { modalContent } = useSelector(store => store.ingredients);

  const { image_large, name, calories, proteins, fat, carbohydrates } = modalContent;

  return (
    <div className={styles.ingredient}>
      <img src={image_large} alt='Ingredient' />
      <p className={`text text_type_main-medium`}>{name}</p>
      <div className={styles.specification}>
        <section className={styles.item}>
          <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
            {calories}
          </p>
        </section>
        <section className={styles.item}>
          <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
            {proteins}
          </p>
        </section>
        <section className={styles.item}>
          <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
            {fat}
          </p>
        </section>
        <section className={styles.item}>
          <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.number} text text_type_digits-default text_color_inactive`}>
            {carbohydrates}
          </p>
        </section>
      </div>
    </div>
  );
};

export default IngredientDetails;
