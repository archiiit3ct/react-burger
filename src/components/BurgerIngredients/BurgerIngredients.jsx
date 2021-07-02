import { useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";

const tabs = [
  {
    label: "Булки",
    value: "bun",
  },
  {
    label: "Соусы",
    value: "sauce",
  },
  {
    label: "Начинки",
    value: "main",
  },
];

const BurgerIngredients = (props) => {
  const { data, openModal } = props;
  const [current, setCurrent] = useState("bun");

  const handleTabClick = (item) => {
    setCurrent(item);
    document.querySelector(`#${item}`)?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section className={styles.main}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={styles.tab}>
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.label}
              value={tab.value}
              active={current === tab.value}
              onClick={handleTabClick}
            >
              {tab.label}
            </Tab>
          );
        })}
      </div>
      <div className={styles.scrollable}>
        {tabs.map((tab) => (
          <ul key={tab.label} className={`${styles.list} mt-2`}>
            <li className={styles.item}>
              <p id={`${tab.value}`} className="text text_type_main-medium">
                {tab.label}
              </p>
            </li>

            <ul className={`${styles.list} p-2`}>
              {data.map((item) => item.type === tab.value && (

                    <li key={item._id} className={styles.item}>
                      <Ingredient
                        item={item}
                        openModal={openModal}
                      />
                    </li>
                  )
              )}
            </ul>
          </ul>
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
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
  })),
  openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;
