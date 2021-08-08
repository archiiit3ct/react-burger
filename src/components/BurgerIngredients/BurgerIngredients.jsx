import React, {useEffect, useState, useRef} from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal';
import Ingredient from "../Ingredient/Ingredient";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_INGREDIENT_MODAL, getIngredients, OPEN_INGREDIENT_MODAL, SET_MODAL_CONTENT} from "../../services/actions/ingredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

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

const BurgerIngredients = () => {
  const { ingredients, ingredientsSuccess, showIngredientModal } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const openModal = (ingredient) => {
    dispatch({type:  SET_MODAL_CONTENT, value: ingredient});
    dispatch({type:  OPEN_INGREDIENT_MODAL });
  }

  const closeModal = () => {
    dispatch({type:  CLOSE_INGREDIENT_MODAL })
    dispatch({type:  SET_MODAL_CONTENT, value: null});

  }

  const [current, setCurrent] = useState("bun");

  const handleTabClick = (item) => {
    setCurrent(item);
    document.querySelector(`#${item}`)?.scrollIntoView({behavior: "smooth"});
  };

  const scrollContainerRef = useRef(null);

  const elemRefs = React.useRef({});

  const handleScroll = () => {
    const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect()
      .top;
    let minDiff = Number.POSITIVE_INFINITY;
    let minName = "";

    const keys = Object.keys(elemRefs.current);

    keys.forEach((key) => {
      const ref = elemRefs.current[key];
      const topPosition = ref.getBoundingClientRect().top;
      const diff = Math.abs(scrollContainerPosition - topPosition);

      if (diff < minDiff) {
        minDiff = diff;
        minName = key;
      }
    });
    setCurrent(minName);
  };

  return (
    <section className={styles.main}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={styles.tab}>
        <Tab value='bun' active={current === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.scrollable} ref={scrollContainerRef} onScroll={handleScroll}>
        {tabs.map((tab) => (
          <ul key={tab.label} className={`${styles.list} mt-2`}>
            <li className={styles.item}
                ref={(el) => {
              elemRefs.current[tab.value] = el;
            }}>
              <p id={`${tab.value}`} className="text text_type_main-medium">
                {tab.label}
              </p>
            </li>

            <ul className={`${styles.list} p-2`}>
              { ingredientsSuccess && (
                ingredients.map((item) => item.type === tab.value && (
                    <li key={item._id} className={styles.item}>
                      <Ingredient
                        item={item}
                        openModal={openModal}
                      />
                    </li>
                  )
                )
              )}
            </ul>
          </ul>
        ))}
      </div>

      { showIngredientModal &&
        <Modal type="ingredient" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      }
    </section>
  );
};

export default BurgerIngredients;
