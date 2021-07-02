import React from 'react';
import styles from "../OrderDetails/OrderDetails.module.scss";
import Done from "../../images/done.png";

import PropTypes from 'prop-types';

const OrderDetails = ({ order }) => {
  console.log(order);
  return (
    <div className={styles.order}>
      <p className={`${styles.title} text text_type_digits-large`}>{order}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img src={Done} alt="Done" className={styles.icon} />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={`${styles.desc} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

OrderDetails.propTypes = {
  order: PropTypes.number.isRequired
}

export default OrderDetails;
