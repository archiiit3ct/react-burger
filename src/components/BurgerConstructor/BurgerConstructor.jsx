import styles from "./BurgerConstructor.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalPrice from "../TotalPrice/TotalPrice";
import PropTypes from 'prop-types';
import { ConstructorContext } from "../../services/constructorContext";
import {useContext} from "react";

const BurgerConstructor = () => {

  const { productState } = useContext(ConstructorContext)

  return (
    <section className={styles.main}>
      { productState.bun.length !== 0 && (
        <section className={styles.edgeElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={productState.bun[0].name + ' (верх)'}
            price={productState.bun[0].price}
            thumbnail={productState.bun[0].image}
          />
        </section>
      )}

      <div className={styles.container}>
        { productState.product.map((item) => {
          if(item.type === 'bun') return null;
          return (
            <section className={styles.element} key={item._id + Math.random()}>
              <section className={styles.icon}>
                <DragIcon type="primary" />
              </section>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                className={styles.element}
              />
            </section>
          )
        })}
      </div>
      
      { productState.bun.length !== 0 && (
        <section className={styles.edgeElement}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={productState.bun[0].name + ' (верх)'}
            price={productState.bun[0].price}
            thumbnail={productState.bun[0].image}
          />
        </section>
      )}

      {(productState.product.length !== 0 || productState.bun.length !== 0) && (<TotalPrice />)}
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
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
  }).isRequired)
}

export default BurgerConstructor;