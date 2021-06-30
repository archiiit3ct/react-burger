import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Price.module.scss";
import PropTypes from 'prop-types';

const Price = (props) => {
  const { price } = props;
  return (
    <div className={`${styles.price} mb-1`}>
      <p className="text text_type_digits-default mr-1">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number
}

export default Price;