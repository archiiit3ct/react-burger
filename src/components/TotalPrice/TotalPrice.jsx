import "./TotalPrice.scss";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const TotalPrice = (props) => {
  const { total } = props;
  return (
    <section className="total">
      <div className="price">
        <p className="number text text_type_main-large">
          { total }
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium">
        Оформить заказ
      </Button>
    </section>
  );
};

TotalPrice.propTypes = {
  total: PropTypes.number,
}

export default TotalPrice;
