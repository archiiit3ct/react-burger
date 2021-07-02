import styles from "./BurgerConstructor.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalPrice from "../TotalPrice/TotalPrice";
import PropTypes from 'prop-types';

const BurgerConstructor = ({ data, openModal }) => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <section className={styles.edgeElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + ' (верх)'}
            price={200}
            thumbnail={data[0].image}
          />
        </section>
        { data.map((item) => {
          if(item.type === 'bun') return null;

          return (
            <section className={styles.element} key={item._id}>
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
        
        <section className={styles.edgeElement}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[data.length - 1].image}
          />
        </section>
      </div>

      <TotalPrice total={610} openModal={openModal} />
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
  }))
}

export default BurgerConstructor;