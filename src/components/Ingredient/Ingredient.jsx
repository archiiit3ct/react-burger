import { useState } from 'react';
import './Ingredient.scss';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from '../Price/Price';

const Ingredient = (props) => {
  let [counter, setCounter] = useState(0)

  const { image, name, price } = props;

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="ingredient mb-2" onClick={handleClick}>
      <div className="ingredient-icon">
        {counter > 0 && <Counter count={counter} size="default" />}
      </div>

      <img src={image} alt={name} />
      <Price price={price} />
      <p className="text text_type_main-default name">{name}</p>
    </div>
  );
};

export default Ingredient;