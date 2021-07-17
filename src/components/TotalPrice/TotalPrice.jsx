import React, { useContext } from "react";
import styles from "./TotalPrice.module.scss";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorContext } from "../../services/constructorContext";

const TotalPrice = () => {
  const { totalPrice, getOrder} = useContext(ConstructorContext)

  return (
    <section className={styles.total}>
      <div className={styles.price}>
        <p className={`${styles.number} text text_type_main-large`}>
          { totalPrice }
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium" onClick={() => getOrder()}>
        Оформить заказ
      </Button>
    </section>
  );
};

export default TotalPrice;
