import { useState } from 'react';
import styles from './Ingredient.module.scss';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from '../Price/Price';
import PropTypes from 'prop-types';

const Ingredient = (props) => {
  let [counter, setCounter] = useState(0)

  const { image, name, price } = props;

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div className={`${styles.ingredient} mb-2`} onClick={handleClick}>
      <div className={styles.ingredientIcon}>
        {counter > 0 && <Counter count={counter} size="default" />}
      </div>

      <img src={image} alt={name} />
      <Price price={price} />
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

export default Ingredient;