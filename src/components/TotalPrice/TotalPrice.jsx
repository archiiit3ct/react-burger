import React, { useState } from "react";
import styles from "./TotalPrice.module.scss";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const TotalPrice = (props) => {
  const { total, openModal } = props;

  const [order] = useState({
    id: 337899,
  });

  return (
    <section className={styles.total}>
      <div className={styles.price}>
        <p className={`${styles.number} text text_type_main-large`}>
          { total }
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium" onClick={() => openModal({mode: 'order', order: order, header: '' })}>
        Оформить заказ
      </Button>
    </section>
  );
};

TotalPrice.propTypes = {
  total: PropTypes.number.isRequired,
}

export default TotalPrice;
