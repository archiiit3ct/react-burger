import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./Price.scss";


const Price = (props) => {
  const { price } = props;
  return (
    <div className="price mb-1">
      <p className="text text_type_digits-default mr-1">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;