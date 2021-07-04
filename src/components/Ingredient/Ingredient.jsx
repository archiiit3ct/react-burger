import React from 'react';
import styles from './Ingredient.module.scss';
import Price from '../Price/Price';
import PropTypes from 'prop-types';

const Ingredient = ({ item, openModal }) => {

  return (
    <div
      className={`${styles.ingredient} mb-2`}
      onClick={() => openModal(
        {mode: 'ingredient', header: 'Детали ингредиента', ingredient: item })} >
      <img src={item.image} alt={item.name} />
      <Price price={item.price} />
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </div>
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