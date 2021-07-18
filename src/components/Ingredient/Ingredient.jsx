import React from 'react';
import styles from './Ingredient.module.scss';
import Price from '../Price/Price';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { addIngredientConstructor } from "../../services/actions/order";
import { Button }  from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item, openModal }) => {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({type: 'ingredient', item: {id: item._id}});


  const addIngredient = (e) => {
    e.stopPropagation();
    dispatch(addIngredientConstructor(item._id));
  }

  return (
    <div
      className={`${styles.ingredient} mb-2`}
      onClick={() => {
        openModal(item)
      }}
      ref={dragRef}
    >
      <img src={item.image} alt={item.name} />
      <Price price={item.price} />
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
      <div className={styles.add_btn}><Button type="secondary" size="medium" onClick={addIngredient}>Добавить</Button></div>
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